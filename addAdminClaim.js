const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

// The email of the user to be made an admin
const email = 'admin-email@example.com';

admin.auth().getUserByEmail(email)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log(`Successfully added admin claim to user with email: ${email}`);
  })
  .catch((error) => {
    console.error('Error adding admin claim:', error);
  });
