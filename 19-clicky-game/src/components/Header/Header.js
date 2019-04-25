import React from 'react';
import "./Header.css";

function Header() {
    return (
        <div className="clicky-game-header">
            <h2>Clicky Game!</h2>
            <p>Click on an image to earn points, but don't click on any more than once!</p>
        </div>
    );
}

export default Header;