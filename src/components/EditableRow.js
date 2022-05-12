import React from 'react';

const EditableRow = ({
	editFormData,
	handleSelectChange,
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
					onChange={(event) => handleSelectChange(event, task.id)}
				>
					<option hidden>Select Status</option>
					<option disabled default>
						Select Status
					</option>
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
					onChange={(event) => handleEditFormChange(event, task.id)}
					onBlur={handleEditFormSubmit}
				></input>
			</td>
			<td>
				<input
					type='text'
					placeholder='Enter a task description...'
					name='description'
					value={editFormData.description}
					onChange={(event) => handleEditFormChange(event, task.id)}
					onBlur={handleEditFormSubmit}
				></input>
			</td>
		</tr>
	);
};

export default EditableRow;
