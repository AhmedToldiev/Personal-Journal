import { forwardRef } from 'react';
import styles from './Input.module.css';
import classnames from 'classnames';

const Input = forwardRef(function Input({ isValid, appearence = 'text', className, ...props }, ref) {
	return (
		<input ref={ref} className={classnames(className, {
			[styles['invalid']]: isValid,
			[styles['input-title']]: appearence == 'title',
			[styles['input']]: appearence == 'text'
		})} {...props}/>
	);
});

export default Input;