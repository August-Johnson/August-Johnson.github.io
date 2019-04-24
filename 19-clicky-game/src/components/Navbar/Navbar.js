import React from 'react';
import "./Navbar.css";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark text-white fixed-top">
            <div className="col-1"></div>
            <div className="col-3">
                <h1>Clicky Game</h1>
            </div>
            <div className="col-4">
                {/* Message and its color to display depending on the user's guess, coming in as props*/}
                <h2 style={{ color: props.messageColor }}>{props.message}</h2>
            </div>
            <div className="col-4">
                {/* Score and highscore values to display, brought in as props */}
                <h3 className="score-display" >Score:{props.score} | Highscore: <span className={(props.highscore > 0 ? "highscore-display" : "")}>{props.highscore}</span></h3>
            </div>
        </nav>
    );
}

export default Navbar;