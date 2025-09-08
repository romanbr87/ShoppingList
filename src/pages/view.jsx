// pages/view.js
import { useState, useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Header from '../components/Header';
import ShoppingTable from '../components/ShoppingTable';
import { BsUpload, BsDownload } from 'react-icons/bs';

const ViewPage = () => {
    const [shoppingList, setShoppingList] = useState({});
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const parsedData = JSON.parse(e.target.result);
                    setShoppingList(prevList => ({ ...prevList, ...parsedData }));
                } catch (error) {
                    alert("קובץ JSON לא תקין. אנא נסה שוב.");
                }
            };
            reader.readAsText(file);
        }
        event.target.value = null;
    };

    const handleImportClick = () => {
        fileInputRef.current.click();
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
                    <h2 className="mb-0 text-primary">רשימת קניות</h2>
                    <div className="d-flex gap-2">
                        {Object.keys(shoppingList).length > 0 && (
                            <Button variant="outline-success" onClick={handleDownload} className="d-flex align-items-center">
                                ייצוא <BsDownload className="ms-2" />
                            </Button>
                        )}
                        <Button variant="outline-primary" onClick={handleImportClick} className="d-flex align-items-center">
                            ייבוא רשימה <BsUpload className="ms-2" />
                        </Button>
                    </div>
                    <Form.Control
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".json"
                        style={{ display: 'none' }}
                    />
                </div>

                {Object.keys(shoppingList).length > 0 ? (
                    <ShoppingTable
                        items={shoppingList}
                        setList={setShoppingList}
                        onDelete={handleDelete}
                    />
                ) : (
                    <div className="text-center mt-5 p-4 bg-light rounded-3 shadow-sm">
                        <h3 className="mb-3 text-secondary">אין פריטים להצגה</h3>
                        <p className="lead text-muted">התחל על ידי ייבוא רשימה.</p>
                    </div>
                )}
            </Container>
        </>
    );
};

export default ViewPage;