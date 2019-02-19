import React, { Component } from 'react';
import { compose } from 'recompose';
import gql from 'graphql-tag';
import { graphql} from 'react-apollo';

const TODOS_QUERY = gql`
	query ToDosQuery {
		todos {
			id,
			title
		}
	}
`;

const ADD_MUTATION = gql`
	mutation AddMutation($input: ToDoInput) {
		addToDo(input: $input) {
			title
		}
	}
`;

class ToDoList extends Component {
	state = { title: '' }

	render() {
		if (this.props.data && this.props.data.loading) {
			return <div>Loading...</div>
		}

		const todoList = this.props.data.todos;

		return (
			<div>
				<input
					type="text"
					value={this.state.title}
					onChange={
						e => this.setState({title: e.target.value})
					}
				/>
				<button
					type="submit"
					onClick={() => this._addToDo()}
				>追加</button>
				{todoList.map(
					todo => <p key={todo.id}>{todo.title}</p>
				)}
			</div>
		)
	}

	_addToDo = () => {
		this.props.addMutation({
			variables: {
				input: {
					title: this.state.title
				}
			},
			refetchQueries: [{ query: TODOS_QUERY }],
		}).then(({data}) => console.log(data.addToDo));
		this.setState({ title: '' })
	}
}

export default compose(
	graphql(TODOS_QUERY),
	graphql(ADD_MUTATION, {name: 'addMutation'})
)(ToDoList);

