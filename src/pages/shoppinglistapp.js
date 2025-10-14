import { useState, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import ViewTable from '../components/ViewTable';
import EditTable from '../components/EditTable';
import ManualAddModal from '../components/ManualAddModal';
import { BsUpload, BsDownload, BsTrash } from 'react-icons/bs'; // Import BsTrash for the clear button
import { mergeLists, convertObjectToList } from '../utils/listUtils';

const ShoppingListPage = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [lastFileName, setLastFileName] = useState(null); // New state for file name
    const importFileRef = useRef(null);
    const mergeFileRef = useRef(null);

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name; // Get file name
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
                        setLastFileName(fileName); // Set file name on successful import
                    } else if (type === 'merge') {
                        setShoppingList(prevList => mergeLists(prevList, parsedData));
                        setLastFileName(prevName => (prevName ? `${prevName} + ${fileName}` : fileName)); // Update file name for merge
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
            setLastFileName(null); // Clear file name when manually adding, as the list is modified
        }
    };

    const handleDelete = (id) => {
        setShoppingList(prevList => prevList.filter(item => item.id !== id));
        setLastFileName(null); // Clear file name when manually deleting
    };

    const handleDownload = () => {
        const fileName = "shopping_list.json";
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(shoppingList, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", fileName);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        setLastFileName(fileName); // Set file name when downloaded
    };

    const handleClearList = () => { // New function to clear the list
        if (window.confirm("האם אתה בטוח שברצונך למחוק את כל הפריטים מהרשימה?")) {
            setShoppingList([]);
            setLastFileName(null);
        }
    };

    const handleAddManually = (newItems) => {
        setShoppingList(prevList => mergeLists(prevList, newItems));
        setLastFileName(null); // Clear file name when manually adding
    };

    return (
        <Container className="my-5">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-0 text-primary">{isEditing ? 'מצב עריכה' : 'רשימת קניות'}</h2>
                    <h5 className="mb-2 text-muted">סה"כ פריטים: {shoppingList.length} 🛒</h5>
                    {lastFileName && ( // Display file name if available
                        <p className="text-secondary small mb-0">
                            קובץ אחרון: <strong>{lastFileName}</strong>
                        </p>
                    )}
                </div>
                <div className="d-flex flex-wrap gap-2 justify-content-end align-items-center mt-3 mt-sm-0">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={isEditing ? 'מצב עריכה' : 'מצב צפייה'}
                        checked={isEditing}
                        onChange={(e) => setIsEditing(e.target.checked)}
                        className="me-3"
                    />
                    {shoppingList.length > 0 && (
                        <>
                            <Button variant="outline-danger" onClick={handleClearList} className="d-flex align-items-center">
                                נקה רשימה <BsTrash className="ms-2" />
                            </Button>
                            <Button variant="outline-success" onClick={handleDownload} className="d-flex align-items-center">
                                ייצוא <BsDownload className="ms-2" />
                            </Button>
                        </>
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
                isEditing ? (
                    <EditTable items={shoppingList} setList={setShoppingList} onDelete={handleDelete} />
                ) : (
                    <ViewTable items={shoppingList} setList={setShoppingList} onDelete={handleDelete} />
                )
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

export default ShoppingListPage;