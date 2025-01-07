import styles from './JournalForm.module.css'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import classNames from 'classnames'

const INITIAL_STATE = {
	title: true,
	post: true,
	date: true,
}
function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState(INITIAL_STATE)

	useEffect(() => {
		let timerId
		if (!formValidState.title || !formValidState.post || !formValidState.date) {
			timerId = setTimeout(() => {
				console.log('Очистка состояния')
				setFormValidState(INITIAL_STATE)
			}, 2000)
		}
		return () => clearTimeout(timerId)
	}, [formValidState])
	const addJournalItem = e => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const formProps = Object.fromEntries(formData)

		let ifFormValid = true
		if (!formProps.title?.trim().length) {
			setFormValidState(state => ({ ...state, title: false }))
			ifFormValid = false
		} else {
			setFormValidState(state => ({ ...state, title: true }))
		}
		if (!formProps.post?.trim().length) {
			setFormValidState(state => ({ ...state, post: false }))
			ifFormValid = false
		} else {
			setFormValidState(state => ({ ...state, post: true }))
		}
		if (!formProps.date) {
			setFormValidState(state => ({ ...state, date: false }))
			ifFormValid = false
		} else {
			setFormValidState(state => ({ ...state, date: true }))
		}
		if (!ifFormValid) return
		onSubmit(formProps)
	}
	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input
					type='text'
					name='title'
					className={classNames(styles['input-title'], {
						[styles['invalid']]: !formValidState.title,
					})}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}>
					<img src='/calendar.svg' alt='Иконка календаря' />
					<span>Дата</span>
				</label>
				<input
					type='date'
					name='date'
					id='date'
					className={classNames(styles['input'], {
						[styles['invalid']]: !formValidState.date,
					})}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src='/folder.svg' alt='Иконка папки' />
					<span>Метки</span>
				</label>
				<input type='text' id='tag' name='tag' className={styles['input']} />
			</div>

			<textarea
				name='post'
				id=''
				cols='30'
				rows='10'
				className={classNames(styles['input'], {
					[styles['invalid']]: !formValidState.post,
				})}
			></textarea>

			<Button text='Сохранить' />
		</form>
	)
}

export default JournalForm
