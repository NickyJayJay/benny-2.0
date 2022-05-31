import React from 'react';

import classes from '../../App.module.scss';

const ReadOnlyDescription = ({ handleEditClick, task }) => {
	return (
		<td
			data-id='description-cell'
			className={classes.description}
			onTouchStart={(event) => handleEditClick(event, task)}
			onClick={(event) => handleEditClick(event, task)}
			onKeyUp={(event) => handleEditClick(event, task)}
		>
			<button data-id='description-cell'>{task.description}</button>
		</td>
	);
};

export default ReadOnlyDescription;
