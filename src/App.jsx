import { useEffect, useState } from "react";
import "./App.css";

const CAT_FACT_API_URL = "https://catfact.ninja/fact";
const CAT_URL_BASEURL = "https://cataas.com/cat/";
const CAT_URL_PROPERTIES = "?fontSize=50&fontColor=red";

function App() {
  const [fact, setFact] = useState();
  const [firstWord, setFirstWord] = useState();
  const [imageID, setImageID] = useState();

  /*
   Se utiliza un primer useEffect para recuperar el dato sobre el gato
   utilizando la primera API (CAT_FACT_API_URL)
  */
  useEffect(() => {
    fetch(CAT_FACT_API_URL)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  }, []);

  /*
   Se utiliza un segundo useEffect que opera tras el cambio de la variable "fact".
   Se comprueba que dicha variable no está vacía y se separa la primera palabra del resto
   del dato obtenido. Entonces se usa la segunda API (combinando CAT_URL_BASEURL y CAT_URL_PROPERTIES)
   para obtener la imagen con el texto en ella.
  */

  useEffect(() => {
    if (!fact) return;

    setFirstWord(fact.split(" ")[0]);
    fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
      .then((res) => res.json())
      .then((response) => {
        const { _id } = response;
        setImageID(_id);
      });
  }, [fact]);

  return (
    <main>
      <h1>helo</h1>
      {fact && <p>{fact}</p>}
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
