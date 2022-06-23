import React from 'react';
import FocusLock from 'react-focus-lock';

import classes from './ContextMenu.module.scss';
import checkmark from '../../../assets/SVG/checkmark.svg';
import add from '../../../assets/SVG/add.svg';
import arrowRight from '../../../assets/SVG/arrow-right.svg';
import dot from '../../../assets/SVG/dot.svg';
import trash from '../../../assets/SVG/trash.svg';
import close from '../../../assets/SVG/close-regular.svg';

const ContextMenu = ({ xPos, yPos, handleMenuItemClick }) => {
	return (
		<FocusLock returnFocus>
			<div
				className={`${classes.contextMenu} card`}
				style={{
					top: yPos,
					left: xPos,
				}}
			>
				<ul>
					<li onClick={(event) => handleMenuItemClick(event)}>
						<button>
							<span>In Process</span>
							<img src={dot} alt='in process icon' />
						</button>
					</li>
					<li onClick={(event) => handleMenuItemClick(event)}>
						<button>
							<span>Completed</span>
							<img src={checkmark} alt='completed icon' />
						</button>
					</li>
					<li onClick={(event) => handleMenuItemClick(event)}>
						<button>
							<span>Forwarded</span>
							<img src={arrowRight} alt='forwarded icon' />
						</button>
					</li>
					<li onClick={(event) => handleMenuItemClick(event)}>
						<button>
							<span>Delegated</span>
							<img src={add} alt='delegated icon' />
						</button>
					</li>
					<li onClick={(event) => handleMenuItemClick(event)}>
						<button>
							<span>Remove</span>
							<img src={trash} alt='removed icon' />
						</button>
					</li>
					<li onClick={(event) => handleMenuItemClick(event)}>
						<button>
							<span>Cancel</span>
							<img src={close} alt='close icon' />
						</button>
					</li>
				</ul>
			</div>
		</FocusLock>
	);
};

export default ContextMenu;
