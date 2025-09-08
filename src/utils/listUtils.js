// utils/listUtils.js

/**
 * Merges a new shopping list with an existing one.
 * If a key (item name) already exists, it appends the new description.
 * @param {Object} existingList The current shopping list.
 * @param {Object} newList The new list to be merged.
 * @returns {Object} The merged shopping list.
 */
export const mergeLists = (existingList, newList) => {
    const mergedList = { ...existingList };
    for (const [key, value] of Object.entries(newList)) {
        if (mergedList[key]) {
            // If the item exists, append the new description
            mergedList[key] = `${mergedList[key]}, ${value}`;
        } else {
            // Otherwise, add the new item
            mergedList[key] = value;
        }
    }
    return mergedList;
};