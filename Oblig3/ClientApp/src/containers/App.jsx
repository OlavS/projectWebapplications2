import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQ from './FAQ';
import Admin from './Admin';
import { GetCategories } from '../api';

/**
 * App holds the nested categories array in its state, and passes this to both the admin and faq features.
 * It also has methods to change the categories state. This makes it possible to update and insert
 * new questions to it. App renders both the admin and faq features, and is linked through a route call from the
 * header, it also renders the layout (ie. <Header /> and <Footer />).
 * GetCategories in api.jsx is called in componentDidMount to get all the categories and all the 
 * associated questions from the database when component mounts.
 */
export default class App extends Component {
    constructor() {
        super();
        this.state = { categories: [], loading: true, searchString: "" };
        this.updateQuestion = this.updateQuestion.bind(this);
        this.addQuestionToCategories = this.addQuestionToCategories.bind(this);
        this.setSearch = this.setSearch.bind(this);
    }

    async componentDidMount() {
        let categories = await GetCategories();
        this.setState({ categories: categories, loading: false });
    }

    addQuestionToCategories = (catIndex, question) => {
        this.setState(prevState => {
            const categories = [...prevState.categories];
            categories[catIndex].questions.push(question);
            return { categories: categories }
        });
    }

    updateQuestion = (catIndex, queIndex, question) => {
        this.setState(prevState => {
            const categories = [...prevState.categories];
            categories[catIndex].questions[queIndex] = question;
            return { categories: categories };
        })
    } 

    setSearch = (searchString) => {
        this.setState({
            searchString: searchString.toLowerCase()
        })
    }

    render() {
        const categories = this.state.categories;
        const loading = this.state.loading;
        return (
            <div>
                <Header searchString={this.state.searchString} setSearch={this.setSearch} />
                <div id="content">
                    <Switch>
                        <Route
                            exact path='/'
                            render={() =>
                                <FAQ
                                    searchString={this.state.searchString}
                                    categories={categories}
                                    loading={loading}
                                    addQuestionToCategories={this.addQuestionToCategories}
                                    updateQuestion={this.updateQuestion}
                                />}
                        />
                        <Route
                            path='/Admin'
                            render={() =>
                                <Admin
                                    searchString={this.state.searchString}
                                    categories={categories}
                                    loading={loading}
                                    updateQuestion={this.updateQuestion}
                                />}
                        />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}