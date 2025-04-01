import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, doc } from "firebase/firestore";

/**
 * Get all shopping list items for a specific user
 * @param {string} userId - User's UID
 * @returns {Array} - Array of items
 */
export async function getItems(userId) {
    const items = [];
    // Reference to user's items subcollection
    const q = query(collection(db, "users", userId, "items"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        items.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    return items;
}

/**
 * Add a new item to the user's shopping list
 * @param {string} userId - User's UID
 * @param {object} item - Item data
 * @returns {string} - ID of the newly created document
 */
export async function addItem(userId, item) {
    const colRef = collection(db, "users", userId, "items");
    const docRef = await addDoc(colRef, item);
    return docRef.id;
}

/**
 * Delete an item from the user's shopping list
 * @param {string} userId - User's UID
 * @param {string} itemId - Item ID
 */
export async function deleteItem(userId, itemId) {
    const itemRef = doc(db, "users", userId, "items", itemId);
    await deleteDoc(itemRef);
}
