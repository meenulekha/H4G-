import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import db from "../firebase";

// Add a new document
export const addReminder = async (reminder) => {
  try {
    const docRef = await addDoc(collection(db, "reminders"), reminder);
    console.log("Document added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Get all documents
export const getReminders = async () => {
  const reminders = [];
  try {
    const querySnapshot = await getDocs(collection(db, "reminders"));
    querySnapshot.forEach((doc) => {
      reminders.push({ id: doc.id, ...doc.data() });
    });
    return reminders;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

// Update a document
export const updateReminder = async (id, updatedData) => {
  try {
    const docRef = doc(db, "reminders", id);
    await updateDoc(docRef, updatedData);
    console.log("Document updated");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// Delete a document
export const deleteReminder = async (id) => {
  try {
    const docRef = doc(db, "reminders", id);
    await deleteDoc(docRef);
    console.log("Document deleted");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
