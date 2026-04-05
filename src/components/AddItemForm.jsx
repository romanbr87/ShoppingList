import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AddItemForm = ({ newItem, setNewItem, handleAdd, hasItems }) => {

    const renderFormControl = (field, placeholder, isRequired) => (
        <Form.Control
            type="text"
            placeholder={placeholder}
            value={newItem?.[field] || ''}
            onChange={(e) => setNewItem({ ...newItem, [field]: e.target.value })}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAdd(e);
                }
            }}
            required={isRequired}
        />
    );

    const nameCellColSpan = hasItems ? 1 : 2;
    // When no items, remove the top border from the tr
    const rowClass = hasItems ? 'bg-light' : 'bg-light border-top-0';
    
    // Use border-0 and border-top-0 for the cells in the 'no items' case to remove internal and top separation
    const cellBorderClass = hasItems ? '' : 'border-0 border-top-0'; 

    return (
        <tr className={`align-middle ${rowClass}`}> 
            
            {hasItems && (
                <td className={`text-center align-middle fw-bold text-success ${cellBorderClass}`} style={{ width: '75px', maxWidth: '75px' }}>
                    +
                </td>
            )}

            <td className={`align-middle p-2 ${cellBorderClass}`} colSpan={nameCellColSpan}>
                {renderFormControl('name', 'שם המוצר (פריט חדש)', true)}
            </td>

            <td className={`align-middle p-2 ${cellBorderClass}`}>
                {renderFormControl('description', 'תיאור/כמות (אופציונלי)', false)}
            </td>

            <td className={`text-center align-middle p-2 ${cellBorderClass}`} style={{ width: '150px' }}>
                <Button variant="success" type="button" onClick={handleAdd} className="w-100">
                    הוסף
                </Button>
            </td>
        </tr>
    );
};

export default AddItemForm;