"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onGenerationCreated = void 0;
const admin = require("firebase-admin");
const functions = require("firebase-functions/v2");
admin.initializeApp();
const db = admin.firestore();
exports.onGenerationCreated = functions.firestore.onDocumentCreated('generations/{docId}', async (event) => {
    const snap = event.data;
    if (!snap) {
        console.error('No data associated with the event');
        return;
    }
    const data = snap.data();
    const docRef = db.doc(`generations/${event.params.docId}`);
    try {
        // Log the incoming generation request
        console.log('Processing generation request:', {
            id: event.params.docId,
            prompt: data.prompt,
            style: data.style,
        });
        // In a real implementation, you would call your AI service here
        // For now, we'll simulate the processing time
        const delay = Math.floor(Math.random() * 30 + 30) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        // Simulate generating an image URL
        // In a real implementation, this would be the URL from your AI service
        const imageUrl = 'https://picsum.photos/512';
        // Update the document with the generated image
        await docRef.update({
            status: 'done',
            finishedAt: Date.now(),
            imageUrl: imageUrl,
        });
        console.log('Generation completed successfully:', {
            id: event.params.docId,
            imageUrl: imageUrl,
        });
    }
    catch (error) {
        console.error('Error processing generation:', error);
        // Update the document with error status
        await docRef.update({
            status: 'error',
            finishedAt: Date.now(),
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
});
//# sourceMappingURL=index.js.map