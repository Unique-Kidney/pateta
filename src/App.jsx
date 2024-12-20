import { animated, useSpring } from '@react-spring/web';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import CaoTriste from './CaoTriste'; // Importando a página de cães tristes

function App() {
  const [isAsked, setIsAsked] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: '50%', left: '50%' });
  const [isHovered, setIsHovered] = useState(false); // Estado para controlar o hover
  const navigate = useNavigate(); // Hook para navegação

  // Animação para o texto do pedido
  const textAnimation = useSpring({
    opacity: isAsked ? 1 : 0,
    transform: isAsked ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 120, friction: 14 },
  });

  // Animação para o botão inicial
  const buttonAnimation = useSpring({
    opacity: !isAsked ? 1 : 0,
    transform: !isAsked ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 120, friction: 14 },
  });

  // Função para mostrar a pergunta
  const handleClick = () => {
    setIsAsked(true);
  };

  // Função para mover o botão "Não" para longe da posição anterior
  const handleMouseEnter = () => {
    if (!isHovered) {
      setIsHovered(true); // Marca que o mouse entrou no botão
    }

    const currentTop = parseFloat(buttonPosition.top);
    const currentLeft = parseFloat(buttonPosition.left);

    const randomTop = Math.floor(Math.random() * 40) + 30;
    const randomLeft = Math.floor(Math.random() * 40) + 30;

    const newTop = currentTop + (currentTop < randomTop ? randomTop : -randomTop);
    const newLeft = currentLeft + (currentLeft < randomLeft ? randomLeft : -randomLeft);

    setButtonPosition({
      top: `${Math.min(Math.max(newTop, 10), 90)}%`,
      left: `${Math.min(Math.max(newLeft, 10), 90)}%`,
    });
  };

  // Função chamada quando o botão "Sim!" é clicado
  const handleYesClick = () => {
    window.location.href = "https://www.google.com/maps/dir/Rua+Tiradentes,+3022+-+Porto,+Pelotas+-+RS/Centro+De+Aten%C3%A7%C3%A3o+Psicossocial+(CAPS)+-+Av.+Duque+de+Caxias,+342+-+COHAB+Guabiroba,+Pelotas+-+RS,+96050-500/@-31.7652795,-52.3600658,16z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x9511b590d701b525:0xf3cc55462ca17612!2m2!1d-52.3458874!2d-31.7702048!1m5!1m1!1s0x9511cb4f25435ad5:0x6f959033b675e437!2m2!1d-52.3640557!2d-31.7592985!3e0?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D";
  };

  // Função chamada quando o botão "Não!" é clicado
  const handleNoClick = () => {
    console.log("Você disse não!");
    navigate('/cao-triste'); // Redireciona para a página de cães tristes
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Hellen</h1>
        <h1 className="title">Meu Amorzinho</h1>

        {!isAsked ? (
          <animated.div style={buttonAnimation}>
            <p>Você está pronto para um dos momentos mais especiais da sua vida?</p>
            <button onClick={handleClick} className="ask-button">Fazer o Pedido</button>
          </animated.div>
        ) : (
          <animated.div style={textAnimation} className="ask-container">
            <h2 className="proposal-text">Quer casar comigo?</h2>
            <div className="response-container">
              <button className="yes-button" onClick={handleYesClick}>Sim!</button>
              <animated.button
                className="no-button"
                onMouseEnter={handleMouseEnter}
                onClick={handleNoClick}
                style={{
                  position: isHovered ? 'absolute' : 'static', // Torna absoluto após o hover
                  top: buttonPosition.top,
                  left: buttonPosition.left,
                  transition: 'all 0.3s ease', // Suaviza a transição da posição
                }}
              >
                Não!
              </animated.button>
            </div>
          </animated.div>
        )}
      </header>
      <footer>
        Criado com amor 💕 por <a href="#">Augusto</a>
      </footer>
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cao-triste" element={<CaoTriste />} /> {/* Corrigido: caminho sem .jsx */}
      </Routes>
    </Router>
  );
}

export default AppWithRouter;