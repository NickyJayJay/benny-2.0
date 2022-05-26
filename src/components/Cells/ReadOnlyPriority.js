import React from 'react';

import classes from '../../App.module.scss';

const ReadOnlyPriority = ({ handleEditClick, task, setEditMode }) => {
	return (
		<td
			data-id='priority-cell'
			className={classes.priority}
			onClick={(event) => handleEditClick(event, task)}
			onKeyDown={(event) => handleEditClick(event, task)}
			onKeyPress={(event) => handleEditClick(event, task)}
			onFocus={(event) => setEditMode(event.target.dataset.id)}
		>
			<button data-id='priority-cell'>{task.priority}</button>
		</td>
	);
};

export default ReadOnlyPriority;
