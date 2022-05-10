import React from 'react';

const EditableRow = ({
	editFormData,
	handleEditFormChange,
	handleEditFormSubmit,
	task,
}) => {
	return (
		<tr>
			<td>
				<select
					name='status'
					value={editFormData.status}
					onChange={(event) => handleEditFormChange(event, task.id)}
					onBlur={handleEditFormSubmit}
				>
					<option></option>
					<option value='In Process'>In Process</option>
					<option value='Completed'>Completed</option>
					<option value='Forwarded'>Forwarded</option>
					<option value='Delegated'>Delegated</option>
					<option value='Remove'>Remove</option>
				</select>
			</td>
			<td>
				<input
					type='text'
					placeholder='Enter a priority...'
					name='priority'
					value={editFormData.priority}
					onChange={handleEditFormChange}
					onBlur={handleEditFormSubmit}
				></input>
			</td>
			<td>
				<input
					type='text'
					placeholder='Enter a task description...'
					name='description'
					value={editFormData.description}
					onChange={handleEditFormChange}
					onBlur={handleEditFormSubmit}
				></input>
			</td>
		</tr>
	);
};

export default EditableRow;
