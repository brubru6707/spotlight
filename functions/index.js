const functions = require('firebase-functions');

// Example Cloud Function - replace with your actual functions
exports.helloWorld = functions.https.onCall((data, context) => {
  return { message: 'Hello from Firebase!' };
});