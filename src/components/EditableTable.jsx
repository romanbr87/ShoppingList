// components/EditableTable.js
import { useState, useRef } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { BsTrashFill } from 'react-icons/bs';

const EditableTable = ({ items, setList, onDelete }) => {
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    const handleDragStart = (e, index) => {
        dragItem.current = index;
    };

    const handleDragEnter = (e, index) => {
        dragOverItem.current = index;
    };

    const handleDrop = () => {
        const itemsArray = Object.entries(items).map(([name, description]) => ({ name, description }));
        const _list = [...itemsArray];
        const draggedItemContent = _list.splice(dragItem.current, 1)[0];
        _list.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;

        const reorderedObject = _list.reduce((obj, item) => {
            obj[item.name] = item.description;
            return obj;
        }, {});

        setList(reorderedObject);
    };

    const handleItemChange = (originalName, field, value) => {
        const updatedList = { ...items };

        if (field === 'name') {
            const description = updatedList[originalName];
            delete updatedList[originalName];
            updatedList[value] = description;
        } else {
            updatedList[originalName] = value;
        }
        setList(updatedList);
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
                        <tr
                            key={item.name}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnter={(e) => handleDragEnter(e, index)}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            style={{ cursor: 'grab' }}
                        >
                            <td className="text-center align-middle">{index + 1}</td>
                            <td className="align-middle">
                                <Form.Control
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(item.name, 'name', e.target.value)}
                                    required
                                />
                            </td>
                            <td className="align-middle">
                                <Form.Control
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(item.name, 'description', e.target.value)}
                                />
                            </td>
                            <td className="text-center align-middle">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDelete(item.name)}
                                >
                                    <BsTrashFill />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default EditableTable;