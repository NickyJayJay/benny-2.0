import React from 'react';

import checkmark from '../../assets/SVG/checkmark.svg';
import add from '../../assets/SVG/add.svg';
import arrowRight from '../../assets/SVG/arrow-right.svg';
import dot from '../../assets/SVG/dot.svg';
import X from '../../assets/SVG/x.svg';

const ReadOnlyStatus = ({ handleEditClick, task }) => {
	return (
		<td id='status' onClick={(event) => handleEditClick(event, task)}>
			{task.status === 'In Process' && <img src={dot} alt='in process icon' />}
			{task.status === 'Completed' && (
				<img src={checkmark} alt='completed icon' />
			)}
			{task.status === 'Forwarded' && (
				<img src={arrowRight} alt='forwarded icon' />
			)}
			{task.status === 'Delegated' && <img src={add} alt='delegated icon' />}
			{task.status === 'Removed' && <img src={X} alt='removed icon' />}
		</td>
	);
};

export default ReadOnlyStatus;
