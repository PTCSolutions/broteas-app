import * as functions from "firebase-functions";
import linkPreviewGenerator = require("link-preview-generator");
import * as admin from "firebase-admin";

const runtimeOpts = {
  timeoutSeconds: 60,
  memory: "2GB" as const,
};

// This is a function which populates a 'news document'
// with the meta data from the url given upon creation
exports.newsMetaData = functions
    .runWith(runtimeOpts)
    .firestore
    .document("/news/{docId}")
    .onCreate(async (snapshot, context) => {
      try {
        const docId: string = context.params.docId;
        const url: string = snapshot.data().url;

        const json = await linkPreviewGenerator(encodeURI(url));

        await admin.firestore()
            .collection("news")
            .doc(docId)
            .update(json);

        return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    });
