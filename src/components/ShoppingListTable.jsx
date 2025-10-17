// components/ShoppingListTable.jsx
import { useRef } from 'react';
import { Table } from 'react-bootstrap';
import AddItemForm from './AddItemForm';
import ViewTableBody from './ViewTableBody';
import EditTableBody from './EditTableBody';

const ShoppingListTable = ({ items, setList, onDelete, newItem, setNewItem, handleAdd, isEditing }) => {
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
    const colSpanCount = 4; // Number of columns in the table (Count, Name, Description, Actions)

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
                    <tr>
                        <th className="text-center">#</th>
                        <th>שם המוצר</th>
                        <th>תיאור/כמות</th>
                        <th className="text-center">{isEditing ? 'מחק' : 'פעולות'}</th>
                    </tr>
                    {items.length === 0 &&
                        // Renders the message inside the tbody, spanning all columns
                        <tr>
                            <td colSpan={colSpanCount} className="text-center py-4 bg-light text-muted">
                                <h4>אין פריטים להצגה 😥</h4>
                                <p className="mb-0">התחל על ידי הוספת פריטים למטה או ייבוא רשימה.</p>
                            </td>
                        </tr>
                    }
                </thead>

                {isEditing ? (
                    <EditTableBody {...commonProps} />
                ) : (
                    <ViewTableBody {...commonProps} />
                )}

                {/* Only show the AddItemForm footer if there are items OR if the list is empty 
                   AND we are not showing the full empty message block above.
                   Since the check is now inside the table, we'll unconditionally render the footer 
                   if the list is NOT empty. If the list is empty, the logic below still works: */}
                {items.length > 0 && (
                    <tfoot>
                        <AddItemForm newItem={newItem} setNewItem={setNewItem} handleAdd={handleAdd} isInTable={true} />
                    </tfoot>
                )}

            </Table>
            {/* If the list is empty, the AddItemForm needs to be rendered outside the table if 
                we want to keep it visible below the message. Let's handle this in shoppinglistapp.js */}
        </div>
    );
};

export default ShoppingListTable;