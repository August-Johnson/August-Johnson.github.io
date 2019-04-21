import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";

class App extends Component {



    render() {
        return (
            <Wrapper>
                <Navbar />
                <Header>Clicky Game!</Header>
            </Wrapper>
        );
    }
}

export default App;
