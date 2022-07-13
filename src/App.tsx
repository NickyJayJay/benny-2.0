import React, { useState, useRef, useCallback, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, remove, update } from 'firebase/database';

import { firebaseConfig } from './firebaseConfig';
import useOutsideClick from './hooks/useOutsideClick';
import EditablePriority from './components/Cells/EditablePriority';
import EditableDescription from './components/Cells/EditableDescription';
import ReadOnlyStatus from './components/Cells/ReadOnlyStatus';
import ReadOnlyPriority from './components/Cells/ReadOnlyPriority';
import ReadOnlyDescription from './components/Cells/ReadOnlyDescription';
import Card from './components/UI/Card/Card.js';
import ButtonGradient from './components/UI/Button/ButtonGradient';
import Modal from './components/UI/Modal/Modal';
import ContextMenu from './components/UI/ContextMenu/ContextMenu';
import checkBox from './assets/SVG/checkBox.svg';
import classes from './App.module.scss';

const App = () => {
	const [tasks, setTasks] = useState<LoadedTask[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();

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
		xPos: '0px',
		yPos: '0px',
		xPosTouch: '0px',
		yPosTouch: '0px',
		showMenu: false,
	});

	const [isError, setIsError] = useState(false);

	const priorityInput = useRef(null);

	type LoadedTask = {
				id: string,
				status: string,
				priority: string,
				description: string
			};

	const loadedTasks: LoadedTask[] = [];

	// Initialize Firebase and set bindings
	const app = initializeApp(firebaseConfig);
	const db = getDatabase(app);
	const auth = getAuth();
	const url = app.options.databaseURL;

	if (editTask.showMenu || isError) {
		document.body.classList.add('lockScroll');
		document.body.style.top = `-${window.scrollY}px`;
	}
	if (!editTask.showMenu && !isError) {
		document.body.classList.remove('lockScroll');
		document.body.style.top = '';
	}

	useEffect(() => {
		const close = (e) => {
			if (e.key === 'Escape') {
				isError && hideModalHandler(e);
				editTask.showMenu && setEditTask({ ...editTask, showMenu: false });
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	});

	useEffect(() => {
		const fetchTasks = async () => {
			const response = await fetch(`${url}/tasks.json`);

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const responseData = await response.json();

			for (const key in responseData) {
				loadedTasks.push({
					id: key,
					status: responseData[key].status,
					priority: responseData[key].priority,
					description: responseData[key].description,
				});
			}
			setTasks(loadedTasks);
			setIsLoading(false);
		};

		fetchTasks().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, [loadedTasks, url]);

	const setX = useCallback((e) => {
		if (e.pageX) {
			return `${e.pageX}px`;
		} else if (e.touches && e.touches[0].pageX) {
			return `${e.touches[0].pageX}px`;
		} else if (e.type === 'keydown' && e.target.getBoundingClientRect()) {
			return `${e.target.getBoundingClientRect().x + 35}px`;
		} else {
			return null;
		}
	}, []);

	const setY = useCallback((e) => {
		const containerBottom =
			outsideClickRef.current?.getBoundingClientRect().bottom;
		const menuBottom =
			e.pageY + 224 - window.scrollY ||
			(e.touches && e.touches[0].pageY + 224 - window.scrollY) ||
			e.target.getBoundingClientRect().y + 224 ||
			null;

		if (e.pageY && menuBottom <= containerBottom) {
			return `${e.pageY}px`;
		} else if (e.pageY && menuBottom > containerBottom) {
			return `${e.pageY - (menuBottom - containerBottom)}px`;
		} else if (
			!e.pageY &&
			e.touches &&
			e.touches[0].pageY &&
			menuBottom <= containerBottom
		) {
			return `${e.touches[0].pageY}px`;
		} else if (
			!e.pageY &&
			e.touches &&
			e.touches[0].pageY &&
			menuBottom > containerBottom
		) {
			return `${e.touches[0].pageY - (menuBottom - containerBottom)}px`;
		} else if (
			e.type === 'keydown' &&
			e.target.getBoundingClientRect() &&
			menuBottom <= containerBottom
		) {
			return `${e.target.getBoundingClientRect().y + 35}px`;
		} else if (
			e.type === 'keydown' &&
			e.target.getBoundingClientRect() &&
			menuBottom > containerBottom
		) {
			return `${
				e.target.getBoundingClientRect().y - (menuBottom - containerBottom)
			}px`;
		} else {
			return null;
		}
	}, []);

	const handleOutsideClick = useCallback(
		(e) => {
			setEditTask({
				rowId: null,
				inputType: e.target.dataset.id || null,
				xPos: setX(e),
				yPos: setY(e),
				xPosTouch: setX(e),
				yPosTouch: setY(e),
				showMenu:
					((editTask.xPos && editTask.yPos) ||
						(editTask.xPosTouch && editTask.yPosTouch)) &&
					e.target.dataset.id === 'status-cell'
						? true
						: false,
			});
		},
		[
			editTask.xPos,
			editTask.xPosTouch,
			editTask.yPos,
			editTask.yPosTouch,
			setX,
			setY,
		]
	);

	const outsideClickRef = useOutsideClick((e: MouseEvent) => handleOutsideClick(e));

	const handleAddFormChange = (e) => {
		e.preventDefault();

		const fieldName = e.target.getAttribute('name');
		const fieldValue =
			fieldName === 'priority' ? e.target.value.toUpperCase() : e.target.value;

		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;

		handlePriorityValidation(fieldValue, fieldName, newFormData);

		setAddFormData(newFormData);
	};

	const handleMenuItemClick = (e) => {
		e.stopPropagation();
		if (e.key === 'Tab') return;
		let menuValue;

		if (e.type === 'click' && e.target.tagName === 'SPAN') {
			menuValue = e.target.textContent;
		} else if (e.type === 'click' && e.target.tagName === 'IMG') {
			menuValue = e.target.previousElementSibling.textContent;
		} else {
			menuValue = e.target.childNodes[0].textContent;
		}

		const editedTask = {
			id: editTask.rowId,
			status: menuValue,
			priority: editFormData.priority,
			description: editFormData.description,
		};

		if (menuValue === 'Remove') {
			handleDeleteChange(editTask.rowId);
			setEditTask({ ...editTask, showMenu: false });
			return;
		}

		if (menuValue === 'Cancel') {
			setEditTask({ ...editTask, showMenu: false });
			return;
		}

		const newTasks = [...tasks];
		const index = tasks.findIndex((task) => task.id === editTask.rowId);
		newTasks[index] = editedTask;
		setTasks(newTasks);

		setEditTask({ ...editTask, showMenu: false });
		return;
	};

	const handlePriorityValidation = (fieldValue, fieldName, newFormData) => {
		if (fieldName !== 'priority') return;

		if (
			/^([ABC]?|[ABC][1-9]?|[ABC][1-9][0-9])?$/i.test(fieldValue) &&
			fieldValue.length <= 3
		) {
			setIsError(false);
		} else {
			newFormData[fieldName] = editFormData.priority;
			setIsError(true);
		}
	};

	const handleEditFormChange = (e) => {
		e.preventDefault();

		const fieldName = e.target.getAttribute('name');
		const fieldValue =
			fieldName === 'priority' ? e.target.value.toUpperCase() : e.target.value;

		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;

		handlePriorityValidation(fieldValue, fieldName, newFormData);

		setEditFormData(newFormData);
	};

	const handleAddFormSubmit = (e) => {
		e.preventDefault();

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

		fetch(`${url}/tasks.json`, {
			method: 'POST',
			body: JSON.stringify({
				status: addFormData.status,
				priority: addFormData.priority,
				description: addFormData.description,
			}),
		});
	};

	const handleAddFormKeydown = (e) => {
		if (e.key === 'Enter') {
			const form = e.target.form;
			const i = Array.from(form.elements).indexOf(e.target);
			form.elements[i + 1].focus();
			e.preventDefault();
		}
	};

	const handleEditFormSubmit = (e) => {
		e.preventDefault();

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
		const dbRef = ref(db, `tasks/${editTask.rowId}`);
		update(dbRef, editedTask);
	};

	const handleEditFormKeydown = (e) => {
		const form = e.target.form;
		const focusableElements = document.querySelectorAll(
			'a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
		);
		const i = Array.from(form.elements).indexOf(e.target);
		const j = Array.from(focusableElements).indexOf(e.target);
		const curFocusableEl = form.elements[i];
		const nextFocusableEl = form.elements[i + 1] || focusableElements[j + 1];
		const prevFocusableEl = form.elements[i - 1] || focusableElements[j - 1];

		if (!nextFocusableEl || !prevFocusableEl) return;

		if (
			e.key === 'Enter' ||
			(e.key === 'Tab' &&
				!e.shiftKey &&
				(curFocusableEl.getAttribute('name') === 'priority' ||
					curFocusableEl.getAttribute('name') === 'description'))
		) {
			e.preventDefault();
			nextFocusableEl.click();
			nextFocusableEl.focus();
		}

		if (
			e.key === 'Tab' &&
			e.shiftKey &&
			(curFocusableEl.getAttribute('name') === 'priority' ||
				curFocusableEl.getAttribute('name') === 'description')
		) {
			e.preventDefault();
			prevFocusableEl.click();
			prevFocusableEl.focus();
		}

		const fieldName = e.target.getAttribute('name');
		const fieldValue =
			fieldName === 'priority' ? e.target.value.toUpperCase() : e.target.value;

		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;

		handlePriorityValidation(fieldValue, fieldName, newFormData);
		setEditFormData(newFormData);
	};

	const handleEditClick = (e, task) => {
		if (
			(e.key === 'Tab' || e.key === 'Escape' || e.shiftKey) &&
			e.target.dataset.id === 'status-cell'
		)
			return;
		e.stopPropagation();
		e.target.dataset.id === 'status-cell' && e.preventDefault();
		e.target.dataset.id === 'status-cell' && e.target.tagName === 'IMG'
			? e.target.parentNode.focus()
			: e.target.focus();
		setEditTask({
			rowId: task.id || null,
			inputType: e.target.dataset.id,
			xPos: setX(e),
			yPos: setY(e),
			xPosTouch: setX(e),
			yPosTouch: setY(e),
			showMenu:
				e.pageX !== 0 &&
				e.pageX !== 'undefined' &&
				e.pageY !== 0 &&
				e.pageY !== 'undefined' &&
				e.target.dataset.id === 'status-cell' &&
				e.key !== 'Tab'
					? true
					: false,
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

	const handleDeleteChange = (taskId) => {
		const newTasks = [...tasks];
		const index = tasks.findIndex((task) => task.id === taskId);

		newTasks.splice(index, 1);
		setTasks(newTasks);
		const dbRef = ref(db, `tasks/${taskId}`);
		remove(dbRef);
	};

	const letterPriorityHandler = (e) => {
		if (editTask.inputType === 'priority-cell') {
			const newFormData = { ...editFormData };
			newFormData.letterPriority = e.target.value;
			setEditFormData(newFormData);
		} else {
			const newFormData = { ...addFormData };
			newFormData.letterPriority = e.target.value;
			setAddFormData(newFormData);
		}
	};

	const numberPriorityHandler = (e) => {
		if (editTask.inputType === 'priority-cell') {
			const newFormData = { ...editFormData };
			newFormData.numberPriority = Math.abs(
				parseInt(e.target.value.slice(0, 2))
			);
			setEditFormData(newFormData);
		} else {
			const newFormData = { ...addFormData };
			newFormData.numberPriority = Math.abs(
				parseInt(e.target.value.slice(0, 2))
			);
			setAddFormData(newFormData);
		}
	};

	const updatePriorityHandler = (e) => {
		e.preventDefault();

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

	const hideModalHandler = (e) => {
		e.stopPropagation();
		if (e.key === 'Tab') return;

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

	if (httpError) {
		return (
			<section className={classes.tasksError}>
				<p>{httpError}</p>
			</section>
		);
	}

	if (isLoading) {
		return (
			<section className={classes.tasksLoading}>
				<p>Loading...</p>
			</section>
		);
	}

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
					{editTask.showMenu && (
						<ContextMenu
							xPos={editTask.xPos}
							yPos={editTask.yPos}
							handleMenuItemClick={handleMenuItemClick}
						/>
					)}
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
						<tbody ref={outsideClickRef}>
							{tasks.map((task) => (
								<tr key={task.id}>
									<ReadOnlyStatus
										task={task}
										handleEditClick={handleEditClick}
										editTask={editTask}
									/>
									{editTask.inputType === 'priority-cell' &&
									editTask.rowId === task.id ? (
										<EditablePriority
											editFormData={editFormData}
											handleEditFormChange={handleEditFormChange}
											handleEditFormSubmit={handleEditFormSubmit}
											handleEditFormKeydown={handleEditFormKeydown}
											task={task}
											isError={isError}
											editTask={editTask}
										/>
									) : (
										<ReadOnlyPriority
											task={task}
											handleEditClick={handleEditClick}
										/>
									)}
									{editTask.inputType === 'description-cell' &&
									editTask.rowId === task.id ? (
										<EditableDescription
											editFormData={editFormData}
											handleEditFormChange={handleEditFormChange}
											handleEditFormSubmit={handleEditFormSubmit}
											handleEditFormKeydown={handleEditFormKeydown}
											task={task}
											editTask={editTask}
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

				<div className={classes.addTask}>
					<form onSubmit={handleAddFormSubmit}>
						<fieldset>
							<legend>Add a Task</legend>
							<select
								onChange={handleAddFormChange}
								onClick={(e) => handleOutsideClick(e)}
								onKeyDown={(e) => handleAddFormKeydown(e)}
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
								onChange={(e) => handleAddFormChange(e)}
								onClick={(e) => handleOutsideClick(e)}
								onKeyDown={(e) => handleAddFormKeydown(e)}
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
								onClick={(e) => handleOutsideClick(e)}
								onKeyDown={(e) => handleAddFormKeydown(e)}
								aria-label='Enter task description'
								maxLength='150'
							/>
							<ButtonGradient type='submit'>
								<span>Add Task</span>
							</ButtonGradient>
						</fieldset>
					</form>
				</div>
			</Card>
		</div>
	);
};

export default App;
