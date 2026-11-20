// components/ManualEditModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ManualEditModal = ({ show, handleClose, handleAddItems }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        const lines = inputValue.split('\n').filter(line => line.trim() !== '');
        const newItems = lines.map(line => {
            const [name, description] = line.split('|').map(s => s.trim());
            return {
                name: name || '',
                description: description || '',
                id: crypto.randomUUID(),
            };
        });

        handleAddItems(newItems);
        setInputValue('');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} dir="rtl" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-5">הוספה ידנית</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="small text-muted">הכנס מוצרים, אחד בכל שורה, לפי הפורמט: שם_מוצר | תיאור_מוצר</p>
                <Form.Control
                    as="textarea"
                    rows={8}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="דוגמה:&#10;חלב | 3%&#10;לחם לבן | פרוס&#10;עגבניות | אשכול"
                />
            </Modal.Body>
            <Modal.Footer className="d-flex gap-2">
                <Button variant="secondary" onClick={handleClose} className="flex-fill">
                    ביטול
                </Button>
                <Button variant="primary" onClick={handleSubmit} className="flex-fill">
                    הוסף מוצרים
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ManualEditModal;