import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/signUp/SignUpForm';
import styles from '../styles/signUp.module.css';
const signUp = () => {
    return (
        <div className={styles.signup__background}>
            <div className={styles.signup__wrapper}>
                <div className={styles.title__wrapper}>
                    <h2 className={styles.title}>회원가입</h2>
                </div>
                <article>
                    <SignUpForm />
                    <div className={styles.or__line}>또는</div>
                    <Link to="/" className={styles.login}>
                        로그인 하러가기
                    </Link>
                </article>
            </div>
        </div>
    );
};

export default signUp;
