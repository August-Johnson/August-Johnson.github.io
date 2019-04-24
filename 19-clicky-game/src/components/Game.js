import React, { Component } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Container from "./Container";
import Row from "./Row";
import Card from "./Card";
import gameCards from "../cards.json";

class Game extends Component {
    // Setting the state of the message and its color, the original array of cards being imported from cards.json, and the score and highscore.
    // Also setting the state for the random order of which the cards will render.
    state = {
        gameCards: gameCards,
        tempCardArrangement: [],
        message: "Click an image to begin!",
        messageColor: "#FFFFFF",
        score: 0,
        highscore: 0
    }

    // Shuffle the order of the counts on initial load.
    componentDidMount() {
        this.shuffleCards();
    }

    // Method that shuffles the order in which the cards will render.
    shuffleCards = () => {

        // setting a variable of cardArr equal to the original source of cards in the state.
        let cardArr = this.state.gameCards;

        // Take the current index starting at then end of the array.
        // Declare 2 variables, one that temporarily holds the value of the current index.
        // And one that represents a random card index that isn't the one being stored.
        let currentIndex = cardArr.length; // (Left the current index number greater than the index position can go by 1 so I don't have to add it to Math.random later)
        let tempCardValue;
        let randomCard;

        // As long as the current index number is greater than 0.
        while (currentIndex > 0) {

            // Randomly pick an index number from the card array.
            randomCard = Math.floor(Math.random() * currentIndex);

            // Decrement the current index number by 1.
            currentIndex -= 1;

            // Store current card in the temp variable.
            tempCardValue = cardArr[currentIndex];
            cardArr[currentIndex] = cardArr[randomCard];
            cardArr[randomCard] = tempCardValue;
        }
        this.setState({ tempCardArrangement: cardArr });
    }

    // gameOver function
    // score reset and message
    handleLoseCondition = () => {
        this.setState({
            score: 0,
            message: "You Guessed Incorrectly!",
            messageColor: "#FF0000"
        });
    }

    // good guess function
    // score increment
    handleWinCondition = () => {
        this.setState({
            score: (this.state.score + 1),
            message: "You Guessed Correctly!",
            messageColor: "#32CD32"
        });
    }

    render() {
        
        return (
            <div>
                <Navbar message={this.state.message} messageColor={this.state.messageColor} score={this.state.score} highscore={this.state.highscore} />
                <Header />
                <Container>
                    <Row>
                        {this.state.tempCardArrangement.map((card) =>
                            <Card key={card.id} cardImage={card.image} cardArr={this.state.gameCards}
                                shuffleCards={this.shuffleCards} handleLoseCondition={this.handleLoseCondition}
                                handleWinCondition={this.handleWinCondition} />)}
                    </Row>
                    {/* {this.state.gameCards.map(card => <Card key={card.id} id={card.id} cardImage={card.image} shuffleCards={this.shuffleCards(gameCards)} />)} */}
                </Container>
            </div >
        )
    }
}

export default Game;