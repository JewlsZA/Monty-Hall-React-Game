import React from "react"
//local imports
import "../montyhall.css"
import { Button } from "react-bootstrap"

class MontyHall extends React.Component {
  state = {
    doors: [],
    switch: null,
    hint: null,
    selected: null,
    reveal: false,
    wins: 0,
    losses: 0,
  }
  // This reveal the winning door,
  // removes the hint, removes the switch option and updates win/lose count
  getResults() {
    this.setState((prevState) => {
      return {
        switch: null,
        hint: null,
        reveal: true,
        wins: prevState.doors[prevState.selected]
          ? prevState.wins + 1
          : prevState.wins,
        losses: !prevState.doors[prevState.selected]
          ? prevState.losses + 1
          : prevState.losses,
      }
    })
  }
  // This randomly sets 1 of the 3 doors boolean states to true at the start of the game
  setDoors() {
    let result = Math.floor(Math.random() * Math.floor(3) + 1)
    let doors = [false, false, false]
    doors[result - 1] = true

    this.setState({
      doors,
      selected: null,
      reveal: false,
      hint: null,
      switch: null,
    })
  }
  // This receives the index of the chosen door
  onChooseDoor(selected) {
    if (this.state.selected !== null) return

    let switchOption
    let hintOption
    let doors = this.state.doors
    // assignes hintOption to the other non-selected false door
    doors.forEach((door, index) => {
      if (!door && selected !== index) {
        hintOption = index
      }
    })
    // assigns the switchable door that is not the hint(false) door or selected door
    doors.forEach((door, index) => {
      if (selected !== index && hintOption !== index) {
        switchOption = index
      }
    })
    // set the states to the door index where to display the hint
    // set switch state to switchable door 
    this.setState({
      hint: hintOption,
      switch: switchOption,
      
    })
  }
  // This changes the state of the selected door to the switchable door
  switchDoor() {
    this.setState({
      selected: this.state.switch,
    })

    this.getResults()
  }
  // calls the setDoors function as soon as the page loads
  componentDidMount() {
    this.setDoors()
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Click on a door to open it!</h1>
        <div className="results">
          <div className="scorecard">
            <div>Wins: {this.state.wins}</div>
            <div>Losses: {this.state.losses}</div>
          </div>
          {/* after a door is selected the user is asked to switch */}
          {this.state.switch !== null && (
            <div className="buttons">
              <h3>Switch to door {this.state.switch + 1}?</h3>
              <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <Button onClick={() => this.switchDoor()}>Yes</Button>
              <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <Button onClick={() => this.getResults()}>No</Button>
            </div>
          )}
          {/* this renders after getResults() is called */}
          {this.state.reveal && (
            <div className="buttons">
              <h3>
                {this.state.doors[this.state.selected]
                  ? "You won!"
                  : "You lost!"}
              </h3>
              {/* restarts the game with random doors */}
              <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <Button onClick={() => this.setDoors()}>Play Again?</Button>
            </div>
          )}
        </div>
        <div className="doors">
          {/* Renders 3 doors with index 1, 2, 3 */}
          {this.state.doors.map((door, index) => {
            return (
              <div key={index}
                className={`door door--${index + 1} ${
                  this.state.selected === index &&
                  "door--selected animated infinite pulse"
                }`}
                // calls and passes the selected door index to the onChooseDoor fnc
                onClick={() => this.onChooseDoor(index)}
              >
                {/* reveals the door, if door == true Gold, false Goat */}
                {this.state.reveal && (
                  <div className="prize">
                    It's a...
                    <div className="icon">{door ? "Gold Pot! 🥇" : "Goat! 🐐"}</div>
                  </div>
                )}
                {/* when hint state is assigned to other false door index, display hint on that door */}
                {index === this.state.hint && (
                  <div className="hint">
                    Hint: This one's a<div className="icon">🐐</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default MontyHall
