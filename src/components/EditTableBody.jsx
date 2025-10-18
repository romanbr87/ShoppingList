// components/EditTableBody.jsx
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { BsTrashFill } from 'react-icons/bs';

const EditTableBody = ({ items, setList, onDelete, handleDragStart, handleDragEnter, handleDrop, isDuplicate }) => {

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

            // Check for duplicate against the rest of the list 
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
        <React.Fragment>
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
        </React.Fragment>
    );
};

export default EditTableBody;