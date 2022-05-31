import React, { useRef, useEffect } from 'react';

import classes from '../../App.module.scss';

const EditablePriority = ({
	editFormData,
	handleEditFormChange,
	task,
	handleEditFormSubmit,
	handleEditFormKeydown,
	isError,
	editTask,
}) => {
	const inputRef = useRef(null);

	useEffect(() => {
		!isError && inputRef.current.focus();
	});

	return (
		<td
			data-id='priority-cell'
			className={
				task.id === editTask.rowId && editTask.inputType === 'priority-cell'
					? `${classes.priority} ${classes.active}`
					: classes.priority
			}
		>
			<input
				type='text'
				name='priority'
				value={editFormData.priority}
				onChange={(event) => handleEditFormChange(event, task.id)}
				placeholder='ABC'
				onBlur={handleEditFormSubmit}
				onKeyDown={(event) => handleEditFormKeydown(event)}
				ref={inputRef}
			></input>
		</td>
	);
};

export default EditablePriority;
