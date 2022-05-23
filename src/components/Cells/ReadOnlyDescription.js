import React from 'react';

import classes from '../../App.module.scss';

const ReadOnlyDescription = ({ handleEditClick, task }) => {
	return (
		<td
			data-id='description-cell'
			className={classes.description}
			onClick={(event) => handleEditClick(event, task)}
		>
			{task.description}
		</td>
	);
};

export default ReadOnlyDescription;
