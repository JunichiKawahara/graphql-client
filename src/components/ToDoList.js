import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const TODOS_QUERY = gql`
	query ToDosQuery {
		todos {
			id,
			title
		}
	}
`;

class ToDoList extends Component {
	render() {
		if (this.props.data && this.props.data.loading) {
			return <div>Loading...</div>
		}

		const todoList = this.props.data.todos;

		return (
			<div>{this.state.todoList.map(
				todo => <p key={todo.id}>{todo.title}</p>
			)}</div>
		)
	}
}

export default graphql(TODOS_QUERY)(ToDoList);

