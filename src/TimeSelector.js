import { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


class TimeSelector extends Component {
    constructor(props) {
        super(props)

        this.toKebabCase = this.toKebabCase.bind(this);
        this.onClickArrow = this.onClickArrow.bind(this);
    }

    toKebabCase(str) {
        return str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join('-');
    }

    onClickArrow(direction) {
        let value = this.props.value;
        if (direction === "down" && value > 1) {
            value--;
            this.props.onChange(this.props.name, value);
        } else if (direction === "up" && value < 60) {
            value++;
            this.props.onChange(this.props.name, value);
        }
    }

    render() {
        const id = {
            label: this.toKebabCase(this.props.name + " label"),
            increment: this.toKebabCase(this.props.name + " increment"),
            decrement: this.toKebabCase(this.props.name + " decrement"),
            length: this.toKebabCase(this.props.name + " length"),
        };

        const title = this.props.name + " Length";

        return (
            <div className="time-selector-container">
                <div id={id.label} className="time-selector-title">{title}</div>
                <div className="time-selector-area">
                    <FontAwesomeIcon
                        id={id.decrement}
                        className="time-selector-arrow"
                        icon={faArrowDown}
                        onClick={this.onClickArrow.bind(this, "down")}
                    />
                    <div id={id.length} class="time-selector-value">{this.props.value}</div>
                    <FontAwesomeIcon
                        id={id.increment}
                        className="time-selector-arrow"
                        icon={faArrowUp}
                        onClick={this.onClickArrow.bind(this, "up")}
                    />
                </div>
            </div>
        );
    }
}

export default TimeSelector;
