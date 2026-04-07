import { useState, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import ShoppingListTable from '../components/ShoppingListTable';
import ManualEditModal from '../components/ManualEditModal';
import { BsUpload, BsDownload, BsTrash } from 'react-icons/bs';
import { mergeLists, convertObjectToList } from '../utils/listUtils';

const ShoppingListPage = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [lastFileName, setLastFileName] = useState(null); // New state for file name
    const importFileRef = useRef(null);
    const mergeFileRef = useRef(null);

    const isDuplicate = (list, item) => {
        if (!item.name.trim()) return true;

        const newItemKey = `${item.name.trim().toLowerCase()}-${item.description.trim().toLowerCase()}`;

        return list.some(existingItem => {
            const existingKey = `${existingItem.name.trim().toLowerCase()}-${existingItem.description.trim().toLowerCase()}`;
            return existingKey === newItemKey;
        });
    };

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

                    const uniqueImportedData = mergeLists([], parsedData);

                    if (type === 'import') {
                        setShoppingList(uniqueImportedData);
                        setLastFileName(fileName); // Set file name on successful import
                    } else if (type === 'merge') {
                        setShoppingList(prevList => mergeLists(prevList, uniqueImportedData));
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
        if (newItem.name.trim()) {
            if (isDuplicate(shoppingList, newItem)) {
                alert(`הפריט "${newItem.name.trim()}" עם התיאור "${newItem.description.trim()}" כבר קיים ברשימה.`);
                return;
            }

            setShoppingList(prevList => [...prevList, {
                name: newItem.name.trim(),
                description: newItem.description.trim(),
                id: crypto.randomUUID();
            }]);
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
        // mergeLists handles all duplicate checks
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
                    {shoppingList.length > 0 && (
                        <Button variant="outline-info" onClick={handleMergeClick} className="d-flex align-items-center">
                            ייבוא ומיזוג <BsUpload className="ms-2" />
                        </Button>
                    )}
                </div>
                <Form.Control type="file" ref={importFileRef} onChange={(e) => handleFileChange(e, 'import')} accept=".json" style={{ display: 'none' }} />
                <Form.Control type="file" ref={mergeFileRef} onChange={(e) => handleFileChange(e, 'merge')} accept=".json" style={{ display: 'none' }} />
            </div>

            <ShoppingListTable
                items={shoppingList}
                setList={setShoppingList}
                onDelete={handleDelete}
                newItem={newItem}
                setNewItem={setNewItem}
                handleAdd={handleAdd}
                isEditing={isEditing}
            />
            <ManualEditModal show={showModal} handleClose={() => setShowModal(false)} handleAddItems={handleAddManually} />

        </Container>
    );
};

export default ShoppingListPage;
