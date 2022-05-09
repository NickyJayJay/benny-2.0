import React from 'react';

const EditableRow = ({
	editFormData,
	handleEditFormChange,
	handleCancelClick,
}) => {
	return (
		<tr>
			<td>
				<select
					required='required'
					name='status'
					value={editFormData.status}
					onChange={handleEditFormChange}
				>
					<option value='inProcess'>In Process</option>
					<option value='completed'>Completed</option>
					<option value='forwarded'>Forwarded</option>
					<option value='delegated'>Delegated</option>
					<option value='removed'>Removed</option>
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
				></input>
			</td>
			<td>
				<button type='submit'>Save</button>
				<button type='button' onClick={handleCancelClick}>
					Cancel
				</button>
			</td>
		</tr>
	);
};

export default EditableRow;
