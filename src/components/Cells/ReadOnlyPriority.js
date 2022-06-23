import React from 'react';

import classes from '../../App.module.scss';

const ReadOnlyPriority = ({ handleEditClick, task }) => {
	return (
		<td
			data-id='priority-cell'
			className={classes.priority}
			onTouchStart={(event) => handleEditClick(event, task)}
			onClick={(event) => handleEditClick(event, task)}
			onKeyUp={(event) => handleEditClick(event, task)}
		>
			<button data-id='priority-cell'>{task.priority}</button>
		</td>
	);
};

export default ReadOnlyPriority;
