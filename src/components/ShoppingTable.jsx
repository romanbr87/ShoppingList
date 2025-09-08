// components/ShoppingTable.js
import { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { BsTrashFill, BsPencilFill, BsCheckLg, BsXLg, BsPlusLg } from 'react-icons/bs';

const ShoppingTable = ({ items, setList, onDelete }) => {
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedItem, setEditedItem] = useState({ name: '', description: '' });

    const handleEditClick = (item) => {
        setEditingItemId(item.name);
        setEditedItem({ name: item.name, description: item.description });
    };

    const handleSaveClick = (originalName) => {
        if (editedItem.name && editedItem.name !== originalName) {
            const updatedList = { ...items };
            delete updatedList[originalName];
            updatedList[editedItem.name] = editedItem.description;
            setList(updatedList);
        } else {
            setList(prevList => ({ ...prevList, [editedItem.name]: editedItem.description }));
        }
        setEditingItemId(null);
    };

    const handleCancelClick = () => {
        setEditingItemId(null);
        setEditedItem({ name: '', description: '' });
    };

    const itemsArray = Object.entries(items).map(([name, description]) => ({ name, description }));

    return (
        <div className="shadow-sm rounded-3 overflow-hidden">
            <Table striped bordered hover responsive className="mb-0">
                <thead className="bg-dark text-white">
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">פריט</th>
                        <th className="text-center">תיאור</th>
                        <th className="text-center">פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsArray.map((item, index) => (
                        <tr key={item.name}>
                            <td className="text-center align-middle">{index + 1}</td>
                            
                            {editingItemId === item.name ? (
                                <>
                                    <td className="align-middle">
                                        <Form.Control
                                            type="text"
                                            value={editedItem.name}
                                            onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="align-middle">
                                        <Form.Control
                                            type="text"
                                            value={editedItem.description}
                                            onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                                        />
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="align-middle">{item.name}</td>
                                    <td className="align-middle">{item.description}</td>
                                </>
                            )}
                            
                            <td className="text-center align-middle">
                                <div className="d-flex justify-content-center gap-2"> {/* Add flexbox and gap */}
                                    {editingItemId === item.name ? (
                                        <>
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={() => handleSaveClick(item.name)}
                                            >
                                                <BsCheckLg />
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={handleCancelClick}
                                            >
                                                <BsXLg />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                onClick={() => handleEditClick(item)}
                                            >
                                                <BsPencilFill />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => onDelete(item.name)}
                                            >
                                                <BsTrashFill />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ShoppingTable;