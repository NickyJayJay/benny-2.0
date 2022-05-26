import React, { useState, useRef } from 'react';
import { nanoid } from 'nanoid';

import data from './mock-data.json';
import EditableStatus from './components/Cells/EditableStatus';
import EditablePriority from './components/Cells/EditablePriority';
import EditableDescription from './components/Cells/EditableDescription';
import ReadOnlyStatus from './components/Cells/ReadOnlyStatus';
import ReadOnlyPriority from './components/Cells/ReadOnlyPriority';
import ReadOnlyDescription from './components/Cells/ReadOnlyDescription';
import Card from './components/UI/Card/Card.js';
import Button from './components/UI/Button/Button';
import Modal from './components/UI/Modal/Modal';
import checkBox from './assets/SVG/checkBox.svg';
import classes from './App.module.scss';

const App = () => {
	const [tasks, setTasks] = useState(data);
	const [addFormData, setAddFormData] = useState({
		status: '',
		letterPriority: '',
		numberPriority: '',
		priority: '',
		description: '',
	});

	const [editFormData, setEditFormData] = useState({
		status: '',
		letterPriority: '',
		numberPriority: '',
		priority: '',
		description: '',
	});

	const [editTask, setEditTask] = useState({
		rowId: null,
		inputType: null,
	});

	const [isError, setIsError] = useState(false);

	const priorityInput = useRef(null);

	const handleAddFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute('name');
		const fieldValue =
			fieldName === 'priority'
				? event.target.value.toUpperCase()
				: event.target.value;

		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;

		handlePriorityValidation(fieldValue, fieldName, newFormData);

		setAddFormData(newFormData);
	};

	const handleSelectChange = (event, taskId) => {
		event.preventDefault();
		const form = event.target.form;
		const i = Array.from(form.elements).indexOf(event.target);
		form.elements[i + 1].focus();

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
		handleCancelClick();
	};

	const handlePriorityValidation = (fieldValue, fieldName, newFormData) => {
		if (fieldName !== 'priority') return;

		if (/^([ABC]?|[ABC][1-9]?|[ABC][1-9][0-9])?$/i.test(fieldValue)) {
			setIsError(false);
		} else {
			newFormData[fieldName] = '';
			setIsError(true);
		}
	};

	const handleEditFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute('name');
		const fieldValue =
			fieldName === 'priority'
				? event.target.value.toUpperCase()
				: event.target.value;

		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;

		handlePriorityValidation(fieldValue, fieldName, newFormData);

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

		setAddFormData({
			status: 'Select Status',
			letterPriority: '',
			numberPriority: '',
			priority: '',
			description: '',
		});
	};

	const handleAddFormKeydown = (event) => {
		if (event.keyCode === 13) {
			const form = event.target.form;
			const i = Array.from(form.elements).indexOf(event.target);
			form.elements[i + 1].focus();
			event.preventDefault();
		}
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
	};

	const handleEditFormSubmitKeydown = (event) => {
		if (event.keyCode === 13) {
			const form = event.target.form;
			const i = Array.from(form.elements).indexOf(event.target);
			form.elements[i + 1].focus();
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
		}
	};

	const handleEditClick = (event, task) => {
		if (event.key === 'Tab') return;

		event.preventDefault();
		setEditTask({
			rowId: task.id || null,
			inputType: event.target.dataset.id,
		});

		const formValues = {
			status: task.status,
			letterPriority: '',
			numberPriority: '',
			priority: task.priority,
			description: task.description,
		};

		setEditFormData(formValues);
	};

	const handleCancelClick = () => {
		setEditTask({
			rowId: null,
			inputType: null,
		});
	};

	const handleDeleteChange = (taskId) => {
		const newTasks = [...tasks];
		const index = tasks.findIndex((task) => task.id === taskId);

		newTasks.splice(index, 1);
		setTasks(newTasks);
	};

	const letterPriorityHandler = (event) => {
		if (editTask.inputType === 'priority-cell') {
			const newFormData = { ...editFormData };
			newFormData.letterPriority = event.target.value;
			setEditFormData(newFormData);
		} else {
			const newFormData = { ...addFormData };
			newFormData.letterPriority = event.target.value;
			setAddFormData(newFormData);
		}
	};

	const numberPriorityHandler = (event) => {
		if (editTask.inputType === 'priority-cell') {
			const newFormData = { ...editFormData };
			newFormData.numberPriority = Math.abs(
				parseInt(event.target.value.slice(0, 2))
			);
			setEditFormData(newFormData);
		} else {
			const newFormData = { ...addFormData };
			newFormData.numberPriority = Math.abs(
				parseInt(event.target.value.slice(0, 2))
			);
			setAddFormData(newFormData);
		}
	};

	const updatePriorityHandler = (event) => {
		event.preventDefault();

		if (editTask.inputType === 'priority-cell') {
			const newFormData = {
				...editFormData,
				priority: editFormData.letterPriority + editFormData.numberPriority,
				letterPriority: '',
				numberPriority: '',
			};
			setEditFormData(newFormData);
		} else {
			const newFormData = {
				...addFormData,
				priority: addFormData.letterPriority + addFormData.numberPriority,
				letterPriority: '',
				numberPriority: '',
			};
			setAddFormData(newFormData);
		}
		setIsError(false);
	};

	const hideModalHandler = (event) => {
		if (event.key === 'Tab') return;

		if (editTask.inputType === 'priority-cell') {
			const newFormData = {
				...editFormData,
				letterPriority: '',
				numberPriority: '',
			};
			setEditFormData(newFormData);
		} else {
			const newFormData = {
				...addFormData,
				letterPriority: '',
				numberPriority: '',
			};
			setAddFormData(newFormData);
		}
		setIsError(false);
	};

	return (
		<div className={classes.appContainer}>
			{isError &&
				(editTask.inputType === 'priority-cell' ||
					editTask.inputType === 'priority-input') && (
					<Modal
						editFormData={editFormData}
						addFormData={addFormData}
						onHide={hideModalHandler}
						onPriority={updatePriorityHandler}
						onLetter={letterPriorityHandler}
						onNumber={numberPriorityHandler}
						editMode={editTask.inputType}
						handleEditFormSubmit={handleEditFormSubmit}
						priorityInput={priorityInput}
					/>
				)}
			<Card className={`${classes.card} card`}>
				<form onSubmit={handleEditFormSubmit}>
					<table>
						<thead>
							<tr>
								<th className={classes.statusTitle}>
									<img src={checkBox} alt='status icon' />
								</th>
								<th className={classes.priorityTitle}>ABC</th>
								<th className={classes.descriptionTitle}>
									Prioritized Task List
								</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task) => (
								<tr key={task.id}>
									{editTask.inputType === 'status-cell' &&
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
											setEditTask={setEditTask}
										/>
									)}
									{editTask.inputType === 'priority-cell' &&
									editTask.rowId === task.id ? (
										<EditablePriority
											editFormData={editFormData}
											handleEditFormChange={handleEditFormChange}
											handleEditFormSubmit={handleEditFormSubmit}
											handleEditFormSubmitKeydown={handleEditFormSubmitKeydown}
											task={task}
											isError={isError}
										/>
									) : (
										<ReadOnlyPriority
											task={task}
											handleEditClick={handleEditClick}
											setEditTask={setEditTask}
										/>
									)}
									{editTask.inputType === 'description-cell' &&
									editTask.rowId === task.id ? (
										<EditableDescription
											editFormData={editFormData}
											handleEditFormChange={handleEditFormChange}
											handleEditFormSubmit={handleEditFormSubmit}
											handleEditFormSubmitKeydown={handleEditFormSubmitKeydown}
											task={task}
										/>
									) : (
										<ReadOnlyDescription
											task={task}
											handleEditClick={handleEditClick}
											setEditTask={setEditTask}
										/>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</form>

				<div className={classes.addTask}>
					<form onSubmit={handleAddFormSubmit}>
						<fieldset>
							<legend>Add a Task</legend>
							<select
								onChange={handleAddFormChange}
								onFocus={(event) =>
									setEditTask({
										rowId: null,
										inputType: event.target.dataset.id,
									})
								}
								onKeyDown={(event) => handleAddFormKeydown(event)}
								name='status'
								value={addFormData.status}
								data-id='status-input'
								aria-label='Select status'
							>
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
								data-id='priority-input'
								placeholder='ABC'
								value={addFormData.priority}
								onChange={(event) => handleAddFormChange(event)}
								onFocus={(event) =>
									setEditTask({
										rowId: null,
										inputType: event.target.dataset.id,
									})
								}
								onKeyDown={(event) => handleAddFormKeydown(event)}
								aria-label='Enter task priority'
								ref={priorityInput}
							></input>
							<input
								type='text'
								name='description'
								data-id='description-input'
								placeholder='Enter task description...'
								value={addFormData.description}
								onChange={handleAddFormChange}
								onFocus={(event) =>
									setEditTask({
										rowId: null,
										inputType: event.target.dataset.id,
									})
								}
								onKeyDown={(event) => handleAddFormKeydown(event)}
								aria-label='Enter task description'
								maxLength='150'
							/>
							<Button type='submit'>Add Task</Button>
						</fieldset>
					</form>
				</div>
			</Card>
		</div>
	);
};

export default App;
