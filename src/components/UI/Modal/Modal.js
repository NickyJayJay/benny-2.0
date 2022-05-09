import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.scss';
import Card from '../Card/Card';
import UpdateTaskStatus from '../../Table/Row/Cells/Status/UpdateTaskStatus';
import UpdateTaskPriority from '../../Table/Row/Cells/Priority/UpdateTaskPriority';
import Close from '../../../assets/SVG/close.svg';

const Modal = ({
	onHide,
	onStatus,
	onPriority,
	onLetter,
	onNumber,
	letterPriority,
	numberPriority,
	onMode,
	modalMode,
}) => {
	return (
		<>
			{ReactDOM.createPortal(
				<div className={classes.backdrop} onClick={onHide}></div>,
				document.getElementById('backdrop-root')
			)}
			{ReactDOM.createPortal(
				<Card className={`${classes.modal} ${classes.active}`}>
					<img
						src={Close}
						className={classes.closeModal}
						alt='close icon'
						onClick={onHide}
					/>
					{modalMode === 'status-cell' && (
						<UpdateTaskStatus
							onHide={onHide}
							onStatus={onStatus}
							onMode={onMode}
						/>
					)}
					{modalMode === 'priority-cell' && (
						<UpdateTaskPriority
							onHide={onHide}
							onPriority={onPriority}
							onLetter={onLetter}
							onNumber={onNumber}
							onMode={onMode}
							letterPriority={letterPriority}
							numberPriority={numberPriority}
						/>
					)}
				</Card>,
				document.getElementById('overlay-root')
			)}
		</>
	);
};

export default Modal;
