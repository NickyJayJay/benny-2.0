import React from 'react';

import classes from './Button.module.scss';

const Button = ({ type, onClick, children, disabled }) => {
	return (
		<button
			className={classes.button}
			type={type || 'button'}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
