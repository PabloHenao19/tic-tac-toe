import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

// Estado inicial del juego
let data = ["", "", "", "", "", "", "", "", ""];

// Componente principal del juego
const TicTacToe = () => {
    // Estados para contar los turnos y bloquear el juego
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);

    // Referencia al título del juego
    let titleRef = useRef(null);

    // Referencias a las cajas del tablero
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    // Array de referencias a las cajas para facilitar el manejo
    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    // Función para manejar el clic en una caja
    const toggle = (e, num) => {
        // Verificar si el juego está bloqueado o si la caja ya está marcada
        if (lock || data[num] !== "") {
            return;
        }

        // Marcar la caja según el turno
        if (count % 2 === 0) {
            box_array[num].current.innerHTML = `<img src='${cross_icon}'>`;
            data[num] = "x";
            setCount((prevCount) => prevCount + 1);
        } else {
            box_array[num].current.innerHTML = `<img src='${circle_icon}'>`;
            data[num] = "o";
            setCount((prevCount) => prevCount + 1);
        }

        // Verificar si hay un ganador después de cada movimiento
        checkWin();
    };

    // Función para verificar si hay un ganador
    const checkWin = () => {
        // Condiciones de victoria (filas, columnas, diagonales)
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6] // Diagonales
        ];

        // Iterar sobre las condiciones de victoria
        for (const condition of winConditions) {
            const [a, b, c] = condition;
            // Si las cajas tienen el mismo valor y no están vacías, hay un ganador
            if (data[a] !== "" && data[a] === data[b] && data[b] === data[c]) {
                won(data[a]);
                setLock(true); // Bloquear el juego después de que alguien gane
                return;
            }
        }

        // Verificar empate
        if (!data.includes("") && !lock) {
            titleRef.current.innerText = "¡Empate!";
            setLock(true);
        }
    };

    // Función para manejar el caso en que hay un ganador
    const won = (winner) => {
        if (winner === "x") {
            titleRef.current.innerText = "Felicidades: ";
            titleRef.current.appendChild(document.createElement("img")).src = cross_icon;
        } else {
            titleRef.current.innerText = "Felicidades: ";
            titleRef.current.appendChild(document.createElement("img")).src = circle_icon;
        }
    };

    // Función para reiniciar el juego
    const reset = () => {
        setLock(false); // Desbloquear el juego al reiniciar
        data = ["", "", "", "", "", "", "", "", ""];
        titleRef.current.innerText = "Tic Tac Toe In React";
        // Reiniciar el contenido de todas las cajas
        for (let i = 0; i < box_array.length; i++) {
            box_array[i].current.innerHTML = "";
        }
        setCount(0); // Reiniciar el contador de turnos
    };

    // JSX que representa la interfaz del juego
    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}> Tic Tac Toe Game In <span>React</span></h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" ref={box1} onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" ref={box2} onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" ref={box3} onClick={(e) => toggle(e, 2)}></div>
                </div>

                <div className="row2">
                    <div className="boxes" ref={box4} onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" ref={box5} onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" ref={box6} onClick={(e) => toggle(e, 5)}></div>
                </div>

                <div className="row3">
                    <div className="boxes" ref={box7} onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" ref={box8} onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" ref={box9} onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className="reset" onClick={() => reset()}>Reset</button>
        </div>
    );
};

// Exportar el componente para su uso en la aplicación
export default TicTacToe;
