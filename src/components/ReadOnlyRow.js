import React from 'react';

const ReadOnlyRow = ({ task, handleEditClick, handleDeleteClick }) => {
	return (
		<tr>
			<td onClick={(event) => handleEditClick(event, task)}>{task.status}</td>
			<td onClick={(event) => handleEditClick(event, task)}>{task.priority}</td>
			<td onClick={(event) => handleEditClick(event, task)}>
				{task.taskDescription || 'Enter a task description'}
			</td>
		</tr>
	);
};

export default ReadOnlyRow;
