// components/ViewTable.js
import { useState, useRef } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { BsTrashFill, BsPencilFill, BsCheckLg, BsXLg } from 'react-icons/bs';

const ViewTable = ({ items, setList, onDelete }) => {
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedItem, setEditedItem] = useState({ name: '', description: '' });
    const [checkedItems, setCheckedItems] = useState({});
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    // Helper function to check for duplicates (Name AND Description)
    const isDuplicate = (list, item, excludeId) => {
        if (!item.name) return true;

        const newItemKey = `${item.name.trim().toLowerCase()}-${item.description.trim().toLowerCase()}`;
        
        return list.some(existingItem => {
            // Exclude the item currently being edited from the check
            if (existingItem.id === excludeId) {
                return false;
            }
            const existingKey = `${existingItem.name.trim().toLowerCase()}-${existingItem.description.trim().toLowerCase()}`;
            return existingKey === newItemKey;
        });
    };

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
        // 1. Check for blank name
        if (!editedItem.name.trim()) {
            alert("שם המוצר לא יכול להיות ריק.");
            return;
        }

        // 2. Check for duplicate against the rest of the list
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

    const handleDragStart = (e, index) => {
        dragItem.current = index;
    };

    const handleDragEnter = (e, index) => {
        dragOverItem.current = index;
    };

    const handleDrop = () => {
        const _list = [...items];
        const draggedItemContent = _list.splice(dragItem.current, 1)[0];
        _list.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(_list);
    };

    return (
        <div className="shadow-sm rounded-3 overflow-hidden table-responsive">
            <Table striped bordered hover className="mb-0">
                <thead className="bg-dark text-white">
                    <tr>
                        <th className="text-center">#</th>
                        <th>שם המוצר</th>
                        <th>תיאור/כמות</th>
                        <th className="text-center">פעולות</th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </Table>
        </div>
    );
};

export default ViewTable;