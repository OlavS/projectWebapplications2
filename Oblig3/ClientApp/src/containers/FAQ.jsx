import React, { Component } from 'react';
import Panels from '../components/Panels';
import CreateQuestion from './CreateQuestion';
import { PutRating } from '../api';

/**
 * This component is the top component in the FAQ feature hierarchi. Its responsible for the rate
 * questions feature and renders the FAQ panels and CreateQuestion feature.
 * PutRating in api.jsx is called to update the questions rating in the database.
 */
export default class FAQ extends Component {
    constructor() {
        super();
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
    }

    upVote = async (catIndex, queIndex, queId) => {
        let question = await PutRating(queId, 1);
        if (question != null) {
            this.props.updateQuestion(catIndex, queIndex, question);
        }
    }

    downVote = async (catIndex, queIndex, queId) => {
        let question = await PutRating(queId, -1);
        if (question != null) {
            this.props.updateQuestion(catIndex, queIndex, question);
        }
    }

    render() {
        let contents = this.props.loading
            ? <p><em>Loading...</em></p>
            : (
            <React.Fragment>
                <Panels
                    admin={false}
                    searchString={this.props.searchString}
                    categories={this.props.categories}
                    upVote={this.upVote}
                    downVote={this.downVote}
                />
                <CreateQuestion
                    categories={this.props.categories}
                    addQuestionToCategories={(catIndex, question) => this.props.addQuestionToCategories(catIndex, question)}
                />
            </React.Fragment>
            )

        return (
            <div>
                <h2>Ofte stilte spørsmål</h2>
                {contents}
            </div>
        );
    }
}