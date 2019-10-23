import React, { Component } from 'react'
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';

class Question extends Component {
    render() {
        const { question } = this.props;
        console.log("vQuestion")
        console.log(question);

        if (question == null) {
            // TODO: this line go to 404 page
            return <p>This Question doesn't exist</p>
        }

        return (
            <div className="item">

                <div className="ui image">
                    <img src={question.author.avatarURL} alt={question.author.name} />
                </div>

                <div className="content">
                    <div className="header"> {question.author.name} asks:</div>
                    <div className="meta"><span> {question.optionOne.text} </span></div>
                </div>


                
                <br />
                auther.avatarUrl:{question.author.avatarURL}
                <br />
                <div>
                    optionOne.text:{question.optionOne.text}
                    <br />
                    optionOne.votes.length:{question.optionOne.votes.length}
                </div>
                vs.
                <div>
                    optionTwo.text:{question.optionTwo.text}
                    <br />
                    optionTwo.votes.length:{question.optionTwo.votes.length}
                </div>
                <br />
                answered:{question.answered.toString()}
                <hr />
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    console.log("components->Question->mapStateToProps");
    console.log(question);
    const answered = question.optionOne.votes.length + question.optionTwo.votes.length > 0 ? true : false;
    console.log(`optionOne.votes:${question.optionOne.votes.length} optionTwo.votes:${question.optionTwo.votes.length} answered:${answered} `);

    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser, answered)
            : null
    }
}

export default connect(mapStateToProps)(Question);