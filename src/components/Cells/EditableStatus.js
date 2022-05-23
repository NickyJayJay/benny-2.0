import React, { useRef, useEffect } from 'react';

import classes from '../../App.module.scss';

const EditableStatus = ({
	editFormData,
	handleSelectChange,
	task,
	handleCancelClick,
}) => {
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<td data-id='status-cell' className={classes.status}>
			<select
				value={editFormData.status}
				onChange={(event) => handleSelectChange(event, task.id)}
				ref={inputRef}
				onBlur={handleCancelClick}
			>
				<option disabled default hidden>
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
