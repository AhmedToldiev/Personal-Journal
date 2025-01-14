import { useCallback, useState } from 'react'
import Button from '../Button/Button'
import SelectUser from '../SelectUser/SelectUser'
import Logo from '../Logo/Logo'

const logos = ['/logo.svg', '/vite.svg']
function Header() {
	const [logoIndex, setLogoIndex] = useState(0)
	console.log('Header')

	const toglelogo = useCallback(() => setLogoIndex(state => Number(!state)), [])
	return (
		<>
			<Logo image={logos[0]} />
			<SelectUser />
			<Button onClick={toglelogo}>Сменить логотип </Button>
		</>
	)
}
export default Header
