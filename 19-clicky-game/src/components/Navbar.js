import React from 'react';
// import Score from "./Score";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary text-white fixed-top">
            <div className="col-3">
                <h1>Hello</h1>
            </div>
            <div className="col-6">
                <h2>Click an image to begin!</h2>
            </div>
            <div className="col-3">
                {/* <Score /> */}
            </div>
        </nav>
    );
}

export default Navbar;