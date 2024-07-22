// fetchTranslations.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the path as needed

const fetchTranslations = async (lng) => {
  const docRef = doc(db, "lang", lng);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data(); // Returns the document data as a JSON object
  } else {
    console.log("No such document!");
    return null;
  }
};

export default fetchTranslations;
