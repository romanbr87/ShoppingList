// utils/listUtils.js

/**
 * Merges a new shopping list with an existing one, avoiding duplicate items.
 * An item is considered a duplicate if its name and description are identical (case-insensitive and trimmed) to an item already in the list.
 * @param {Array} existingList The current shopping list (array of objects).
 * @param {Array} newList The new list to be merged (array of objects).
 * @returns {Array} The merged shopping list with unique items.
 */
export const mergeLists = (existingList, newList) => {
    // Helper to normalize item keys for case-insensitive/trim-safe comparison
    const normalizeKey = (item) => {
        if (!item || !item.name) return null;
        return `${item.name.trim().toLowerCase()}-${item.description ? item.description.trim().toLowerCase() : ''}`;
    };

    // Create a Set of keys from the existing list for efficient lookup
    const existingKeys = new Set(existingList.map(normalizeKey).filter(key => key !== null));

    const uniqueNewItems = newList.filter(newItem => {
        const newItemKey = normalizeKey(newItem);
        
        // Skip items with no name or items that are duplicates
        if (newItemKey === null || existingKeys.has(newItemKey)) {
            return false;
        } else {
            // Add the new item's key to the set to prevent internal duplicates within the newList itself
            existingKeys.add(newItemKey);
            return true;
        }
    }).map(item => ({
        // Ensure name/description are trimmed and assign a unique ID
        name: item.name.trim(),
        description: item.description ? item.description.trim() : '',
        id: Date.now() + Math.random(),
    }));

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