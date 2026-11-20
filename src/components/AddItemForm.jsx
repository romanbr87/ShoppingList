import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AddItemForm = ({ newItem, setNewItem, handleAdd, hasItems, isMobile = false }) => {
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

    if (isMobile) {
        return (
            <div className="p-3 bg-light border-top">
                <Row className="g-2">
                    <Col xs={12}>
                        {renderFormControl('name', 'שם המוצר (פריט חדש)', true)}
                    </Col>
                    <Col xs={8}>
                        {renderFormControl('description', 'תיאור/כמות', false)}
                    </Col>
                    <Col xs={4}>
                        <Button variant="success" type="button" onClick={handleAdd} className="w-100">
                            הוסף
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

    const nameCellColSpan = hasItems ? 1 : 2;
    const rowClass = hasItems ? 'bg-light' : 'bg-light border-top-0';
    const cellBorderClass = hasItems ? '' : 'border-0 border-top-0';

    return (
        <tr className={`align-middle ${rowClass}`}>
            {hasItems && (
                <td className={`text-center align-middle fw-bold text-success ${cellBorderClass}`}>
                    +
                </td>
            )}
            <td className={`align-middle p-2 ${cellBorderClass}`} colSpan={nameCellColSpan}>
                {renderFormControl('name', 'שם המוצר (פריט חדש)', true)}
            </td>
            <td className={`align-middle p-2 ${cellBorderClass}`}>
                {renderFormControl('description', 'תיאור/כמות (אופציונלי)', false)}
            </td>
            <td className={`text-center align-middle p-2 ${cellBorderClass}`}>
                <Button variant="success" type="button" onClick={handleAdd} className="w-100">
                    הוסף
                </Button>
            </td>
        </tr>
    );
};

export default AddItemForm;