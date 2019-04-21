import React from 'react';

function Header(props) {
    return (
        <div className="clicky-game-header">
            <h2>{props.children}</h2>
            <p>Click on an image to earn points, but don't click on any more than once!</p>
        </div>
    );
}

export default Header;