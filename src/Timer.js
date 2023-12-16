import { Component } from 'react';
import './App.css';


class Timer extends Component {
    render() {
        return (
            <div className={this.props.title === "Break" ? "timer-container timer-continer-break" : "timer-container"}>
                <div id="timer-label" className="timer-title">
                    {this.props.title}
                </div>
                <div id="time-left" className="timer-value">
                    {this.props.value}
                </div>
            </div>
        );
    }
}

export default Timer;
