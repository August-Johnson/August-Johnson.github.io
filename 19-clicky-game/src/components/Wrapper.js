import React from 'react';

function Wrapper(props) {
    return <div className="main-content-wrapper">{props.children}</div>
}

export default Wrapper;