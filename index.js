//install axios, express, ejs
//subscribe rapidApi

const axios = require("axios");
const express = require("express");
const { URLSearchParams } = require("url");
const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  console.log("Translator");
  res.render("index", { translation: null, error: null });
});

app.post("/translate", async (req, res) => {
  const { text, targetLang } = req.body;
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", "en");
  encodedParams.set("target_language", targetLang);
  encodedParams.set("text", text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "4624812606msh1953bd3c1253c24p1f5b4ajsnc3ed0107f81d",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };
  try {
    const response = await axios.request(options);
    res.render("index", {
      translation: response.data.data.translatedText,
      error: null,
    });
  } catch (error) {
    res.render("index", { translation: null, error: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log("server started");
});
