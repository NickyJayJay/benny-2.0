import React, { useState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import data from './mock-data.json';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';

const App = () => {
	const [tasks, setTasks] = useState(data);
	const [addFormData, setAddFormData] = useState({
		status: '',
		priority: '',
		taskDescription: '',
	});

	const [editFormData, setEditFormData] = useState({
		status: '',
		priority: '',
		taskDescription: '',
	});

	const [editTaskId, setEditTaskId] = useState(null);

	const handleAddFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;

		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;

		setAddFormData(newFormData);
	};

	const handleEditFormChange = (event, taskId) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;

		fieldValue === 'Remove' && handleDeleteClick(taskId);

		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;

		setEditFormData(newFormData);

		console.log(taskId);
	};

	const handleAddFormSubmit = (event) => {
		event.preventDefault();

		const newTask = {
			id: nanoid(),
			key: nanoid(),
			status: addFormData.status,
			priority: addFormData.priority,
			taskDescription: addFormData.taskDescription,
		};

		const newTasks = [...tasks, newTask];
		setTasks(newTasks);
	};

	const handleEditFormSubmit = (event) => {
		event.preventDefault();

		const editedTask = {
			id: editTaskId,
			status: editFormData.status,
			priority: editFormData.priority,
			taskDescription: editFormData.taskDescription,
		};

		const newTasks = [...tasks];

		const index = tasks.findIndex((task) => task.id === editTaskId);

		newTasks[index] = editedTask;

		setTasks(newTasks);

		event.type === 'submit' && setEditTaskId(null);
	};

	const handleEditClick = (event, task) => {
		event.preventDefault();
		setEditTaskId(task.id);

		const formValues = {
			status: task.status,
			priority: task.priority,
			taskDescription: task.taskDescription,
		};

		setEditFormData(formValues);
	};

	const handleCancelClick = () => {
		setEditTaskId(null);
	};

	const handleDeleteClick = (taskId) => {
		const newTasks = [...tasks];

		const index = tasks.findIndex((task) => task.id === taskId);

		newTasks.splice(index, 1);

		setTasks(newTasks);
	};

	return (
		<div className='app-container'>
			<form onSubmit={handleEditFormSubmit}>
				<table>
					<thead>
						<tr>
							<th>Status</th>
							<th>ABC</th>
							<th>Prioritized Task List</th>
							<th>
								<button type='submit'>Save</button>
								<button type='button' onClick={handleCancelClick}>
									Cancel
								</button>
							</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task) => (
							<Fragment key={task.id}>
								{editTaskId === task.id ? (
									<EditableRow
										editFormData={editFormData}
										handleEditFormChange={handleEditFormChange}
										handleCancelClick={handleCancelClick}
										handleEditFormSubmit={handleEditFormSubmit}
										handleDeleteClick={handleDeleteClick}
										task={task}
									/>
								) : (
									<ReadOnlyRow
										task={task}
										handleEditClick={handleEditClick}
										handleDeleteClick={handleDeleteClick}
									/>
								)}
							</Fragment>
						))}
					</tbody>
				</table>
			</form>

			<h2>Add a Task</h2>
			<form onSubmit={handleAddFormSubmit}>
				<input
					type='text'
					name='status'
					required='required'
					placeholder='Enter a task...'
					onChange={handleAddFormChange}
				/>
				<input
					type='text'
					name='priority'
					required='required'
					placeholder='Enter a priority'
					onChange={handleAddFormChange}
				/>
				<input
					type='text'
					name='taskDescription'
					required='required'
					placeholder='Enter a task description...'
					onChange={handleAddFormChange}
				/>
				<button type='submit'>Add</button>
			</form>
		</div>
	);
};

export default App;
