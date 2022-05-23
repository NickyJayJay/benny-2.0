import React from 'react';

import Button from '../../UI/Button/Button';
import classes from './UpdateTaskPriority.module.scss';

const UpdateTaskPriority = ({
	onPriority,
	onLetter,
	onNumber,
	letterPriority,
	numberPriority,
	handleEditFormSubmit,
	handleAddFormChange,
	editMode,
}) => {
	return (
		<form
			className={classes.UpdateTaskPriority}
			onSubmit={
				editMode === 'priority-cell'
					? handleEditFormSubmit
					: handleAddFormChange
			}
		>
			<h2>Update Task Priority</h2>
			<fieldset>
				<legend>First, choose a priority letter (A, B, C)</legend>
				<div className={classes.inputWrap}>
					<input
						type='radio'
						id='A'
						name='letter'
						value='A'
						onInput={onLetter}
					/>
					<label>
						A <span>(Important and time sensitive)</span>
					</label>
				</div>
				<div className={classes.inputWrap}>
					<input
						type='radio'
						id='B'
						name='letter'
						value='B'
						onInput={onLetter}
					/>
					<label>
						B <span>(Important but not time sensitive)</span>
					</label>
				</div>
				<div className={classes.inputWrap}>
					<input
						type='radio'
						id='C'
						name='letter'
						value='C'
						onInput={onLetter}
					/>
					<label>
						C <span>(Not important)</span>
					</label>
				</div>
			</fieldset>
			<fieldset>
				<legend>Then enter a priority number (1 - 99)</legend>
				<input
					type='number'
					min='1'
					max='99'
					onInput={onNumber}
					name='priority'
				/>
			</fieldset>
			<div className={classes.preview}>
				{letterPriority}
				{numberPriority}
			</div>
			<Button
				type='submit'
				onClick={(event) => onPriority(event)}
				disabled={letterPriority ? false : true}
			>
				CONFIRM PRIORITY
			</Button>
		</form>
	);
};

export default UpdateTaskPriority;
