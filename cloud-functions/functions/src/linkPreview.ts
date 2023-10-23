import * as functions from "firebase-functions";
import linkPreviewGenerator = require("link-preview-generator");
import cors = require("cors")

// TODO: Make this only our website and local host
const corsFunc = cors({origin: true});

const runtimeOpts = {
  timeoutSeconds: 30,
  memory: "512MB" as const,
};

// A function which takes in a url and returns the meta data of the url
export const linkPreview = functions
    .region("europe-west2")
    .runWith(runtimeOpts)
    .https
    .onRequest(
        (request, response) => {
          corsFunc(request, response, () => {
            const encodedUrl: string | undefined =
          request.body.url || request.query.url;
            if (encodedUrl) {
              const url = decodeURI(encodedUrl);

              // Code for the preview generator package is here: https://github.com/AndrejGajdos/link-preview-generator
              linkPreviewGenerator(url)
                  .then((data) => response.send(data))
                  .catch((error) => response.status(500).send(error));
            } else {
              response.status(500).send("Url incorrect");
            }
          });
        });
