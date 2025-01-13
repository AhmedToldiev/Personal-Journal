import { useEffect, useState } from 'react'

export default function useLocalStorage(key) {
	const [data, setData] = useState()

	useEffect(() => {
		const res = JSON.parse(localStorage.getItem(key))
		if (res) {
			setData(res)
		}
	}, [])

	const saveData = newData => {
		localStorage.setItem('data', JSON.stringify(newData))
		setData(newData)
	}
	return [data, saveData]
}
