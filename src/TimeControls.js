import { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRotateRight } from '@fortawesome/free-solid-svg-icons';


class TimeControls extends Component {
    constructor(props) {
        super(props)

        this.onClickControl = this.onClickControl.bind(this);
    }

    onClickControl(type) {
        this.props.onClickControl(type);
    }

    render() {
        return (
            <div className="time-controls-container">
                <div id="start_stop" onClick={this.onClickControl.bind(this, "start_stop")}>
                    <FontAwesomeIcon
                        className={this.props.isPaused ? "time-controls-icon active" : "time-controls-icon"}
                        icon={faPlay}
                    />
                    <FontAwesomeIcon
                        className={this.props.isPaused ? "time-controls-icon" : "time-controls-icon active"}
                        icon={faPause}
                    />
                </div>
                <FontAwesomeIcon
                    id="reset"
                    className="time-controls-icon active"
                    icon={faRotateRight}
                    onClick={this.onClickControl.bind(this, "reset")}
                />
            </div>
        );
    }
}

export default TimeControls;
