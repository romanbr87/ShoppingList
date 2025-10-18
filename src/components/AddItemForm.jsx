// components/AddItemForm.jsx
import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AddItemForm = ({ newItem, setNewItem, handleAdd, isInTable = false }) => {
    const formContent = (
        <Row className="g-2">
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

            <Col xs={12} md={5}>
                <Form.Control
                    type="text"
                    placeholder="תיאור (אופציונלי)" // Description (optional)
                    // FIX: Use optional chaining for safe access
                    value={newItem?.description || ''}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
            </Col>

            <Col xs={12} md={2}>
                <Button variant="success" type="submit" className="w-100">
                    הוסף {/* Add */}
                </Button>
            </Col>
        </Row>
    );

    if (isInTable) {
        return (
            <tr>
                <td colSpan={100} className="p-4 bg-light shadow-sm my-3">
                    <Form onSubmit={handleAdd}>
                        {formContent}
                    </Form>
                </td>
            </tr>
        );
    }

    return (
        <Form onSubmit={handleAdd}>
            {formContent}
        </Form>
    );
};

export default AddItemForm;
