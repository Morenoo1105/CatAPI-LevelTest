import { useState } from "react";

const CAT_FACT_API_URL = "https://catfact.ninja/fact";
const TRANSLATOR_API_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=";
const CAT_URL_BASEURL = "https://cataas.com/cat/";

export const getRandomCat = (setSpanish, setImageID, setFirstWord) => {
  /*
   * Se utiliza un primer fetch para recuperar el dato sobre el gato
   * utilizando la primera API (CAT_FACT_API_URL)
   */

  fetch(CAT_FACT_API_URL)
    .then((response) => response.json())
    .then(({ fact }) => {
      const engFact = fact.replace(/\./g, "%555");

      /*
       * Se utiliza un segundo fetch para traducir el dato sobre el gato al castellano
       * utilizando la segunda API (TRANSLATOR_API_URL).
       */

      fetch(TRANSLATOR_API_URL + encodeURI(engFact))
        .then((responseTranslate) => responseTranslate.json())
        .then((dataTranslate) => {
          // Este replace soluciona el hecho de que el encoding se pare a mitad de una frase o cuando hay un punto y seguido en la oración.

          const espFact = dataTranslate[0][0][0].replace(/%555/g, ".");
          setSpanish(espFact);

          const firstWord = espFact.split(" ").slice(0, 2).join(" ");
          setFirstWord(firstWord);

          /*
           * Se utiliza un tercer fetch para obtener la ID de la fotografía del gato
           * utilizando la tercera API (CAT_URL_BASEURL).
           */

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

  /*
   * Se utiliza un fetch para recuperar la ID de una imagen de gato
   * utilizando la tercera API (CAT_URL_BASEURL), utilizando también
   * la/las palabras introducidas en el campo de texto.
   */

  fetch(`${CAT_URL_BASEURL}says/${word}?json=true`)
    .then((responseImg) => responseImg.json())
    .then(({ _id }) => {
      const imgID = _id;
      setImageID(imgID);
    });
};
