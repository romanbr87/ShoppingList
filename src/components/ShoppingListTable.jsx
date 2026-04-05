// components/ShoppingListTable.jsx
import { useRef } from 'react';
import { Table } from 'react-bootstrap';
import AddItemForm from './AddItemForm';
import TableBody from './TableBody';

const ShoppingListTable = ({ items, setList, onDelete, newItem, setNewItem, handleAdd, isEditing }) => {
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

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

    const isDuplicate = (list, item, excludeId) => {
        if (!item.name || !item.name.trim()) return true;

        const newItemKey = `${item.name.trim().toLowerCase()}-${item.description.trim().toLowerCase()}`;

        return list.some(existingItem => {
            if (existingItem.id === excludeId) {
                return false;
            }
            const existingKey = `${existingItem.name.trim().toLowerCase()}-${existingItem.description.trim().toLowerCase()}`;
            return existingKey === newItemKey;
        });
    };

    const hasItems = items.length > 0;

    return (
        <div className="shadow-sm rounded-3 overflow-hidden table-responsive mb-4">
            <Table striped bordered hover className="mb-0">
                <thead className="bg-dark text-white">
                    {hasItems ?
                        <tr>
                            <th className="text-center" style={{ width: '75px', maxWidth: '75px' }}>#</th>
                            <th>שם המוצר</th>
                            <th>תיאור/כמות</th>
                            <th className="text-center">{isEditing ? 'מחק' : 'פעולות'}</th>
                        </tr>
                        :
                        <tr className="text-center p-0 border-0"> 
                            <td colSpan={100} className="p-0 border-0">
                                <div className="p-4">
                                    <h3 className="mb-3 text-secondary">אין פריטים להצגה</h3>
                                    <p className="lead text-muted mb-0">התחל על ידי הוספת פריטים למטה או ייבוא רשימה.</p>
                                </div>
                            </td>
                        </tr>
                    }
                </thead>

                {hasItems && <tbody>
                    <TableBody
                        items={items}
                        setList={setList}
                        onDelete={onDelete}
                        handleDragStart={handleDragStart}
                        handleDragEnter={handleDragEnter}
                        handleDrop={handleDrop}
                        isDuplicate={isDuplicate}
                        isEditing={isEditing}
                    />
                </tbody>}

                <tfoot className="bg-dark text-white">
                    <AddItemForm 
                        newItem={newItem} 
                        setNewItem={setNewItem} 
                        handleAdd={handleAdd}
                        hasItems={hasItems}
                    />
                </tfoot>
            </Table>
        </div>
    );
};

export default ShoppingListTable;