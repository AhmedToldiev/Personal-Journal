import styles from './JournalForm.module.css'
import { useContext, useEffect, useReducer, useRef } from 'react'
import Button from '../Button/Button'
import classNames from 'classnames'
import { formReducer, INITIAL_STATE } from './JournalForm.state'
import Input from '../Input/Input'
import { UserContext } from '../../context/user.context'

function JournalForm({ onSubmit, data, onDelete }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
	const { isValid, isFormReadyToSubmit, values } = formState
	const titleRef = useRef()
	const dateRef = useRef()
	const postRef = useRef()
	const { userId } = useContext(UserContext)

	const focusError = isValid => {
		switch (true) {
			case !isValid.title:
				titleRef.current.focus()
				break
			case !isValid.date:
				dateRef.current.focus()
				break
			case !isValid.post:
				postRef.current.focus()
				break
		}
	}
	useEffect(() => {
		if (!data) {
			dispatchForm({ type: 'CLEAR' })
			dispatchForm({ type: 'SET_VALUE', payload: { userId } })
		}
		dispatchForm({ type: 'SET_VALUE', payload: { ...data } })
	}, [data])

	useEffect(() => {
		let timerId
		if (!isValid.title || !isValid.post || !isValid.date) {
			focusError(isValid)
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' })
			}, 2000)
		}
		return () => clearTimeout(timerId)
	}, [isValid])

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values)
			dispatchForm({ type: 'CLEAR' })
			dispatchForm({ type: 'SET_VALUE', payload: { userId } })
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId])

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { userId } })
	}, [userId])

	const onChange = e => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: { [e.target.name]: e.target.value },
		})
	}
	const addJournalItem = e => {
		e.preventDefault()
		dispatchForm({ type: 'SUBMIT' })
	}
	const deleteJournalItem = () => {
		onDelete(data.id)
		dispatchForm({ type: 'CLEAR' })
		dispatchForm({ type: 'SET_VALUE', payload: { userId } })
	}

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input
					appearence='title'
					type='text'
					ref={titleRef}
					onChange={onChange}
					value={values.title}
					name='title'
					isValid={!isValid.title}
				/>
				{data?.id && (
					<button
						className={styles['delete']}
						type='button'
						onClick={deleteJournalItem}
					>
						<img src='/archive.svg' alt='Кнопка удалить' />
					</button>
				)}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}>
					<img src='/calendar.svg' alt='Иконка календаря' />
					<span>Дата</span>
				</label>
				<Input
					type='date'
					ref={dateRef}
					onChange={onChange}
					name='date'
					value={
						values.date ? new Date(values.date).toISOString().slice(0, 10) : ''
					}
					id='date'
					isValid={!isValid.title}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src='/folder.svg' alt='Иконка папки' />
					<span>Метки</span>
				</label>
				<Input
					type='text'
					onChange={onChange}
					id='tag'
					value={values.tag}
					name='tag'
				/>
			</div>
			<textarea
				ref={postRef}
				onChange={onChange}
				name='post'
				value={values.post}
				id=''
				cols='30'
				rows='10'
				className={classNames(styles['input'], {
					[styles['invalid']]: !isValid.post,
				})}
			></textarea>
			<Button>Сохранить</Button>
		</form>
	)
}

export default JournalForm
