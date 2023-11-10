import { useEffect, useState } from "react";
import "./App.css";
import { getRandomCat, getTextCat } from "./functions/getRandomCat";
import GenerateTab from "./components/GenerateTab";
import { tabs } from "./constants/tabs";
import { motion, AnimatePresence } from "framer-motion";
import HistoryTab from "./components/HistoryTab";
import { FaCat, FaHistory, FaMoon, FaSun } from "react-icons/fa";

function App() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [history, setHistory] = useState([]);
  const [imageID, setImageID] = useState();
  const [spanish, setSpanish] = useState();
  const [firstWord, setFirstWord] = useState();
  const [form, setForm] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    setForm(value);
  };

  const handleRandomCat = () => {
    getRandomCat(setSpanish, setImageID, setFirstWord);
  };

  const handleTextCat = () => {
    getTextCat(form, setSpanish, setImageID, setFirstWord);
  };

  useEffect(() => {
    imageID == undefined
      ? null
      : setHistory((prev) => [
          { sentence: spanish, img: imageID, word: firstWord },
          ...prev,
        ]);
  }, [imageID]);

  // /*
  //  Se utiliza un primer useEffect para recuperar el dato sobre el gato
  //  utilizando la primera API (CAT_FACT_API_URL)
  // */
  // useEffect(() => {
  //   fetch(CAT_FACT_API_URL)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const { fact } = data;
  //       setCat(fact);
  //     });
  // }, []);

  // /*
  //  Se utiliza un segundo useEffect que opera tras el cambio de la variable "fact".
  //  Se comprueba que dicha variable no está vacía y se envía el texto a la API de Google Translate codificado para URL.
  // */
  // useEffect(() => {
  //   if (!cat) return;

  //   // Este replace soluciona el hecho de que el encoding se pare a mitad de una frase o cuando hay un punto y seguido en la oración.
  //   const query = cat
  //     .replace(".", " ")
  //     .replace(".", " ")
  //     .replace(".", " ")
  //     .replace(".", " ");

  //   fetch(TRANSLATOR_API_URL + encodeURI(query))
  //     .then((response) => response.json())
  //     .then((data) => setSpanish(data[0][0][0]));
  // }, [cat]);

  // // useEffect(() => {
  // //   historyItem.sentence = fact;
  // //   historyItem.img = "_id";
  // // }, [fact]);

  // /*
  //  Se utiliza un tercer useEffect que opera tras el cambio de la variable "spanish".
  //  Se comprueba que dicha variable no está vacía y se separa la primera palabra del resto
  //  del dato obtenido. Entonces se usa la tercera API (combinando CAT_URL_BASEURL y CAT_URL_PROPERTIES)
  //  para obtener la imagen con el texto en ella.
  // */
  // useEffect(() => {
  //   if (!spanish) return;

  //   setFirstWord(spanish.split(" ").slice(0, 2).join(" "));
  //   fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
  //     .then((res) => res.json())
  //     .then((response) => {
  //       const { _id } = response;
  //       setImageID(_id);
  //     });
  // }, [spanish]);

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    darkMode
      ? document.querySelector("html").setAttribute("data-dark-mode", "")
      : document.querySelector("html").removeAttribute("data-dark-mode", "");
  }, [darkMode]);

  return (
    <main>
      <div className="box">
        <div className="box__title-container">
          <h1 className="box__title">¡Gatos!</h1>
          <button
            className="btn btn--nightMode btn--random"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            {darkMode ? <FaMoon /> : <FaSun />}
          </button>
        </div>
        <div className="box__content-container">
          <nav className="box__content-colL">
            <ul className="box__content-colL__ul">
              {tabs.map((tab) => (
                <li
                  key={tab.label}
                  onClick={() => setSelectedTab(tab)}
                  className={`${
                    tab === selectedTab
                      ? "btn btn--active btn--nav"
                      : "btn btn--nav btn--hover"
                  }`}
                >
                  {tab.icon == "cat" ? <FaCat /> : <FaHistory />}
                  <span>{tab.label}</span>
                </li>
              ))}
            </ul>
          </nav>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="box__content-colR"
            >
              {selectedTab === tabs[0] ? (
                <GenerateTab
                  textCat={handleTextCat}
                  randomCat={handleRandomCat}
                  form={form}
                  spanish={spanish}
                  firstWord={firstWord}
                  imageID={imageID}
                  handleChange={handleChange}
                />
              ) : (
                <HistoryTab history={history} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

export default App;
