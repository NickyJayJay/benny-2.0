import React from 'react';

const EditableStatus = ({ editFormData, handleSelectChange, task }) => {
	return (
		<td>
			<select
				id='status'
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
	);
};

export default EditableStatus;
