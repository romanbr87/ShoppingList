// components/EditTable.js
import { useState, useRef } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { BsTrashFill } from 'react-icons/bs';

const EditTable = ({ items, setList, onDelete }) => {
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

    const handleItemChange = (id, field, value) => {
        setList(prevList => {
            const currentItem = prevList.find(item => item.id === id);
            if (!currentItem) return prevList;

            const updatedItem = { ...currentItem, [field]: value };
            
            // Prevent empty name
            if (field === 'name' && !value.trim()) {
                alert("שם המוצר לא יכול להיות ריק.");
                return prevList;
            }

            // Check for duplicate against the rest of the list (only if name or description changed)
            if (isDuplicate(prevList, updatedItem, id)) {
                alert("הפריט הקיים כבר ברשימה עם אותו שם ותיאור. לא ניתן לשמור כפילות.");
                return prevList; // Don't update the list
            }

            // Update the list if no duplicate is found
            return prevList.map(item =>
                item.id === id ? updatedItem : item
            );
        });
    };

    return (
        <div className="shadow-sm rounded-3 overflow-hidden table-responsive">
            <Table striped bordered hover className="mb-0">
                <thead className="bg-dark text-white">
                    <tr>
                        <th className="text-center">#</th>
                        <th>שם המוצר</th>
                        <th>תיאור/כמות</th>
                        <th className="text-center">מחק</th>
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
                            style={{ cursor: 'grab' }}
                        >
                            <td className="text-center align-middle">{index + 1}</td>
                            <td className="align-middle">
                                <Form.Control 
                                    type="text" 
                                    value={item.name} 
                                    onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} 
                                    required 
                                />
                            </td>
                            <td className="align-middle">
                                <Form.Control 
                                    type="text" 
                                    value={item.description} 
                                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} 
                                />
                            </td>
                            <td className="text-center align-middle">
                                <Button variant="danger" size="sm" onClick={() => onDelete(item.id)}>
                                    <BsTrashFill />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default EditTable;