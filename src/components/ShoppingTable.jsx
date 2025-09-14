// components/ShoppingTable.js
import { useState, useRef } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { BsTrashFill, BsPencilFill, BsCheckLg, BsXLg } from 'react-icons/bs';

const ShoppingTable = ({ items, setList, onDelete }) => {
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedItem, setEditedItem] = useState({ name: '', description: '' });
    const [checkedItems, setCheckedItems] = useState({});
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    const handleDoubleClick = (id) => {
        setCheckedItems(prevChecked => ({
            ...prevChecked,
            [id]: !prevChecked[id]
        }));
    };

    const handleEditClick = (item) => {
        setEditingItemId(item.id);
        setEditedItem({ name: item.name, description: item.description });
    };

    const handleSaveClick = (id) => {
        const updatedList = items.map(item =>
            item.id === id ? { ...editedItem, id } : item
        );
        setList(updatedList);
        setEditingItemId(null);
    };

    const handleCancelClick = () => {
        setEditingItemId(null);
        setEditedItem({ name: '', description: '' });
    };

    const handleDragStart = (e, index) => {
        dragItem.current = index;
    };

    const handleDragEnter = (e, index) => {
        dragOverItem.current = index;
    };

    const handleDrop = () => {
        const _list = [...items];
        const draggedItemContent = _list.splice(dragItem.current, 1)[0];
        _list.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(_list);
    };

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
                    {items.map((item, index) => (
                        <tr
                            key={item.id}
                            draggable={!checkedItems[item.id]} // Disable drag when checked
                            onDoubleClick={() => handleDoubleClick(item.id)}
                            onDragStart={!checkedItems[item.id] ? (e) => handleDragStart(e, index) : null}
                            onDragEnter={!checkedItems[item.id] ? (e) => handleDragEnter(e, index) : null}
                            onDrop={!checkedItems[item.id] ? handleDrop : null}
                            onDragOver={!checkedItems[item.id] ? (e) => e.preventDefault() : null}
                            style={{
                                cursor: checkedItems[item.id] ? 'not-allowed' : 'grab',
                                textDecoration: checkedItems[item.id] ? 'line-through black' : 'none'
                            }}
                        >
                            <td className="text-center align-middle">{index + 1}</td>
                            
                            {editingItemId === item.id ? (
                                <>
                                    <td className="align-middle">
                                        <Form.Control type="text" value={editedItem.name} onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })} required disabled={checkedItems[item.id]} />
                                    </td>
                                    <td className="align-middle">
                                        <Form.Control type="text" value={editedItem.description} onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })} disabled={checkedItems[item.id]} />
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="align-middle">{item.name}</td>
                                    <td className="align-middle">{item.description}</td>
                                </>
                            )}
                            
                            <td className="text-center align-middle">
                                <div className="d-flex justify-content-center gap-2">
                                    {editingItemId === item.id ? (
                                        <>
                                            <Button variant="success" size="sm" onClick={() => handleSaveClick(item.id)} disabled={checkedItems[item.id]}><BsCheckLg /></Button>
                                            <Button variant="secondary" size="sm" onClick={handleCancelClick} disabled={checkedItems[item.id]}><BsXLg /></Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="warning" size="sm" onClick={() => handleEditClick(item)} disabled={checkedItems[item.id]}><BsPencilFill /></Button>
                                            <Button variant="danger" size="sm" onClick={() => onDelete(item.id)} disabled={checkedItems[item.id]}><BsTrashFill /></Button>
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