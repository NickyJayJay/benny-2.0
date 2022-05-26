import React from 'react';

import classes from '../../App.module.scss';

const ReadOnlyDescription = ({ handleEditClick, task, setEditTask }) => {
	return (
		<td
			data-id='description-cell'
			className={classes.description}
			onClick={(event) => handleEditClick(event, task)}
			onKeyDown={(event) => handleEditClick(event, task)}
			onFocus={(event) => handleEditClick(event, task)}
		>
			<button data-id='description-cell'>{task.description}</button>
		</td>
	);
};

export default ReadOnlyDescription;
