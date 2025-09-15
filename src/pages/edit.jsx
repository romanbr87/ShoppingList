// pages/edit.js
import { useState, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { BsUpload, BsDownload } from 'react-icons/bs';
import EditableTable from '../components/EditableTable';
import ManualAddModal from '../components/ManualAddModal';
import { mergeLists, convertObjectToList } from '../utils/listUtils';

const EditPage = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [showModal, setShowModal] = useState(false);
    const importFileRef = useRef(null);
    const mergeFileRef = useRef(null);

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    let parsedData = JSON.parse(e.target.result);
                    if (!Array.isArray(parsedData) && typeof parsedData === 'object' && parsedData !== null) {
                        parsedData = convertObjectToList(parsedData);
                    }
                    if (!Array.isArray(parsedData)) {
                        alert("קובץ JSON לא תקין. אנא נסה שוב.");
                        return;
                    }
                    if (type === 'import') {
                        setShoppingList(parsedData);
                    } else if (type === 'merge') {
                        setShoppingList(prevList => mergeLists(prevList, parsedData));
                    }
                } catch (error) {
                    alert("קובץ JSON לא תקין. אנא נסה שוב.");
                }
            };
            reader.readAsText(file);
        }
        event.target.value = null;
    };

    const handleImportClick = () => importFileRef.current.click();
    const handleMergeClick = () => mergeFileRef.current.click();

    const handleAdd = (e) => {
        e.preventDefault();
        if (newItem.name) {
            setShoppingList(prevList => [...prevList, { ...newItem, id: Date.now() }]);
            setNewItem({ name: '', description: '' });
        }
    };

    const handleDelete = (id) => {
        setShoppingList(prevList => prevList.filter(item => item.id !== id));
    };

    const handleDownload = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(shoppingList, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "shopping_list.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleAddManually = (newItems) => {
        setShoppingList(prevList => mergeLists(prevList, newItems));
    };

    return (
        <Container className="my-5">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-0 text-primary">מצב עריכה</h2>
                    <h5 className="mb-2 text-muted">סה"כ פריטים: {shoppingList.length} 🛒</h5>
                </div>
                <div className="d-flex flex-wrap gap-2 justify-content-end mt-3 mt-sm-0">
                    {shoppingList.length > 0 && (
                        <Button variant="outline-success" onClick={handleDownload} className="d-flex align-items-center">
                            ייצוא <BsDownload className="ms-2" />
                        </Button>
                    )}
                    <Button variant="outline-primary" onClick={() => setShowModal(true)} className="d-flex align-items-center">
                        הוספה ידנית
                    </Button>
                    <Button variant="outline-primary" onClick={handleImportClick} className="d-flex align-items-center">
                        ייבוא רשימה <BsUpload className="ms-2" />
                    </Button>
                    <Button variant="outline-info" onClick={handleMergeClick} className="d-flex align-items-center">
                        ייבוא ומיזוג <BsUpload className="ms-2" />
                    </Button>
                </div>
                <Form.Control type="file" ref={importFileRef} onChange={(e) => handleFileChange(e, 'import')} accept=".json" style={{ display: 'none' }} />
                <Form.Control type="file" ref={mergeFileRef} onChange={(e) => handleFileChange(e, 'merge')} accept=".json" style={{ display: 'none' }} />
            </div>

            {shoppingList.length > 0 ? (
                <EditableTable items={shoppingList} setList={setShoppingList} onDelete={handleDelete} />
            ) : (
                <div className="text-center mt-5 p-4 bg-light rounded-3 shadow-sm">
                    <h3 className="mb-3 text-secondary">אין פריטים להצגה</h3>
                    <p className="lead text-muted">התחל על ידי הוספת פריטים למטה או ייבוא רשימה.</p>
                </div>
            )}

            <hr className="my-5" />

            <h3 className="mb-3">הוספת פריט חדש</h3>
            <Form onSubmit={handleAdd}>
                <Row className="g-2">
                    <Col xs={12} md={5}>
                        <Form.Control type="text" placeholder="שם המוצר" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
                    </Col>
                    <Col xs={12} md={5}>
                        <Form.Control type="text" placeholder="תיאור (אופציונלי)" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
                    </Col>
                    <Col xs={12} md={2}>
                        <Button variant="success" type="submit" className="w-100">
                            הוסף
                        </Button>
                    </Col>
                </Row>
            </Form>
            <ManualAddModal show={showModal} handleClose={() => setShowModal(false)} handleAddItems={handleAddManually} />
        </Container>
    );
};

export default EditPage;