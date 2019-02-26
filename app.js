const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const serviceAccount = require("./yg-nodejs-firebase-adminsdk-08mwc-90ff7da810.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://yg-nodejs.firebaseio.com"
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const rootRoutes = require('./routes/root');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// all routes go through root
app.use('/', rootRoutes);

admin.auth().createUser({
  email: "user@example.com",
  emailVerified: false,
  phoneNumber: "+11234567890",
  password: "secretPassword",
  displayName: "John Doe",
  photoURL: "http://www.example.com/12345678/photo.png",
  disabled: false
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});