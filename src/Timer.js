import { Component } from 'react';
import './App.css';


class Timer extends Component {
    render() {
        return (
            <div className="timer-container">
                <div id="timer-label" className={this.props.isBreak ? "timer-title-break" : "timer-title-session"}>
                    {this.props.title}
                </div>
                <div id="time-left" className={this.props.isBreak ? "timer-value-break" : "timer-value-session"}>
                    {this.props.value}
                </div>
            </div>
        );
    }
}

export default Timer;
