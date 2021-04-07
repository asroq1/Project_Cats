import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/index/LoginForm'
import styles from '../styles/index.module.css'

const index = () => {
	return (
		<div className={styles.index__wrapper}>
			<article>
				<img src="/image/cats.png" alt="logo" className={styles.logo} />
			</article>
			<article>
				<LoginForm />
				<Link to="/user/signup" className={styles.test}>
					회원가입
				</Link>
			</article>
		</div>
	)
}

export default index
