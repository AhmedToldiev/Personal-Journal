import { memo } from 'react'
import styles from './Logo.module.css'

function Logo({ image }) {

	return <img className={styles.logo} src={image} alt='Логотип журнала' />
}

export default memo(Logo) 
