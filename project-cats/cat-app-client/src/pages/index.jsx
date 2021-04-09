import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/index/LoginForm'
import styles from '../styles/index.module.css'
import KakaoLogin from '../components/socialButton/KakaoLogin'
const index = () => {
	return (
		<div className={styles.index__background}>
			<div className={styles.index__wrapper}>
				<div className={styles.logo__wrapper}>
					<img src="/image/cats.png" alt="logo" className={styles.logo} />
				</div>
				<article>
					<LoginForm />
					<div className={styles.or__line}>또는</div>
					<Link to="/user/signup" className={styles.signup}>
						회원가입
					</Link>
				</article>
			</div>
		</div>
	)
}

export default index
