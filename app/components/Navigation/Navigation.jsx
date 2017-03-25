
import React from 'react';
import {Link} from 'react-router';

export default class Navigation extends React.Component {
    render() {
        return (
            <div>
                <Link to="/" activeClassName="active">Get Weather</Link>
                <Link to="/about"  activeClassName="active">About</Link>
            </div>
        );
    }
}
