import React from 'react';

const ReadOnlyRow = ({ task, handleEditClick, handleDeleteClick }) => {
	return (
		<tr>
			<td onClick={(event) => handleEditClick(event, task)}>{task.status}</td>
			<td onClick={(event) => handleEditClick(event, task)}>{task.priority}</td>
			<td onClick={(event) => handleEditClick(event, task)}>
				{task.taskDescription}
			</td>
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
