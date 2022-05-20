import React from 'react';

import classes from '../../App.module.scss';
import checkmark from '../../assets/SVG/checkmark.svg';
import add from '../../assets/SVG/add.svg';
import arrowRight from '../../assets/SVG/arrow-right.svg';
import dot from '../../assets/SVG/dot.svg';
import X from '../../assets/SVG/x.svg';

const ReadOnlyStatus = ({ handleEditClick, task }) => {
	return (
		<td
			data-id='status-cell'
			className={classes.status}
			onClick={(event) => handleEditClick(event, task)}
		>
			{task.status === 'In Process' && (
				<img
					src={dot}
					alt='in process icon'
					data-id='status'
					// onClick={(event) => handleEditClick(event, task)}
				/>
			)}
			{task.status === 'Completed' && (
				<img
					src={checkmark}
					alt='completed icon'
					data-id='status'
					// onClick={(event) => handleEditClick(event, task)}
				/>
			)}
			{task.status === 'Forwarded' && (
				<img
					src={arrowRight}
					alt='forwarded icon'
					data-id='status'
					// onClick={(event) => handleEditClick(event, task)}
				/>
			)}
			{task.status === 'Delegated' && (
				<img
					src={add}
					alt='delegated icon'
					data-id='status'
					// onClick={(event) => handleEditClick(event, task)}
				/>
			)}
			{task.status === 'Removed' && (
				<img
					src={X}
					alt='removed icon'
					data-id='status'
					// onClick={(event) => handleEditClick(event, task)}
				/>
			)}
		</td>
	);
};

export default ReadOnlyStatus;
