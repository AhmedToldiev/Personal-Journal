import { memo } from 'react'
import './Button.css'

function Button({ children, onClick }) {
	return (
		<button className='button accent' onClick={onClick}>
			{children}
		</button>
	)
}

export default memo(Button)
