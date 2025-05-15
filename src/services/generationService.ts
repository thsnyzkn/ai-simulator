// generationService.ts
import { db } from "./firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export async function createGenerationEntry() {
  const docRef = await addDoc(collection(db, "generations"), {
    status: "processing",
    createdAt: Date.now(),
  });

  return docRef.id;
}

export async function markGenerationAsDone(id: string) {
  const docRef = doc(db, "generations", id);
  await updateDoc(docRef, {
    status: "done",
    finishedAt: Date.now(),
  });
}
