// components/ShoppingListTable.jsx
import { useRef } from 'react';
import { Table } from 'react-bootstrap';
import AddItemForm from './AddItemForm';
import ViewTableBody from './ViewTableBody';
import EditTableBody from './EditTableBody';

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

    // Helper function to check for duplicates (Name AND Description)
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

    const commonProps = {
        items,
        setList,
        onDelete,
        handleDragStart,
        handleDragEnter,
        handleDrop,
        isDuplicate,
    };

    return (
        <div className="shadow-sm rounded-3 overflow-hidden table-responsive">
            <Table striped bordered hover className="mb-0">
                <thead className="bg-dark text-white">
                    {items.length > 0 ?
                        <tr>
                            <th className="text-center">#</th>
                            <th>שם המוצר</th>
                            <th>תיאור/כמות</th>
                            <th className="text-center">{isEditing ? 'מחק' : 'פעולות'}</th>
                        </tr>
                        :
                        <tr className="text-center">
                            <td colSpan={100} className="p-4 bg-light shadow-sm my-3">
                                <h3 className="mb-3 text-secondary">אין פריטים להצגה</h3>
                                <p className="lead text-muted mb-0">התחל על ידי הוספת פריטים למטה או ייבוא רשימה.</p>
                            </td>
                        </tr>
                    }
                </thead>

                {items.length > 0 && <tbody>
                    {isEditing ? (
                        <EditTableBody {...commonProps} />
                    ) : (
                        <ViewTableBody {...commonProps} />
                    )}
                </tbody>}

                <tfoot>
                    <AddItemForm newItem={newItem} setNewItem={setNewItem} handleAdd={handleAdd} isInTable={true} />
                </tfoot>
            </Table>
        </div>
    );
};

export default ShoppingListTable;