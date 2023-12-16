import { Component } from 'react';
import './App.css';
import TimeSelector from './TimeSelector';
import Timer from './Timer';
import TimeControls from './TimeControls';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

class App extends Component {
  constructor(props) {
    super(props)

    this.onChangeValue = this.onChangeValue.bind(this);
    this.onClickControl = this.onClickControl.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
    this.onClickStop = this.onClickStop.bind(this);
    this.getTimerValues = this.getTimerValues.bind(this);

    this.state = {
      isBreak: false,
      isPaused: true,
      deafultBreak: 5,
      defaultSession: 25,
      breakLength: 5,
      sessionLength: 25,
      timeElapsed: 0,
      timer: {
        title: "Session",
        value: "25:00",
      }
    }
  }

  componentDidMount() {
    this.getTimerValues();
  }

  intervalId = null;

  onClickControl(type) {
    if (type === "reset") {
      this.onClickReset();
    } else if (type === "start_stop" && this.state.isPaused) {
      this.onClickStart();
    } else if (type === "start_stop" && !this.state.isPaused) {
      this.onClickStop();
    }
  }

  onClickReset() {
    console.log("[ onClickReset ]")
    const defaults = {
      break: this.state.deafultBreak,
      session: this.state.defaultSession,
      time: 0,
      renderKey: this.state.renderKey,
    };

    clearInterval(this.intervalId);
    this.intervalId = null;

    this.setState({
      isBreak: false,
      isPaused: true,
      breakLength: defaults.break,
      sessionLength: defaults.session,
      timeElapsed: defaults.time,
    }, () => this.getTimerValues());
  }

  onClickStart() {
    console.log("[ onClickStart ]")
    if (!this.intervalId) {
      this.setState({
        isPaused: false,
      });

      this.intervalId = setInterval(() => {
        let seconds = this.state.timeElapsed;
        this.setState({
          timeElapsed: seconds + 1,
        }, () => this.getTimerValues());
      }, 1000);
    }
  }

  onClickStop() {
    console.log('[ onClickStop ]')
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.setState({
      isPaused: true
    }, () => this.getTimerValues());
  }

  onChangeValue(type, newValue) {
    if (type.toLowerCase() === "break" && this.state.isPaused) {
      this.setState({
        breakLength: newValue,
      }, () => this.getTimerValues());
    } else if (type.toLowerCase() === "session" && this.state.isPaused) {
      this.setState({
        sessionLength: newValue,
      }, () => this.getTimerValues());
    }
  }

  getTimerValues() {
    let timer = {
      title: this.state.isBreak ? "Break" : "Session",
      value: dayjs(this.state.isBreak ? this.state.breakLength.toString() : this.state.sessionLength.toString(), "mm")
        .subtract(dayjs(this.state.timeElapsed.toString(), "ss"))
        .format("mm:ss"),
    };

    if ((this.state.sessionLength === 60 || this.state.breakLength === 60) && this.state.timeElapsed === 0) {
      // Override dayjs 00-59 minute formatting for a 60-minute session/ break.
      timer.value = "60:00";
    }

    if (timer.value === "00:00" && !!this.intervalId) {
      // Switch between a break and a session.
      const isBreak = this.state.isBreak;
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.switchStates(timer, isBreak);
      return;
    }

    this.setState({
      timer
    });
  }

  asyncSetState = (newState) => new Promise(resolve => this.setState(newState, resolve));
  timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async switchStates(timer, isBreak) {
    await this.asyncSetState({
      timer
    });
    await this.timeout(1000);
    await this.asyncSetState({
      timeElapsed: 0,
      isBreak: !isBreak,
    });
    this.getTimerValues();
    this.onClickStart();
  }

  render() {
    if (this.state.timer.value === "00:00") {
      document.getElementById("beep").play();
    }
    return (
      <div className="app">
        <div className="app-title">Pomodoro Clock</div>
        <div className="selector-container">
          <TimeSelector
            name="Break"
            value={this.state.breakLength}
            onChange={this.onChangeValue.bind(this)}
          />
          <TimeSelector
            name="Session"
            value={this.state.sessionLength}
            onChange={this.onChangeValue.bind(this)}
          />
        </div>
        <Timer title={this.state.timer.title} value={this.state.timer.value} isBreak={this.state.isBreak} />
        <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
        <TimeControls onClickControl={this.onClickControl.bind(this)} isPaused={this.state.isPaused} />
        <div className="disclaimer">
          I believe I have made a fully functioning pomodoro clock with all the functionality requested by freeCodeCamp. However, it doesn't pass their test suite, much to my annoyance. If you find a flaw in the logic, please let me know.
        </div>
      </div>
    );
  }
}

export default App;
