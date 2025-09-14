// utils/listUtils.js

/**
 * Merges a new shopping list with an existing one, avoiding duplicate items.
 * An item is considered a duplicate if its name and description are identical to an item already in the list.
 * @param {Array} existingList The current shopping list (array of objects).
 * @param {Array} newList The new list to be merged (array of objects).
 * @returns {Array} The merged shopping list with unique items.
 */
export const mergeLists = (existingList, newList) => {
    // Create a Set to efficiently check for existing items
    const existingItems = new Set(existingList.map(item => `${item.name}-${item.description}`));

    const uniqueNewItems = newList.filter(newItem => {
        // Create a unique key for the new item
        const newItemKey = `${newItem.name}-${newItem.description}`;
        // Check if the key already exists in the set
        if (existingItems.has(newItemKey)) {
            return false; // It's a duplicate, so don't include it
        } else {
            existingItems.add(newItemKey); // Add the new item's key to the set
            return true; // It's a unique item, so include it
        }
    });

    return [...existingList, ...uniqueNewItems];
};

/**
 * Converts a JSON object with key-value pairs to an array of objects.
 * This is for backward compatibility with older data formats.
 * @param {Object} obj The JSON object to convert.
 * @returns {Array} An array of objects, with each object having name, description, and a unique id.
 */
export const convertObjectToList = (obj) => {
    return Object.entries(obj).map(([name, description]) => ({
        name,
        description,
        id: Date.now() + Math.random(),
    }));
};