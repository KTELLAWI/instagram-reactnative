const functions = require("firebase-functions");
const admin = require("firebase-admin")
admin.initializeApp();
const db = admin.firestore();

exports.addLike = functions.firestore.document('/post/{creatingId}/userPosts/{postIde}/likes/{userIde}')
.onCreate((snap,context) => {
  return db.collection('post').doc(context.params.creatingId).collection('userPosts').doc(context.params.postIde)
  .update({ 
      likeCount:admin.firestore.FieldValue.increment(1)
    
    })
})

exports.removeLike = functions.firestore.document('/post/{creatorId}/userPosts/{postId}/likes/{userId}')
.onDelete((snap,context) => {
  return db.collection('post').doc(context.params.creatorId).collection('userPosts').doc(context.params.postId)
  .update({ 
      likeCount:admin.firestore.FieldValue.increment(-1)
    
    })
})





// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
