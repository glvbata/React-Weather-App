import React from 'react';

export default class About extends React.Component {
    render() {
        return (
            <div className="col-sm-12">
                <h2>About Component</h2>
                <div>
                    This weather app is created with ReactJS and other middlewares that compliments react.
                    <br></br>
                    Also, another purpose of this page is to study and practice page states after routing.
                </div>
            </div>
        );
    }
}
