import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

interface urlPair {
  shortURL: string;
  fullURL: string;
}

const urlArray: Array<urlPair> = [];

app.post("/", (request, response) => {
  const { fullURL } = request.body;

  const shortURL = uuidv4().substring(0, 6);

  const obj: urlPair = {
    shortURL,
    fullURL,
  };

  urlArray.push(obj);

  return response.json(urlArray);
});

app.get("/:shortURL", (request, response) => {
  const { shortURL } = request.params;

  const matchFound = urlArray.find((item) => item.shortURL === shortURL);

  if (matchFound) {
    return response.redirect(matchFound.fullURL);
  }

  return response.status(404).json();
});

app.listen(4567, () => {
  console.log("Server ready at port 4567");
});
