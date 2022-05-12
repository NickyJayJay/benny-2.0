import React from 'react';

const ReadOnlyDescription = ({ handleEditClick, task }) => {
	return (
		<td id='description' onClick={(event) => handleEditClick(event, task)}>
			{task.description}
		</td>
	);
};

export default ReadOnlyDescription;
