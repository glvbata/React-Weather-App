import React from 'react';
import Navigation from 'Navigation';

export default class Main extends React.Component {
    render() {
        return(
            <div>
                <Navigation/>
                <h2>Main Component</h2>
                {this.props.children}
            </div>
        );
    }
}
