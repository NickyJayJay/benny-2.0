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
					required='required'
					name='status'
					value={editFormData.status}
					onChange={(event) => handleEditFormChange(event, task.id)}
					onBlur={handleEditFormSubmit}
				>
					<option>Status</option>
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
					required='required'
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
					required='required'
					placeholder='Enter a task description...'
					name='taskDescription'
					value={editFormData.taskDescription}
					onChange={handleEditFormChange}
					onBlur={handleEditFormSubmit}
				></input>
			</td>
		</tr>
	);
};

export default EditableRow;
