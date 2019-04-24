import React from 'react';

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark text-white fixed-top">
            <div className="col-4">
                <h1>Clicky Game</h1>
            </div>
            <div className="col-5">
                {/* Message and its color to display depending on the user's guess, coming in as props*/}
                <h2 style={{ color: props.messageColor }}>{props.message}</h2>
            </div>
            <div className="col-3">
                {/* Score and highscore values to display, brought in as props */}
                Score: {props.score} | Highscore: {props.highscore}
            </div>
        </nav>
    );
}

export default Navbar;