// components/ViewTableBody.jsx

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BsTrashFill, BsPencilFill, BsCheckLg, BsXLg } from 'react-icons/bs';

const ViewTableBody = ({ items, setList, onDelete, handleDragStart, handleDragEnter, handleDrop, isDuplicate }) => {
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedItem, setEditedItem] = useState({ name: '', description: '' });
    const [checkedItems, setCheckedItems] = useState({});

    const handleDoubleClick = (id) => {
        setCheckedItems(prevChecked => ({
            ...prevChecked,
            [id]: !prevChecked[id]
        }));
    };

    const handleEditClick = (item) => {
        setEditingItemId(item.id);
        setEditedItem({ name: item.name, description: item.description });
    };

    const handleSaveClick = (id) => {
        if (!editedItem.name.trim()) {
            alert("שם המוצר לא יכול להיות ריק.");
            return;
        }

        if (isDuplicate(items, editedItem, id)) {
            alert("הפריט הקיים כבר ברשימה עם אותו שם ותיאור. לא ניתן לשמור כפילות.");
            return;
        }

        const updatedList = items.map(item =>
            item.id === id ? { ...editedItem, id } : item
        );
        setList(updatedList);
        setEditingItemId(null);
    };

    const handleCancelClick = () => {
        setEditingItemId(null);
        setEditedItem({ name: '', description: '' });
    };

    return (
        <React.Fragment>
            {items.map((item, index) => (
                <tr
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnter={(e) => handleDragEnter(e, index)}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDoubleClick={() => handleDoubleClick(item.id)}
                    style={{
                        cursor: 'grab',
                        textDecoration: checkedItems[item.id] ? 'line-through' : 'none',
                        color: checkedItems[item.id] ? 'grey' : 'inherit'
                    }}
                >
                    <td className="text-center align-middle">{index + 1}</td>
                    {editingItemId === item.id ? (
                        <>
                            <td className="align-middle">
                                <Form.Control type="text" value={editedItem.name} onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })} />
                            </td>
                            <td className="align-middle">
                                <Form.Control type="text" value={editedItem.description} onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })} />
                            </td>
                        </>
                    ) : (
                        <>
                            <td className="align-middle" title={item.name}>
                                {item.name}
                            </td>
                            <td className="align-middle" title={item.description}>
                                {item.description}
                            </td>
                        </>
                    )}

                    <td className="text-center align-middle">
                        <div className="d-flex justify-content-center gap-2">
                            {editingItemId === item.id ? (
                                <>
                                    <Button variant="success" size="sm" onClick={() => handleSaveClick(item.id)} disabled={checkedItems[item.id] || !editedItem.name.trim()}><BsCheckLg /></Button>
                                    <Button variant="secondary" size="sm" onClick={handleCancelClick} disabled={checkedItems[item.id]}><BsXLg /></Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="warning" size="sm" onClick={() => handleEditClick(item)} disabled={checkedItems[item.id]}><BsPencilFill /></Button>
                                    <Button variant="danger" size="sm" onClick={() => onDelete(item.id)} disabled={checkedItems[item.id]}><BsTrashFill /></Button>
                                </>
                            )}
                        </div>
                    </td>
                </tr>
            ))}
        </React.Fragment>
    );
};

export default ViewTableBody;