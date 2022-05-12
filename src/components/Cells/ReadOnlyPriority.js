import React from 'react';

const ReadOnlyPriority = ({ handleEditClick, task }) => {
	return (
		<td id='priority' onClick={(event) => handleEditClick(event, task)}>
			{task.priority}
		</td>
	);
};

export default ReadOnlyPriority;
