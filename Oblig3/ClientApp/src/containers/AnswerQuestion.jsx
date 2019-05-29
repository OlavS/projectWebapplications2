import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { GetValidationState, ValidAnswer } from '../utils/Validation';
import { PutQuestionsAnswer } from '../api';

/**
 * This component gives the administrator the possibilty to answer questions.
 * It renders a modal with a text input field and a submit button, for answering questions. 
 * PutQuestionAnswer in api.jsx is called to update the questions answer in the database.
 */
export default class AnswerQuestion extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.validateField = this.validateField.bind(this);
        this.state = { formTextValue: "", validationMessage: "", validated: false };
    }

    handleChange(e) {
        this.setState({ formTextValue: e.target.value });
    }

    handleHide() {
        this.setState({ formTextValue: "", validationMessage: "" });
        this.props.answerQuestionModalHide();
    }

    validateField() {
        this.state.formTextValue = this.state.formTextValue.trim();

        if (!ValidAnswer(this.state.formTextValue)) {
            this.setState({
                validationMessage: "Svaret må inneholde mellom 11 og 1000 tegn kan bare inneholde " +
                                    "tall, bokstaver, samt tegnene ;\" '.,?!/-"
            });
            this.state.validated = false;
        } else {
            this.setState({
                validationMessage: ""
            });
            this.state.validated = true;
        }
    }

    async submit() {
        this.validateField();

        if (this.state.validated) {

            let question = await PutQuestionsAnswer(this.props.question.id, this.state.formTextValue);

            if (question != null) {
                this.props.updateQuestion(this.props.catIndex, this.props.queIndex, question);
                this.setState({ formTextValue: "" });
                this.props.answerQuestionModalHide();
            } else {
                this.setState({ validationMessage: "Noe gikk galt under opprettelsen av svaret." });
            }
        }        
    }

    render() {
        if (this.props.question == null) {
            return "";
        }
        return (
            <Modal show={this.props.visible} aria-labelledby="EditQuestionModal" onHide={this.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title id="EditQuestionModal">
                        {this.props.question.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="answerCtrlTextarea"
                        validationState={GetValidationState(this.state.formTextValue, 1000)}
                    >
                        <ControlLabel>Svar:</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            value={this.state.formTextValue}
                            onChange={this.handleChange}
                            placeholder="Skriv svaret her..."
                        />
                        <FormControl.Feedback />
                        {this.state.validationMessage}
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.submit}>Lagre svar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}