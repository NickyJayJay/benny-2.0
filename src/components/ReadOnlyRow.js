import React from 'react';

const ReadOnlyRow = ({ task, handleEditClick, handleDeleteClick }) => {
	return (
		<tr>
			<td>{task.status}</td>
			<td>{task.priority}</td>
			<td>{task.taskDescription}</td>
			<td>
				<button type='button' onClick={(event) => handleEditClick(event, task)}>
					Edit
				</button>
				<button type='button' onClick={() => handleDeleteClick(task.id)}>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default ReadOnlyRow;
