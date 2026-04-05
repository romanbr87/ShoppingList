// components/TableBody.jsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BsTrashFill, BsPencilFill, BsCheckLg, BsXLg } from 'react-icons/bs';

const TableBody = ({ items, setList, onDelete, handleDragStart, handleDragEnter, handleDrop, isDuplicate, isEditing }) => {
    const [editingItemId, setEditingItemId] = useState(null);
    const [originalItem, setOriginalItem] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});

    // Handlers for view mode with inline editing
    const handleDoubleClick = (id) => {
        setCheckedItems(prevChecked => ({
            ...prevChecked,
            [id]: !prevChecked[id]
        }));
    };

    const handleEditClick = (item) => {
        setEditingItemId(item.id);
        setOriginalItem({ ...item });
    };

    const handleSaveClick = (id) => {
        const item = items.find(i => i.id === id);

        // Validation only happens upon clicking 'Save'
        if (!item.name || !item.name.trim()) {
            alert("שם המוצר לא יכול להיות ריק.");
            return;
        }

        if (isDuplicate(items, item, id)) {
            alert("הפריט הקיים כבר ברשימה עם אותו שם ותיאור. לא ניתן לשמור כפילות.");
            return;
        }

        setEditingItemId(null);
        setOriginalItem(null);
    };

    const handleCancelClick = () => {
        if (originalItem) {
            setList(prevList => prevList.map(i => i.id === originalItem.id ? originalItem : i));
        }
        setEditingItemId(null);
        setOriginalItem(null);
    };

    const handleItemChange = (id, field, value) => {
        setList(prevList => {
            const currentItem = prevList.find(item => item.id === id);
            if (!currentItem) return prevList;

            const updatedItem = { ...currentItem, [field]: value };

            return prevList.map(item =>
                item.id === id ? updatedItem : item
            );
        });
    };

    // New handler for deletion with confirmation
    const confirmDelete = (item) => {
        const descriptionSnippet = item.description ? ` (${item.description})` : "";
        const message = `האם אתה בטוח שברצונך למחוק את "${item.name}"${descriptionSnippet}?`;
        
        if (window.confirm(message)) {
            onDelete(item.id);
        }
    };

    return (
        <React.Fragment>
            {items.map((item, index) => {
                const showFormControls = isEditing || editingItemId === item.id;

                return (
                    <tr
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onDoubleClick={!showFormControls ? () => handleDoubleClick(item.id) : undefined}
                        style={{
                            cursor: 'grab',
                            textDecoration: !isEditing && checkedItems[item.id] ? 'line-through' : 'none',
                            color: !isEditing && checkedItems[item.id] ? 'grey' : 'inherit'
                        }}
                    >
                        <td className="text-center align-middle" style={{ width: '5%' }}>{index + 1}</td>
                        
                        {showFormControls ? (
                            <React.Fragment>
                                <td className="align-middle" style={{ width: '20%' }}>
                                    <Form.Control
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                        required 
                                    />
                                </td>
                                <td className="align-middle" style={{ width: '40%' }}>
                                    <Form.Control
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                    />
                                </td>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <td className="align-middle" style={{ width: '20%' }} title={item.name}>
                                    {item.name}
                                </td>
                                <td className="align-middle" style={{ width: '40%' }} title={item.description}>
                                    {item.description}
                                </td>
                            </React.Fragment>
                        )}

                        <td className="text-center align-middle" style={{ width: '15%' }}>
                            {isEditing ? (
                                <Button variant="danger" size="sm" onClick={() => confirmDelete(item)}>
                                    <BsTrashFill />
                                </Button>
                            ) : (
                                <div className="d-flex justify-content-center gap-2">
                                    {editingItemId === item.id ? (
                                        <>
                                            <Button 
                                                variant="success" 
                                                size="sm" 
                                                onClick={() => handleSaveClick(item.id)} 
                                                disabled={checkedItems[item.id]}
                                            >
                                                <BsCheckLg />
                                            </Button>
                                            <Button 
                                                variant="secondary" 
                                                size="sm" 
                                                onClick={() => handleCancelClick()} 
                                                disabled={checkedItems[item.id]}
                                            >
                                                <BsXLg />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button 
                                                variant="warning" 
                                                size="sm" 
                                                onClick={() => handleEditClick(item)} 
                                                disabled={checkedItems[item.id]}
                                            >
                                                <BsPencilFill />
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                size="sm" 
                                                onClick={() => confirmDelete(item)} 
                                                disabled={checkedItems[item.id]}
                                            >
                                                <BsTrashFill />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            )}
                        </td>
                    </tr>
                );
            })}
        </React.Fragment>
    );
};

export default TableBody;