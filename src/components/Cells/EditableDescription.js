import React, { useEffect, useRef } from 'react';

import classes from '../../App.module.scss';

const EditableDescription = ({
	editFormData,
	handleEditFormChange,
	task,
	handleEditFormSubmit,
	handleEditFormKeydown,
	editTask,
}) => {
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	});

	return (
		<td
			data-id='description-cell'
			className={
				task.id === editTask.rowId && editTask.inputType === 'description-cell'
					? `${classes.description} ${classes.active}`
					: classes.description
			}
		>
			<input
				type='text'
				placeholder='Enter a task description...'
				name='description'
				value={editFormData.description}
				onChange={(event) => handleEditFormChange(event, task.id)}
				onKeyDown={(event) => handleEditFormKeydown(event)}
				onBlur={(event) => handleEditFormSubmit(event)}
				ref={inputRef}
				maxLength='150'
			></input>
		</td>
	);
};

export default EditableDescription;
