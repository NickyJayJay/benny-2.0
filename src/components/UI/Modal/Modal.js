import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.scss';
import Card from '../Card/Card';
import UpdateTaskPriority from '../../Cells/Error/UpdateTaskPriority';
import Close from '../../../assets/SVG/close.svg';

const Modal = ({
	editFormData,
	addFormData,
	onHide,
	onPriority,
	onLetter,
	onNumber,
	editMode,
	handleEditFormSubmit,
	handleAddFormSubmit,
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
					{(editMode === 'priority-cell' || editMode === 'priority-input') && (
						<UpdateTaskPriority
							onPriority={onPriority}
							onLetter={onLetter}
							onNumber={onNumber}
							editMode={editMode}
							letterPriority={
								editMode === 'priority-cell'
									? editFormData.letterPriority
									: addFormData.letterPriority
							}
							numberPriority={
								editMode === 'priority-cell'
									? editFormData.numberPriority
									: addFormData.numberPriority
							}
							handleEditFormSubmit={handleEditFormSubmit}
							handleAddFormSubmit={handleAddFormSubmit}
						/>
					)}
				</Card>,
				document.getElementById('overlay-root')
			)}
		</>
	);
};

export default Modal;
