import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    render() {
        console.log("Dashboard->render");
        console.log(this.props);
        return (
            <div>
                <h3>Questions</h3>
                <ul>
                    {this.props.questionIds.map((id) => (
                        <li key={id}>
                            <div>Question Id: {id} </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ questions }) {
    console.log("Dashboard->mapStateToProps");
    console.log(questions)
    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);