import React, { useRef, useEffect } from 'react';

import classes from '../../App.module.scss';

const EditablePriority = ({
	editFormData,
	handleEditFormChange,
	task,
	handleEditFormSubmit,
	handleEditFormSubmitKeydown,
	isError,
}) => {
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, [isError]);

	return (
		<td data-id='priority-cell' className={classes.priority}>
			<input
				type='text'
				name='priority'
				value={editFormData.priority}
				onChange={(event) => handleEditFormChange(event, task.id)}
				placeholder='ABC'
				onBlur={handleEditFormSubmit}
				onKeyDown={handleEditFormSubmitKeydown}
				ref={inputRef}
				maxLength='3'
			></input>
		</td>
	);
};

export default EditablePriority;
