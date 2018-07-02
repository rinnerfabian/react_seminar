import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import logo from './images/logo.svg';

// Functional Component für Spielfeld
function Square(props) {
    return (
        // je nach übergebener Nummer (props.nummer) wird die Farbe des einzelnen Feldes geändert
      <label className={props.color[props.nummer]} />
    );
}

// Functional Component für die Buttons am oberen Rand des Spielfelds
function Button(props) {
    return (
        // erhalten durch props eine onClick-Methode (später beschrieben)
      <button className="btn" onClick={props.handleClick} />
    );
}

// Class Component Main: als erstes gestartet
class Main extends React.Component {
    constructor(props){
        super(props);
        // squares: squares-Array aus 42 Felder (7x6) für das Spielfeld
        // xIsNext: Boolean -> true/false je nachdem welcher Spieler an der Reihe ist
        // color: String-Array, wieder mit einer Länge von 42, gibt Farbe der Felder/squares an
        this.state = {
            squares: Array(42).fill(null),
            redIsNext: true,
            color: Array(42).fill("squares_white"),
        };
    }
    // handleClick-Methode mit Parameter i: steht für Nummer des jeweiligen Buttons (0-6)
    handleClick(i) {
        const squares = this.state.squares;
        // ist das gewählte square frei -> weiter
        // ansonsten: Parameter i um 7 erhöhen (eine Reihe nach oben) und dasselbe nochmal
        if (squares[i]) {
            if (i+7 <= 41) {
                this.handleClick(i+7);
                return;
            } else {
                return;
            }
        }
        // das gewählte square wird auf true gesetzt
        squares[i] = true;
        var color = this.state.color;
        // color-Array wird je nachdem wer an der Reihe ist auf rot oder gelb gesetzt und färbt somit das Feld in die gewünschte Farbe
        color[i] = this.state.redIsNext ? "squares_red" : "squares_yellow";
        // state wird mit den veränderten Arrays squares und color ausgetauscht
        // Spieler wird gewechselt durch den Boolean redIsNext
        this.setState({
            squares : squares,
            redIsNext: !this.state.redIsNext,
            color: color,
        });
    }
    // die Methode clickReturn() setzt alle Variablen des state auf den Ausgangswert zurück und das Spiel kann neugestartet werden
    clickReturn(){
        this.setState({
            squares: Array(42).fill(null),
            redIsNext: true,
            color: Array(42).fill("squares_white"),
        });
    }
    // Andwendung besteht aus header, board und info
    // in der game-board wird die Komponente mit den benötigten Parametern aufgerufen
    render() {
        // je nachdem wer an der Reihe ist, wird player für die Ausgabe verändert
        let player = this.state.redIsNext ? "rot" : "gelb";
        return (
            <div className="game">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Vier gewinnt mit React</h1>
                </header>
                <div className="game-board">
                    <Board 
                        squares={this.state.squares}
                        handleClick={i => this.handleClick(i)}
                        color={this.state.color}
                    />
                </div>
                <div className="info">
                    <div className="board-bottom"> 
                        <h1> Spieler {player} an der Reihe!</h1>
                    </div>
                    <div className="board-bottom">
                        <button className="btn-restart" value="Neustarten" onClick={this.clickReturn.bind(this)} />
                    </div>
                </div>     
            </div>
        );
    }
}

// Class Component Board: erstellt das Board, samt squares und buttons
class Board extends React.Component {
    // renderSquare erstellt eine Square-Komponente
    // Color und Nummer werden dem Feld übergeben
    renderSquare(i) {
      return (
        <Square
            color={this.props.color}
            nummer={i}
        />
      );
    }
    // renderButton erstellt eine Button-Komponente mit einer bestimmten übergebenen Nummer
    // die vorher implementierte onClick-Methode wird jedem Button übergeben
    renderButton(i) {
        return (
          <Button
            handleClick={() => this.props.handleClick(i)}
          />
        );
      }
    // die render-Methode erstellt 7 Buttons und 42 Squares
    // Squares sind von unten nach oben nummeriert
    render() {
      return (
        <div>
            <div className="board-button">
                {this.renderButton(0)}
                {this.renderButton(1)}
                {this.renderButton(2)}
                {this.renderButton(3)}
                {this.renderButton(4)}
                {this.renderButton(5)}
                {this.renderButton(6)}
            </div>
            <div className="board-row">
                {this.renderSquare(35)}
                {this.renderSquare(36)}
                {this.renderSquare(37)}
                {this.renderSquare(38)}
                {this.renderSquare(39)}
                {this.renderSquare(40)}
                {this.renderSquare(41)}
            </div>
            <div className="board-row">
                {this.renderSquare(28)}
                {this.renderSquare(29)}
                {this.renderSquare(30)}
                {this.renderSquare(31)}
                {this.renderSquare(32)}
                {this.renderSquare(33)}
                {this.renderSquare(34)}
            </div>
            <div className="board-row">
                {this.renderSquare(21)}
                {this.renderSquare(22)}
                {this.renderSquare(23)}
                {this.renderSquare(24)}
                {this.renderSquare(25)}
                {this.renderSquare(26)}
                {this.renderSquare(27)}
            </div>
            <div className="board-row">
                {this.renderSquare(14)}
                {this.renderSquare(15)}
                {this.renderSquare(16)}
                {this.renderSquare(17)}
                {this.renderSquare(18)}
                {this.renderSquare(19)}
                {this.renderSquare(20)}
            </div>
            <div className="board-row">
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                {this.renderSquare(9)}
                {this.renderSquare(10)}
                {this.renderSquare(11)}
                {this.renderSquare(12)}
                {this.renderSquare(13)}
            </div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                {this.renderSquare(6)}
            </div> 
        </div>
      );
    }
  }

// Main-Komponente als erstes gerendert
ReactDOM.render(<Main />, document.getElementById('root'));
