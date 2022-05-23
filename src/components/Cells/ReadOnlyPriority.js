import React from 'react';

import classes from '../../App.module.scss';

const ReadOnlyPriority = ({ handleEditClick, task }) => {
	return (
		<td
			data-id='priority-cell'
			className={classes.priority}
			onClick={(event) => handleEditClick(event, task)}
		>
			{task.priority}
		</td>
	);
};

export default ReadOnlyPriority;
