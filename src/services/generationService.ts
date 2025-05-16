// generationService.ts
import { db } from "./firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export async function createGenerationEntry() {
  try {
    const docRef = await addDoc(collection(db, "generations"), {
      status: "processing",
      createdAt: Date.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating generation entry:", error);
    throw new Error("Failed to create generation entry. Please check your internet connection.");
  }
}

export async function markGenerationAsDone(id: string) {
  try {
    const docRef = doc(db, "generations", id);
    await updateDoc(docRef, {
      status: "done",
      finishedAt: Date.now(),
    });
  } catch (error) {
    console.error("Error updating generation status:", error);
    throw new Error("Failed to update generation status. Please check your internet connection.");
  }
}
