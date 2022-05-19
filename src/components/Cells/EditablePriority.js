import React, { useRef, useEffect } from 'react';

import classes from '../../App.module.scss';

const EditablePriority = ({
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
		<td data-id='priority' className={classes.priority}>
			<input
				type='text'
				name='priority'
				value={editFormData.priority}
				onChange={(event) => handleEditFormChange(event, task.id)}
				placeholder='ABC'
				onBlur={handleEditFormSubmit}
				ref={inputRef}
			></input>
		</td>
	);
};

export default EditablePriority;
