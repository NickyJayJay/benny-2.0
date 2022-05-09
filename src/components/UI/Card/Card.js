import React from 'react';

import classes from './Card.module.scss';

const Card = ({ className, children }) => {
	return <div className={`${classes.card} ${className}`}>{children}</div>;
};

export default Card;
