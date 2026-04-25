import { useState, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import ShoppingListTable from '../components/ShoppingListTable';
import ManualEditModal from '../components/ManualEditModal';
import { BsUpload, BsDownload, BsTrash } from 'react-icons/bs';
import { mergeLists, convertObjectToList, isValidItemArray, isDuplicate } from '../utils/listUtils';

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

                    // If it's a single object, convert it to a list first
                    if (!Array.isArray(parsedData) && typeof parsedData === 'object' && parsedData !== null) {
                        parsedData = convertObjectToList(parsedData);
                    }

                    // Now use the function to check if the result is a valid array of items
                    if (!isValidItemArray(parsedData)) {
                        alert("קובץ JSON לא תקין. אנא נסה שוב.");
                        return;
                    }

                    const uniqueImportedData = mergeLists([], parsedData);

                    if (type === 'import') {
                        setShoppingList(uniqueImportedData);
                        setLastFileName(fileName); // Set file name on successful import
                    } else if (type === 'merge') {
                        setShoppingList(prevList => mergeLists(prevList, uniqueImportedData));
                        if (!lastFileName) setLastFileName(newName => fileName);
                    }
                } catch (error) {
                    console.error("Import error:", error);
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
                id: crypto.randomUUID(),
            }]);
            setNewItem({ name: '', description: '' });
            setLastFileName(null); // Clear file name when manually adding, as the list is modified
        }
    };

    const handleDelete = (id) => {
        setShoppingList(prevList => prevList.filter(item => item.id !== id));
        setLastFileName(null); // Clear file name when manually deleting
    };

    const handleDownload = async () => {
        // 1. Prepare the data
        const currentName = lastFileName?.trim() || "shopping-list.json";

        const formattedData = shoppingList.map(({ name, description }) => ({
            name,
            description
        }));

        const jsonString = JSON.stringify(formattedData, null, 2);

        try {
            // 2. Open the native "Save As" picker
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: currentName,
                types: [{
                    description: 'JSON Files',
                    accept: { 'application/json': ['.json'] },
                }],
            });

            // 3. Create a writable stream and save the data
            const writableStream = await fileHandle.createWritable();
            await writableStream.write(jsonString);
            await writableStream.close();

            // 4. Update state and feedback
            setLastFileName(fileHandle.name);

            // Using a console log instead of alert to keep it non-blocking
            console.log(`File saved as: ${fileHandle.name}`);

        } catch (error) {
            // Handle user cancellation or errors
            if (error.name === 'AbortError') {
                console.log('User cancelled the save operation.');
            } else {
                console.error('Error saving file:', error);
            }
        }
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
                    {lastFileName && (
                        <p className="text-secondary small mb-0">
                            קובץ אחרון:
                            <strong className="d-inline-block me-1">
                                {'\u200E'}{lastFileName}{'\u200E'}
                            </strong>
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

                <Form.Control
                    type="file"
                    ref={importFileRef}
                    onChange={(e) => handleFileChange(e, 'import')}
                    accept="application/json" // Strict MIME type
                    style={{ display: 'none' }}
                />

                <Form.Control
                    type="file"
                    ref={mergeFileRef}
                    onChange={(e) => handleFileChange(e, 'merge')}
                    accept="application/json" // Strict MIME type
                    style={{ display: 'none' }}
                />

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
