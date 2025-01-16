import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/user.context'
import styles from './SelectUser.module.css'
import useLocalStorage from '../../hooks/use-localstorage.hook';

function SelectUser() {
	const { userId, setUserId } = useContext(UserContext)

	const [users, setUsers] = useLocalStorage('users', [
		{ id: '1', name: 'Александр' },
	]);
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [newUserName, setNewUserName] = useState('')

	const changeUser = e => {
		setUserId(e.target.value)
	}

	const addUser = () => {
		if (newUserName.trim()) {
			const newId = (users.length + 1).toString()
			const newUser = { id: newId, name: newUserName };
			setUsers([...users, newUser]);
			setNewUserName('')
			setIsModalOpen(false)
			setUserId(newId)
		}
	}

	return (
		<div className={styles['container']}>
			<select
				className={styles['select']}
				name='user'
				id='user'
				value={userId}
				onChange={changeUser}
			>
				{users.map(user => (
					<option key={user.id} value={user.id}>
						{user.name}
					</option>
				))}
			</select>
			<button className='button accent' onClick={() => setIsModalOpen(true)}>
				Добавить пользователя
			</button>

			{/* Модальное окно */}
			{isModalOpen && (
				<div className={styles['modal']}>
					<div className={styles['modal-content']}>
						<span
							className={styles['close']}
							onClick={() => setIsModalOpen(false)}
						>
							&times;
						</span>
						<h2>Добавить нового пользователя</h2>
						<input
							type='text'
							value={newUserName}
							onChange={e => setNewUserName(e.target.value)}
							className={styles['modal-input']}
							placeholder='Введите имя нового пользователя'
						/>
						<button className='button accent' onClick={addUser}>
							Сохранить
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default SelectUser
