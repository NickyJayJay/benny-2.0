import React from 'react';

import classes from './Button.module.scss';

const ButtonGradient = ({ type, onClick, children, disabled }) => {
	return (
		<button
			className={classes.buttonGradient}
			type={type || 'button'}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default ButtonGradient;
