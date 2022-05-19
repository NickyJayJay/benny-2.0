import React, { useEffect, useRef } from 'react';

import classes from '../../App.module.scss';

const EditableDescription = ({
	editFormData,
	handleEditFormChange,
	task,
	handleEditFormSubmit,
}) => {
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<td data-id='description' className={classes.description}>
			<input
				type='text'
				placeholder='Enter a task description...'
				name='description'
				value={editFormData.description}
				onChange={(event) => handleEditFormChange(event, task.id)}
				onBlur={handleEditFormSubmit}
				ref={inputRef}
			></input>
		</td>
	);
};

export default EditableDescription;
