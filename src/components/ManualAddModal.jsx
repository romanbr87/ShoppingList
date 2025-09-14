// components/ManualAddModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ManualAddModal = ({ show, handleClose, handleAddItems }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        const lines = inputValue.split('\n').filter(line => line.trim() !== '');
        const newItems = lines.map(line => {
            const [name, description] = line.split('|').map(s => s.trim());
            return {
                name: name || '',
                description: description || '',
                id: Date.now() + Math.random(),
            };
        });

        handleAddItems(newItems);
        setInputValue('');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} dir="rtl">
            <Modal.Header closeButton>
                <Modal.Title>הוספה ידנית</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>הכנס מוצרים, אחד בכל שורה, לפי הפורמט: שם_מוצר | תיאור_מוצר</p>
                <Form.Control
                    as="textarea"
                    rows={10}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="דוגמה:&#10;חלב | 3%&#10;לחם לבן | פרוס&#10;עגבניות | אשכול"
                />
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleClose}>
                    ביטול
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    הוסף מוצרים
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ManualAddModal;