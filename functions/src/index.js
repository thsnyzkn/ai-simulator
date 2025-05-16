const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

exports.onGenerationCreated = onDocumentCreated(
  "generations/{docId}",
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const docRef = db.doc(`generations/${event.params.docId}`);

    const delay = Math.floor(Math.random() * 30 + 30) * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    await docRef.update({
      status: "done",
      finishedAt: Date.now(),
    });
  }
);
