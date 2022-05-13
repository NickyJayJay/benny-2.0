import React, { useRef, useEffect } from 'react';

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
		<td id='priority'>
			<input
				type='text'
				placeholder='Enter a priority...'
				name='priority'
				value={editFormData.priority}
				onChange={(event) => handleEditFormChange(event, task.id)}
				onBlur={handleEditFormSubmit}
				ref={inputRef}
			></input>
		</td>
	);
};

export default EditablePriority;
