import React from 'react';

const EditableDescription = ({
	editFormData,
	handleEditFormChange,
	task,
	handleEditFormSubmit,
}) => {
	return (
		<td id='description'>
			<input
				type='text'
				placeholder='Enter a task description...'
				name='description'
				value={editFormData.description}
				onChange={(event) => handleEditFormChange(event, task.id)}
				onBlur={handleEditFormSubmit}
			></input>
		</td>
	);
};

export default EditableDescription;
