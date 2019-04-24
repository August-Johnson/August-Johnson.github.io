import React, { Component } from 'react';

class Card extends Component {
    // Set the clicked state of the card to false initially
    state = {
        clicked: false
    }

    // Method that handles the click event for a card
    handleClick = () => {
        // If the card has already been clicked, run the method that handles when the user loses and reset every card's click state back to false.
        if (this.state.clicked) {
            this.props.handleLoseCondition();
            this.resetCardState(this.props.cardArr);
        }
        else {
            // If the card hasn't been clicked already, run the method that handles when the user guesses correctly and set the card's clicked state to true.
            this.props.handleWinCondition();
            this.setState({ clicked: true });
        }
        // Run the method that will shuffle the display order of the cards.
        this.props.shuffleCards();
    }

    // Method for resetting the the clicked state of every card back to false.
    resetCardState = (cardArray) => {
        cardArray.forEach(() => this.setState({ clicked: false }));
    }

    render() {
        return (
            <div className="col-3">
                <div className="card" style={{ backgroundImage: `url('${this.props.cardImage}')` }} onClick={this.handleClick}></div >
            </div>
        );
    }
}

export default Card;
