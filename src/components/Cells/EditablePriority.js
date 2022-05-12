import React from 'react';

const EditablePriority = ({
	editFormData,
	handleEditFormChange,
	task,
	handleEditFormSubmit,
}) => {
	return (
		<td>
			<input
				type='text'
				placeholder='Enter a priority...'
				name='priority'
				value={editFormData.priority}
				onChange={(event) => handleEditFormChange(event, task.id)}
				onBlur={handleEditFormSubmit}
			></input>
		</td>
	);
};

export default EditablePriority;
