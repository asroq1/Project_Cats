import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpRequest } from '../../reducers/user';
import styles from '../../styles/signUpForm.module.css';
const SocialSignup = () => {
    const dispatch = useDispatch();
    const [nick, setNick] = useState('');
    const onChangeNick = (e) => {
        setNick(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const body = {
            nick,
        };
        dispatch(signUpRequest(body));
    };

    return (
        <div className={styles.social__container}>
            <form onSubmit={onSubmit} className={styles.signup__form}>
                <label htmlFor="nick">닉네임</label>
                <input
                    type="text"
                    name="nick"
                    value={nick}
                    onChange={onChangeNick}
                    placeholder="&#xf2c1;"
                    maxLength="15"
                    required
                />
                <button type="submit" className={styles.submit__btn}>
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default SocialSignup;
