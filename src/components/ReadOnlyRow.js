import React from 'react';

import checkmark from '../assets/SVG/checkmark.svg';
import add from '../assets/SVG/add.svg';
import arrowRight from '../assets/SVG/arrow-right.svg';
import dot from '../assets/SVG/dot.svg';
import X from '../assets/SVG/x.svg';

const ReadOnlyRow = ({ task, handleEditClick }) => {
	return (
		<tr>
			<td onClick={(event) => handleEditClick(event, task)}>
				{task.status === 'In Process' && (
					<img src={dot} alt='in process icon' />
				)}
				{task.status === 'Completed' && (
					<img src={checkmark} alt='completed icon' />
				)}
				{task.status === 'Forwarded' && (
					<img
						src={arrowRight}
						alt='forwarded icon'
						className={'status-cell'}
					/>
				)}
				{task.status === 'Delegated' && <img src={add} alt='delegated icon' />}
				{task.status === 'Removed' && <img src={X} alt='removed icon' />}
			</td>
			<td onClick={(event) => handleEditClick(event, task)}>{task.priority}</td>
			<td onClick={(event) => handleEditClick(event, task)}>
				{task.taskDescription || 'Enter a task description'}
			</td>
		</tr>
	);
};

export default ReadOnlyRow;
