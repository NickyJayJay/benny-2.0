import React, { useState, useRef } from 'react';
import { nanoid } from 'nanoid';

import './App.css';
import data from './mock-data.json';
import EditableStatus from './components/Cells/EditableStatus';
import EditablePriority from './components/Cells/EditablePriority';
import EditableDescription from './components/Cells/EditableDescription';
import ReadOnlyStatus from './components/Cells/ReadOnlyStatus';
import ReadOnlyPriority from './components/Cells/ReadOnlyPriority';
import ReadOnlyDescription from './components/Cells/ReadOnlyDescription';
import checkBox from './assets/SVG/checkBox.svg';

const App = () => {
	const [tasks, setTasks] = useState(data);
	const [addFormData, setAddFormData] = useState({
		status: '',
		priority: '',
		description: '',
	});

	const [editFormData, setEditFormData] = useState({
		status: '',
		priority: '',
		description: '',
	});

	const [editTask, setEditTask] = useState({
		rowId: null,
		cellType: null,
	});

	const statusRef = useRef(null);
	const priorityRef = useRef(null);
	const descriptionRef = useRef(null);

	const handleAddFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;

		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;

		setAddFormData(newFormData);
	};

	const handleSelectChange = (event, taskId) => {
		event.preventDefault();

		const fieldValue = event.target.value;

		if (fieldValue === 'Remove') {
			handleDeleteChange(taskId);
			return;
		}

		const editedTask = {
			id: editTask.rowId,
			status: fieldValue,
			priority: editFormData.priority,
			description: editFormData.description,
		};

		const newTasks = [...tasks];

		const index = tasks.findIndex((task) => task.id === editTask.rowId);

		newTasks[index] = editedTask;

		setTasks(newTasks);

		setEditTask({
			rowId: null,
			cellType: null,
		});
	};

	const handleEditFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;

		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;

		setEditFormData(newFormData);
	};

	const handleAddFormSubmit = (event) => {
		event.preventDefault();

		const newTask = {
			id: nanoid(),
			key: nanoid(),
			status: addFormData.status,
			priority: addFormData.priority,
			description: addFormData.description,
		};

		const newTasks = [...tasks, newTask];
		setTasks(newTasks);

		statusRef.current.value = 'Select Status';
		priorityRef.current.value = '';
		descriptionRef.current.value = '';
	};

	const handleEditFormSubmit = (event) => {
		event.preventDefault();

		const editedTask = {
			id: editTask.rowId,
			status: editFormData.status,
			priority: editFormData.priority,
			description: editFormData.description,
		};

		const newTasks = [...tasks];

		const index = tasks.findIndex((task) => task.id === editTask.rowId);

		newTasks[index] = editedTask;

		setTasks(newTasks);

		handleCancelClick();
	};

	const handleEditClick = (event, task) => {
		event.preventDefault();
		setEditTask({
			rowId: task.id,
			cellType: event.target.getAttribute('id'),
		});

		const formValues = {
			status: task.status,
			priority: task.priority,
			description: task.description,
		};

		setEditFormData(formValues);
	};

	const handleCancelClick = () => {
		setEditTask({
			rowId: null,
			cellType: null,
		});
	};

	const handleDeleteChange = (taskId) => {
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
							<th>
								<img src={checkBox} alt='status icon' />
							</th>
							<th>ABC</th>
							<th>
								Prioritized Daily Task List
								{/* <button type='submit'>Save</button>
								<button type='button' onClick={handleCancelClick}>Cancel</button> */}
							</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task) => (
							<tr key={task.id}>
								{editTask.cellType === 'status' &&
								editTask.rowId === task.id ? (
									<EditableStatus
										editFormData={editFormData}
										handleSelectChange={handleSelectChange}
										handleCancelClick={handleCancelClick}
										task={task}
									/>
								) : (
									<ReadOnlyStatus
										task={task}
										handleEditClick={handleEditClick}
									/>
								)}
								{editTask.cellType === 'priority' &&
								editTask.rowId === task.id ? (
									<EditablePriority
										editFormData={editFormData}
										handleEditFormChange={handleEditFormChange}
										handleEditFormSubmit={handleEditFormSubmit}
										task={task}
									/>
								) : (
									<ReadOnlyPriority
										task={task}
										handleEditClick={handleEditClick}
									/>
								)}
								{editTask.cellType === 'description' &&
								editTask.rowId === task.id ? (
									<EditableDescription
										editFormData={editFormData}
										handleEditFormChange={handleEditFormChange}
										handleEditFormSubmit={handleEditFormSubmit}
										task={task}
									/>
								) : (
									<ReadOnlyDescription
										task={task}
										handleEditClick={handleEditClick}
									/>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</form>

			<h2>Add a Task</h2>
			<form onSubmit={handleAddFormSubmit}>
				<select onChange={handleAddFormChange} name='status' ref={statusRef}>
					<option hidden>Select Status</option>
					<option disabled default>
						Select Status
					</option>
					<option value='In Process'>In Process</option>
					<option value='Completed'>Completed</option>
					<option value='Forwarded'>Forwarded</option>
					<option value='Delegated'>Delegated</option>
				</select>
				<input
					type='text'
					name='priority'
					required='required'
					placeholder='Enter a priority'
					onChange={handleAddFormChange}
					ref={priorityRef}
				/>
				<input
					type='text'
					name='description'
					required='required'
					placeholder='Enter a task description...'
					onChange={handleAddFormChange}
					ref={descriptionRef}
				/>
				<button type='submit'>Add</button>
			</form>
		</div>
	);
};

export default App;
