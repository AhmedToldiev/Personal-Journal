import styles from './JournalForm.module.css'
import { useEffect, useReducer, useRef } from 'react'
import Button from '../Button/Button'
import classNames from 'classnames'
import { formReducer, INITIAL_STATE } from './JournalForm.state'
import Input from '../Input/Input'

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
	const { isValid, isFormReadyToSubmit, values } = formState
	const titleRef = useRef()
	const dateRef = useRef()
	const postRef = useRef()

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
		}
	}, [isFormReadyToSubmit, values, onSubmit])

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

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input
					type='text'
					ref={titleRef}
					onChange={onChange}
					value={values.title}
					name='title'
					isValid={!isValid.title}
				/>
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
					value={values.date}
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

			<Button text='Сохранить' />
		</form>
	)
}

export default JournalForm
