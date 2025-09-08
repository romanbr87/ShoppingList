// pages/edit.js
import { useState, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { BsUpload, BsDownload } from 'react-icons/bs';
import Header from '../components/Header';
import EditableTable from '../components/EditableTable';
import { mergeLists } from '../utils/listUtils';

const EditPage = () => {
    const [shoppingList, setShoppingList] = useState({});
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const importFileRef = useRef(null);
    const mergeFileRef = useRef(null);

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const parsedData = JSON.parse(e.target.result);
                    if (type === 'import') {
                        setShoppingList(parsedData); // Replace the entire list
                    } else if (type === 'merge') {
                        setShoppingList(prevList => mergeLists(prevList, parsedData)); // Merge with existing list
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
            setShoppingList(prevList => ({ ...prevList, [newItem.name]: newItem.description }));
            setNewItem({ name: '', description: '' });
        }
    };

    const handleDelete = (name) => {
        const updatedList = { ...shoppingList };
        delete updatedList[name];
        setShoppingList(updatedList);
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

    return (
        <>
            <Header />
            <Container className="my-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0 text-primary">מצב עריכה</h2>
                    <div className="d-flex gap-2">
                        {Object.keys(shoppingList).length > 0 && (
                            <Button variant="outline-success" onClick={handleDownload} className="d-flex align-items-center">
                                ייצוא <BsDownload className="ms-2" />
                            </Button>
                        )}
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

                {Object.keys(shoppingList).length > 0 ? (
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
            </Container>
        </>
    );
};

export default EditPage;