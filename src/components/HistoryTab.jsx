import React from "react";
import "./tabs.css";
import "../App.css";

const CAT_URL_PROPERTIES = "?fontSize=40&fontColor=orange";

const HistoryTab = ({ history }) => {
  return (
    <section className="history__container">
      {history.length > 0 ? (
        <>
          {history.map(({ sentence, img, word }) => {
            const imgUrl = `https://cataas.com/cat/${img}/says/${word}${CAT_URL_PROPERTIES}`;
            return (
              <a
                href={imgUrl}
                target="_blank"
                key={img + " " + word}
                className="history__item"
              >
                <img
                  loading="lazy"
                  className="history__item-img"
                  src={imgUrl}
                  alt={`Imagen extraída usando la primera frase de ${sentence}`}
                />
                <p className="history__item-text">{word}</p>
              </a>
            );
          })}
        </>
      ) : (
        <div className="history__placeholder-container">
          <p className="generate__body-placeholder">Esto está muy vacío...</p>
          <p className="generate__body-placeholder">
            Si quieres llenarlo solo tienes que cambiar a la pestaña "Generar" y
            pulsar el botón de aleatorio para obtener un dato de gatos.
          </p>
          <p className="generate__body-placeholder">
            Si lo prefieres, ¡puedes crear una imagen aleatoria de un gato con
            el texto que tú quieras!
          </p>
        </div>
      )}
    </section>
  );
};

export default HistoryTab;
