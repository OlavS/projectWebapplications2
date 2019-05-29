import React, { Component } from 'react';
import { Panel, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { GetValidationState, ValidQuestion, ValidCategory } from '../utils/Validation';
import { GetIndexWithId } from '../utils/Arrays';
import { PostQuestion } from '../api';

/**
 * This component gives the customer the possibility to ask questions.
 * It renders a panel with a dropdown menu for choosing a category, and a text input field for the
 * question, and a submit button.
 * PostQuestion in api.jsx is called to create a new Question entity in the database.
 */
export default class CreateQuestion extends Component {
    constructor() {
        super();
        this.state = { validationMessage: "", questionValue: "", categoryId: "0", validated: false }
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.submit = this.submit.bind(this);
        this.validateFields = this.validateFields.bind(this);
    }

    handleQuestionChange(e) {
        this.setState({ questionValue: e.target.value });
    }

    handleCategoryChange(e) {
        this.setState({ categoryId: e.target.value });
    }

    validateFields() {
        this.state.questionValue = this.state.questionValue.trim();
        const validText = ValidQuestion(this.state.questionValue);
        const validCategory = ValidCategory(this.state.categoryId);

        if (!validText && !validCategory) {
            this.setState({
                validationMessage: "Spørsmålet må inneholde mellom 11 og 400 tegn kan bare inneholde " +
                                    "tall, bokstaver, samt tegnene ;\" '.,?!/- og må ha en kategori."
            });
        } else if (!validText) {
            this.setState({
                validationMessage: "Spørsmålet må inneholde mellom 11 og 400 tegn kan bare inneholde " +
                                    "tall, bokstaver, samt tegnene ;\" '.,?!/-"
            });
        } else if (!validCategory) {
            this.setState({
                validationMessage: "Vennligst oppgi en kategori."
            });
        } else {
            this.state.validated = true;
        }
    }

    async submit() {
        this.validateFields();

        if (this.state.validated) {
            const catId = this.state.categoryId;

            let question = await PostQuestion(this.state.categoryId, this.state.questionValue);

            if (question != null) {
                this.setState({
                    validated: false,
                    questionValue: "",
                    validationMessage: "Spørsmålet har blitt registrert og vil bli besvart i løpet av kort tid"
                })
                this.props.addQuestionToCategories(GetIndexWithId(this.props.categories, catId), question);

            } else {
                this.setState({
                    validated: false,
                    validationMessage: "Noe gikk galt under opprettelsen av spørsmålet. " +
                                        "Kontakt kundeservice om problemet vedvarer"
                })
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Panel id="CreateQuestionPanel" bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title toggle>
                            Fant du ikke det du lette etter?
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <FormGroup controlId="CreateQuestionFormCategory">
                                <ControlLabel>Velg kategori</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    onChange={this.handleCategoryChange}
                                >
                                    <option key={0} value={0}></option>
                                    {this.props.categories.map(c =>
                                        <React.Fragment key={c.id}>
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        </React.Fragment>
                                    )}
                                </FormControl>
                            </FormGroup>

                            <FormGroup controlId="CreateQuestionFormText"
                                validationState={GetValidationState(this.state.questionValue, 400)}
                            >
                                <ControlLabel>Spørsmål:</ControlLabel>
                                <FormControl
                                    componentClass="textarea"
                                    value={this.state.questionValue}
                                    onChange={this.handleQuestionChange}
                                    placeholder="Skriv her..."
                                />
                                <FormControl.Feedback />
                                {this.state.validationMessage}
                            </FormGroup>
                            <Button className="pull-right" bsStyle="primary" bsSize="small" onClick={this.submit}>Send inn</Button>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </React.Fragment>
        );
    }
}