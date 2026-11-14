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

    // Mobile reorder handler (Move Up / Move Down)
    const handleMove = (index, direction) => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= items.length) return;
        
        const _list = [...items];
        const movedItem = _list.splice(index, 1)[0];
        _list.splice(newIndex, 0, movedItem);
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
        <div className="shadow-sm rounded-3 overflow-hidden mb-4">
            {/* Desktop Table View / Mobile Optimized Wrapper */}
            <div className="table-responsive">
                <Table striped bordered hover align="middle" className="mb-0 align-middle">
                    <thead className="bg-dark text-white">
                        {hasItems ?
                            <tr>
                                <th className="text-center" style={{ width: '60px' }}>#</th>
                                <th style={{ width: '30%' }}>שם המוצר</th>
                                <th style={{ width: '40%' }}>תיאור/כמות</th>
                                <th className="text-center" style={{ width: '150px' }}>{isEditing ? 'מחק' : 'פעולות'}</th>
                            </tr>
                            :
                            <tr className="text-center p-0 border-0"> 
                                <td colSpan={100} className="p-0 border-0">
                                    <div className="p-5 text-center">
                                        <h4 className="mb-2 text-secondary">אין פריטים להצגה</h4>
                                        <p className="text-muted mb-0">התחל על ידי הוספת פריטים למטה או ייבוא רשימה.</p>
                                    </div>
                                </td>
                            </tr>
                        }
                    </thead>

                    {hasItems && (
                        <tbody>
                            <TableBody
                                items={items}
                                setList={setList}
                                onDelete={onDelete}
                                handleDragStart={handleDragStart}
                                handleDragEnter={handleDragEnter}
                                handleDrop={handleDrop}
                                handleMove={handleMove}
                                isDuplicate={isDuplicate}
                                isEditing={isEditing}
                            />
                        </tbody>
                    )}

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
        </div>
    );
};

export default ShoppingListTable;