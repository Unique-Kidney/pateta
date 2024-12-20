// src/CaoTriste.jsx
import React from 'react';
import './CaoTriste.css';
import imgCaoTriste from './img/cao_triste.gif'; // Importa a imagem

const CaoTriste = () => {
  return (
    <div className="cao-triste-container">
      <div className="cao-triste-content">
        <h1>Você me odeia?</h1>
        <p>Eu sou um cão triste agora...</p>
        <img src={imgCaoTriste} alt="Cão Triste" />
      </div>
    </div>
  );
};

export default CaoTriste;
