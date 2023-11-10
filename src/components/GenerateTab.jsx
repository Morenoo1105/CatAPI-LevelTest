import React, { useState } from "react";

import { FaRandom, FaSearch } from "react-icons/fa";

import "./tabs.css";
import "../App.css";

const CAT_URL_PROPERTIES = "?fontSize=40&fontColor=orange";

const GenerateTab = ({
  textCat,
  randomCat,
  form,
  spanish,
  firstWord,
  imageID,
  handleChange,
}) => {
  const [disabled, setDisabled] = useState(false);

  const handleRandomCat = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 700);

    randomCat();
  };

  const handleTextCat = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 700);

    form && textCat();
  };

  return (
    <section className="tab__container">
      <div className="generate__head">
        <div className="generate__form">
          <input
            className="input--search"
            placeholder="Texto personalizado"
            type="text"
            name="text"
            value={form}
            required={true}
            onChange={handleChange}
          />
          <button
            className="btn btn--random btn--search"
            onClick={handleTextCat}
          >
            <FaSearch />
          </button>
        </div>
        <button
          className="btn btn--random"
          disabled={disabled}
          onClick={handleRandomCat}
        >
          <FaRandom />
        </button>
      </div>
      <div className="generate__body">
        {imageID ? (
          <div className="generate__body-fact__container">
            <img
              className="generate__body-fact-image"
              src={`https://cataas.com/cat/${imageID}/says/${firstWord}${CAT_URL_PROPERTIES}`}
              alt={`Imagen extraída usando la primera frase de ${spanish}`}
            />

            <h2 className="generate__body-fact-text">{spanish}</h2>
          </div>
        ) : (
          <>
            <p className="generate__body-placeholder">Esto está muy vacío...</p>
            <p className="generate__body-placeholder">
              Si quieres llenarlo solo tienes que pulsar el botón de aleatorio
              para obtener un dato de gatos.
            </p>
            <p className="generate__body-placeholder">
              Si lo prefieres, ¡puedes crear una imagen aleatoria de un gato con
              el texto que tú quieras!
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default GenerateTab;
