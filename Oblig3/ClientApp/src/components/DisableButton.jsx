import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

/**
 * A button that is initiated as enabled, but by onclick will turn disabled as long as it lives.
 */
export default class DisableButton extends Component {
    constructor(props) {
        super(props);
        this.state = { isEnable: false }
        this.handleButtonDisable = this.handleButtonDisable.bind(this);
    }

    handleButtonDisable() {
        this.setState({ isEnable: true });
        this.props.onClick();
    }

    render() {
        return (
            <Button bsStyle={this.props.bsStyle} bsSize={this.props.bsSize} disabled={this.state.isEnable} onClick={this.handleButtonDisable}>
                {this.props.content}
            </Button>
        );
    }
}