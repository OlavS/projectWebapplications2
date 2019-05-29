import React, { Component } from 'react';
import Panels from '../components/Panels';
import AnswerQuestion from './AnswerQuestion';

/**
 * This component is the top component in the admin features hierarchi. Its responsible for showing
 * and hiding the answer question modal, and render the admin features.
 */
export default class Admin extends Component {
    constructor() {
        super();
        this.state = { catIndex: null, queIndex: null, chosenQuestion: null, answerModalVisible: false };
    }

    answerQuestionModalShow = (catIndex, queIndex, question) => {
        this.setState({ catIndex: catIndex, queIndex: queIndex, chosenQuestion: question, answerModalVisible: true });
    }

    answerQuestionModalHide = () => {
        this.setState({ answerModalVisible: false, chosenQuestion: null, queIndex: null, catIndex: null })
    }

    render() {
        let contents = this.props.loading
            ? <p><em>Loading...</em></p>
            : (<React.Fragment>
                <Panels
                    admin={true}
                    searchString={this.props.searchString}
                    categories={this.props.categories}
                    answerQuestionModalShow={this.answerQuestionModalShow}
                />
                <AnswerQuestion
                    catIndex={this.state.catIndex}
                    queIndex={this.state.queIndex}
                    question={this.state.chosenQuestion}
                    visible={this.state.answerModalVisible}
                    updateQuestion={(catIndex, queIndex, question) => this.props.updateQuestion(catIndex, queIndex, question)}
                    answerQuestionModalHide={this.answerQuestionModalHide}
                />
               </React.Fragment>);

        return (
            <div>
                <h2>Administrator</h2>
                {contents}
            </div>
        );
    }
}