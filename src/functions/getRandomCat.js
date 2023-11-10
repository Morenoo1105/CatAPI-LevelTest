import { useState } from "react";

const CAT_FACT_API_URL = "https://catfact.ninja/fact";
const TRANSLATOR_API_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=";
const CAT_URL_BASEURL = "https://cataas.com/cat/";

export const getRandomCat = (setSpanish, setImageID, setFirstWord) => {
  fetch(CAT_FACT_API_URL)
    .then((response) => response.json())
    .then(({ fact }) => {
      const engFact = fact.replace(/\./g, "%555");

      fetch(TRANSLATOR_API_URL + encodeURI(engFact))
        .then((responseTranslate) => responseTranslate.json())
        .then((dataTranslate) => {
          const espFact = dataTranslate[0][0][0].replace(/%555/g, ".");
          setSpanish(espFact);

          const firstWord = espFact.split(" ").slice(0, 2).join(" ");
          setFirstWord(firstWord);
          fetch(`${CAT_URL_BASEURL}says/${firstWord}?json=true`)
            .then((responseImg) => responseImg.json())
            .then(({ _id }) => {
              const imgID = _id;
              setImageID(imgID);
            });
        });
    });
};

export const getTextCat = (form, setSpanish, setImageID, setFirstWord) => {
  const word = form;

  setSpanish(word);
  setFirstWord(word);
  fetch(`${CAT_URL_BASEURL}says/${word}?json=true`)
    .then((responseImg) => responseImg.json())
    .then(({ _id }) => {
      const imgID = _id;
      setImageID(imgID);
    });
};
