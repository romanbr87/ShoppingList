// components/AddItemForm.jsx
import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'; 

const AddItemForm = ({ newItem, setNewItem, handleAdd, isInTable = false }) => {
    // This is the core form content layout (Row of inputs and button)
    const formContent = (
        <Row className="g-2">
            {/* Input for the Item Name */}
            <Col xs={12} md={5}>
                <Form.Control
                    type="text"
                    placeholder="שם המוצר" // Item Name
                    // FIX: Use optional chaining for safe access
                    value={newItem?.name || ''}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                />
            </Col>

            {/* Input for the Item Description */}
            <Col xs={12} md={5}>
                <Form.Control
                    type="text"
                    placeholder="תיאור (אופציונלי)" // Description (optional)
                    // FIX: Use optional chaining for safe access
                    value={newItem?.description || ''}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
            </Col>

            {/* Submit Button */}
            <Col xs={12} md={2}>
                <Button variant="success" type="submit" className="w-100">
                    הוסף {/* Add */}
                </Button>
            </Col>
        </Row>
    );

    // If in table, return wrapped in a <tr> with a single <td> spanning all columns
    if (isInTable) {
        return (
            <tr>
                {/* colSpan="100" ensures it spans the entire table width */}
                <td colSpan="100" className="p-3">
                    <Form onSubmit={handleAdd}>
                        {formContent}
                    </Form>
                </td>
            </tr>
        );
    }

    // If standalone (list is empty), return just the Form element without extra styling
    // The parent component (shoppinglistapp.js) will provide the necessary styling/wrapper
    return (
        <Form onSubmit={handleAdd}>
            {formContent}
        </Form>
    );
};

export default AddItemForm;
