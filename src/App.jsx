import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalList from './components/JournalList/JournalList'
import Body from './components/layouts/Body/Body'
import LeftPanel from './components/layouts/LeftPanel/LeftPanel'
import JournalForm from './components/JournalForm/JournalForm'

const INITIAL_DATA = [
	// {
	// 	id: 1,
	// 	title: 'Подготовка к обновлению курсов',
	// 	text: 'Горные походы открывают удивительные природные ландшафт',
	// 	date: new Date(),
	// },
	// {
	// 	id: 2,
	// 	title: 'Поход в годы',
	// 	text: 'Думал, что очень много времени',
	// 	date: new Date(),
	// },
]
function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			setItems(data.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}
	}, []);

	useEffect(() => {
		if (items.length) {
			console.log('Запись!');
			localStorage.setItem('data', JSON.stringify(items));
		}
	}, [items]);

	const addItem = item => {
		setItems(oldItems => [
			...oldItems,
			{
				title: item.title,
				post: item.post,
				date: new Date(item.date),
				id:
					oldItems.length > 0 ? Math.max(...oldItems.map(el => el.id)) + 1 : 1,
			},
		])
	}

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={items}></JournalList>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	)
}

export default App
