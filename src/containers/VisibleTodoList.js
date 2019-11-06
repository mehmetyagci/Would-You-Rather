import { connect } from 'react-redux'
import TodoList from '../components/Dashboard'
import { VisibilityFilters } from '../actions/questions'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {    
    case VisibilityFilters.SHOW_UNANSWERED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

export default connect(mapStateToProps)(TodoList)