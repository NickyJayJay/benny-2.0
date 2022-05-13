import React, { useEffect, useRef } from 'react';

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
		<td id='description'>
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
