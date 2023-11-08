import { useEffect, useState } from "react";
import "./App.css";

const TRANSLATOR_API_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=";
const CAT_FACT_API_URL = "https://catfact.ninja/fact";
const CAT_URL_BASEURL = "https://cataas.com/cat/";
const CAT_URL_PROPERTIES = "?fontSize=40&fontColor=orange";

function App() {
  const [fact, setFact] = useState("Loading");
  const [number, setNumber] = useState(0);
  const [spanish, setSpanish] = useState("");

  const [firstWord, setFirstWord] = useState();
  const [imageID, setImageID] = useState();

  /*
   Se utiliza un primer useEffect para recuperar el dato sobre el gato
   utilizando la primera API (CAT_FACT_API_URL)
  */
  useEffect(() => {
    fetch(CAT_FACT_API_URL)
      .then((response) => response.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
        setNumber(parseInt(Math.random() * 999));
      });
  }, []);

  /*
   Se utiliza un segundo useEffect que opera tras el cambio de la variable "fact".
   Se comprueba que dicha variable no está vacía y se envía el texto a la API de Google Translate codificado para URL.
  */
  useEffect(() => {
    if (!fact) return;

    // Este replace soluciona el hecho de que el encoding se pare a mitad de una frase o cuando hay un punto y seguido en la oración.
    const query = fact
      .replace(".", " ")
      .replace(".", " ")
      .replace(".", " ")
      .replace(".", " ");

    fetch(TRANSLATOR_API_URL + encodeURI(query))
      .then((response) => response.json())
      .then((data) => setSpanish(data[0][0][0]));
  }, [fact]);

  /*
   Se utiliza un tercer useEffect que opera tras el cambio de la variable "spanish".
   Se comprueba que dicha variable no está vacía y se separa la primera palabra del resto
   del dato obtenido. Entonces se usa la tercera API (combinando CAT_URL_BASEURL y CAT_URL_PROPERTIES)
   para obtener la imagen con el texto en ella.
  */
  useEffect(() => {
    if (!spanish) return;

    setFirstWord(spanish.split(" ").slice(0, 2).join(" "));
    fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
      .then((res) => res.json())
      .then((response) => {
        const { _id } = response;
        setImageID(_id);
      });
  }, [spanish]);

  return (
    <main>
      <h1>Random cat facts!</h1>
      <h2>#{number}</h2>
      {spanish && <p>{spanish}</p>}
      {imageID && (
        <img
          src={`${CAT_URL_BASEURL}${imageID}/says/${firstWord}${CAT_URL_PROPERTIES}`}
          alt={`Image extracted using the first word of ${fact}`}
        />
      )}
    </main>
  );
}

export default App;
