import React from 'react';
import Navigation from 'Navigation';

export default class Main extends React.Component {
    render() {
        return(
            <div className="main-component">
                <Navigation/>
                <h2 className="col-md-12">Main Component</h2>
                {this.props.children}
            </div>
        );
    }
}
