import React from 'react';

import classes from '../../App.module.scss';
import checkmark from '../../assets/SVG/checkmark.svg';
import add from '../../assets/SVG/add.svg';
import arrowRight from '../../assets/SVG/arrow-right.svg';
import dot from '../../assets/SVG/dot.svg';
import X from '../../assets/SVG/x.svg';

const ReadOnlyStatus = ({ handleEditClick, task, setEditMode }) => {
	return (
		<td
			data-id='status-cell'
			className={classes.status}
			onClick={(event) => handleEditClick(event, task)}
			onKeyDown={(event) => handleEditClick(event, task)}
			onKeyPress={(event) => handleEditClick(event, task)}
			onFocus={(event) => setEditMode(event.target.dataset.id)}
		>
			{task.status === 'In Process' && (
				<button data-id='status-cell'>
					<img src={dot} alt='in process icon' data-id='status-cell' />
				</button>
			)}
			{task.status === 'Completed' && (
				<button data-id='status-cell'>
					<img src={checkmark} alt='completed icon' data-id='status-cell' />
				</button>
			)}
			{task.status === 'Forwarded' && (
				<button data-id='status-cell'>
					<img src={arrowRight} alt='forwarded icon' data-id='status-cell' />
				</button>
			)}
			{task.status === 'Delegated' && (
				<button data-id='status-cell'>
					<img src={add} alt='delegated icon' data-id='status-cell' />
				</button>
			)}
			{task.status === 'Removed' && (
				<button data-id='status-cell'>
					<img src={X} alt='removed icon' data-id='status-cell' />
				</button>
			)}
			{task.status === '' && <button data-id='status-cell'></button>}
		</td>
	);
};

export default ReadOnlyStatus;
