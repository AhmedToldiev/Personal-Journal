import { memo, useState } from 'react'
import './Button.css'

function Button({ children, onClick }) {
	console.log('Button')
	return (
		<button className='button accent' onClick={onClick}>
			{children}
		</button>
	)
}

export default memo(Button)
