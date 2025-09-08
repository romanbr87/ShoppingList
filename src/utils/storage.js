export const saveShoppingList = (list) => {
  try {
    const serializedList = JSON.stringify(list);
    localStorage.setItem('shoppingList', serializedList);
  } catch (error) {
    console.error("Error saving to local storage", error);
  }
};

export const loadShoppingList = () => {
  try {
    const serializedList = localStorage.getItem('shoppingList');
    if (serializedList === null) {
      return undefined;
    }
    return JSON.parse(serializedList);
  } catch (error) {
    console.error("Error loading from local storage", error);
    return undefined;
  }
};