import { useState, useRef } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import ShoppingListTable from '../components/ShoppingListTable';
import ManualEditModal from '../components/ManualEditModal';
import { BsUpload, BsDownload, BsTrash, BsPlusLg } from 'react-icons/bs';
import { mergeLists, convertObjectToList, isValidItemArray, isDuplicate } from '../utils/listUtils';

const ShoppingListPage = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [lastFileName, setLastFileName] = useState(null);
    const importFileRef = useRef(null);
    const mergeFileRef = useRef(null);

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    let parsedData = JSON.parse(e.target.result);

                    if (!Array.isArray(parsedData) && typeof parsedData === 'object' && parsedData !== null) {
                        parsedData = convertObjectToList(parsedData);
                    }

                    if (!isValidItemArray(parsedData)) {
                        alert("קובץ JSON לא תקין. אנא נסה שוב.");
                        return;
                    }

                    const uniqueImportedData = mergeLists([], parsedData);

                    if (type === 'import') {
                        setShoppingList(uniqueImportedData);
                        setLastFileName(fileName);
                    } else if (type === 'merge') {
                        setShoppingList(prevList => mergeLists(prevList, uniqueImportedData));
                        if (!lastFileName) setLastFileName(fileName);
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

        const trimmedName = newItem.name.trim();
        const trimmedDescription = newItem.description.trim();

        if (trimmedName) {
            const itemToCheck = {
                name: trimmedName,
                description: trimmedDescription
            };

            if (isDuplicate(shoppingList, itemToCheck)) {
                alert(`הפריט "${trimmedName}" עם התיאור "${trimmedDescription}" כבר קיים ברשימה.`);
                return;
            }

            setShoppingList(prevList => [...prevList, {
                name: trimmedName,
                description: trimmedDescription,
                id: crypto.randomUUID(),
            }]);

            setNewItem({ name: '', description: '' });
            // Note: setLastFileName(null) was removed here so adding new items preserves the file name!
        }
    };
    
    const handleDelete = (id) => {
        setShoppingList(prevList => prevList.filter(item => item.id !== id));
        // Optional: you can keep or remove lastFileName reset on delete depending on preference, 
        // but keeping it untouched or handled as desired. (Left unchanged from original unless requested, 
        // wait - keeping delete behavior as is, only removing it from handleAdd).
    };

    const handleDownload = async () => {
        const currentName = lastFileName?.trim() || "shopping-list.json";
        const formattedData = shoppingList.map(({ name, description }) => ({
            name,
            description
        }));

        const jsonString = JSON.stringify(formattedData, null, 2);

        try {
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: currentName,
                types: [{
                    description: 'JSON Files',
                    accept: { 'application/json': ['.json'] },
                }],
            });

            const writableStream = await fileHandle.createWritable();
            await writableStream.write(jsonString);
            await writableStream.close();

            setLastFileName(fileHandle.name);
            console.log(`File saved as: ${fileHandle.name}`);

        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('User cancelled the save operation.');
            } else {
                console.error('Error saving file:', error);
            }
        }
    };

    const handleClearList = () => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את כל הפריטים מהרשימה?")) {
            setShoppingList([]);
            setLastFileName(null);
        }
    };

    const handleAddManually = (newItems) => {
        setShoppingList(prevList => mergeLists(prevList, newItems));
        // setLastFileName(null); // Optional: if you also want manual modal additions to preserve file name, comment this out as well.
    };

    return (
        <Container className="my-4 my-md-5" dir="rtl">
            {/* Control Panel Card */}
            <Card className="shadow-sm mb-4 border-0 bg-light">
                <Card.Body className="p-3 p-md-4">
                    <Row className="gy-3 align-items-center">
                        {/* Title and Info */}
                        <Col xs={12} md={5}>
                            <div className="d-flex align-items-center justify-content-between justify-content-md-start gap-3">
                                <h2 className="mb-0 fs-3 text-primary">
                                    {isEditing ? 'מצב עריכה' : 'רשימת קניות'}
                                </h2>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label={isEditing ? 'מצב עריכה' : 'מצב צפייה'}
                                    checked={isEditing}
                                    onChange={(e) => setIsEditing(e.target.checked)}
                                    className="d-md-none m-0"
                                />
                            </div>
                            <div className="mt-2 text-muted small d-flex flex-wrap gap-2 align-items-center">
                                <span>סה"כ פריטים: <strong>{shoppingList.length}</strong> 🛒</span>
                                {lastFileName && (
                                    <>
                                        <span>•</span>
                                        <span>
                                            קובץ: <strong dir="ltr">{lastFileName}</strong>
                                        </span>
                                    </>
                                )}
                            </div>
                        </Col>

                        {/* Desktop Switch & Action Buttons */}
                        <Col xs={12} md={7}>
                            <div className="d-flex flex-wrap align-items-center justify-content-md-end gap-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch-desktop"
                                    label={isEditing ? 'מצב עריכה' : 'מצב צפייה'}
                                    checked={isEditing}
                                    onChange={(e) => setIsEditing(e.target.checked)}
                                    className="d-none d-md-block ms-3"
                                />
                                
                                <Button 
                                    variant="primary" 
                                    onClick={() => setShowModal(true)} 
                                    className="d-inline-flex align-items-center gap-1 flex-grow-1 flex-sm-grow-0 justify-content-center"
                                >
                                    <BsPlusLg /> הוספה ידנית
                                </Button>
                                
                                <Button 
                                    variant="outline-primary" 
                                    onClick={handleImportClick} 
                                    className="d-inline-flex align-items-center gap-1 flex-grow-1 flex-sm-grow-0 justify-content-center"
                                >
                                    <BsUpload /> ייבוא
                                </Button>

                                {shoppingList.length > 0 && (
                                    <>
                                        <Button 
                                            variant="outline-info" 
                                            onClick={handleMergeClick} 
                                            className="d-inline-flex align-items-center gap-1 flex-grow-1 flex-sm-grow-0 justify-content-center"
                                        >
                                            <BsUpload /> מיזוג
                                        </Button>
                                        <Button 
                                            variant="outline-success" 
                                            onClick={handleDownload} 
                                            className="d-inline-flex align-items-center gap-1 flex-grow-1 flex-sm-grow-0 justify-content-center"
                                        >
                                            <BsDownload /> ייצוא
                                        </Button>
                                        <Button 
                                            variant="outline-danger" 
                                            onClick={handleClearList} 
                                            className="d-inline-flex align-items-center gap-1 flex-grow-1 flex-sm-grow-0 justify-content-center"
                                        >
                                            <BsTrash /> ניקוי
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Form.Control
                type="file"
                ref={importFileRef}
                onChange={(e) => handleFileChange(e, 'import')}
                accept="application/json"
                style={{ display: 'none' }}
            />

            <Form.Control
                type="file"
                ref={mergeFileRef}
                onChange={(e) => handleFileChange(e, 'merge')}
                accept="application/json"
                style={{ display: 'none' }}
            />

            <ShoppingListTable
                items={shoppingList}
                setList={setShoppingList}
                onDelete={handleDelete}
                newItem={newItem}
                setNewItem={setNewItem}
                handleAdd={handleAdd}
                isEditing={isEditing}
            />

            <ManualEditModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                handleAddItems={handleAddManually} 
            />
        </Container>
    );
};

export default ShoppingListPage;