import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

/**
 * Search field that grants the possibility to search on questions on the site.
 */
export default class SearchField extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.setSearch(e.target.value);
    }

    render() {
        return (
            <FormControl
                type="text"
                value={this.props.searchString}
                onChange={this.handleChange}
                placeholder="Søk her..."
            />
        );
    }
}