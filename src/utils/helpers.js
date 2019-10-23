export function formatDate(timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion(question, author, authorUser, answered) {

  const { id, optionOne, optionTwo, timestamp } = question
  console.log("utils->helper->formatQuestion", question);

  return {
    id,
    timestamp,
    author,
    optionOne,
    optionTwo,
    answered
  }
}