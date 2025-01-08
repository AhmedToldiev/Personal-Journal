import styles from './JournalForm.module.css'
import { useEffect, useReducer } from 'react'
import Button from '../Button/Button'
import classNames from 'classnames'
import { formReducer, INITIAL_STATE } from './JournalForm.state'

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
	const { isValid, isFormReadyToSubmit, values } = formState
	useEffect(() => {
		let timerId
		if (!isValid.title || !isValid.post || !isValid.date) {
			timerId = setTimeout(() => {
				console.log('Очистка состояния')
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
	}, [isFormReadyToSubmit])

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
				<input
					type='text'
					name='title'
					onChange={onChange}
					value={values.title}
					className={classNames(styles['input-title'], {
						[styles['invalid']]: !isValid.title,
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
					onChange={onChange}
					name='date'
					value={values.date}
					id='date'
					className={classNames(styles['input'], {
						[styles['invalid']]: !isValid.date,
					})}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src='/folder.svg' alt='Иконка папки' />
					<span>Метки</span>
				</label>
				<input
					type='text'
					id='tag'
					onChange={onChange}
					name='tag'
					value={values.tag}
					className={styles['input']}
				/>
			</div>

			<textarea
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
