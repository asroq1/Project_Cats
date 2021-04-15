import React, { useRef } from 'react';
import { useState } from 'react';
import { regExpEmail, regExpPassword } from '../../common/regExp';
import { useDispatch } from 'react-redux';
import { signUpRequest } from '../../reducers/user';
import styles from '../../styles/signUpForm.module.css';
import 'font-awesome/css/font-awesome.min.css';

const SignUpForm = () => {
    const dispatch = useDispatch();
    const pwdRef = useRef();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');
    const [nickname, setNickName] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const password = regExpPassword(pwd);

    const onChangeEmail = (e) => {
        setEmail(e.currentTarget.value);
        const mail = regExpEmail(email);
        if (!mail) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };
    const onChagePassword = (e) => {
        setPwd(e.currentTarget.value);
    };
    const onChangePasswordChk = (e) => {
        setPwdCheck(e.currentTarget.value);
    };

    const onChangeNick = (e) => {
        setNickName(e.currentTarget.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (password && !emailError && pwd !== pwdCheck) {
            setPasswordError(true);
            pwdRef.current.focus();
        } else {
            setPasswordError(false);
            const body = {
                email,
                pwd,
                nickname,
            };
            dispatch(signUpRequest(body));
        }
    };
    return (
        <>
            <form onSubmit={onSubmit} className={styles.signup__form}>
                <label htmlFor="name">이메일</label>
                <input
                    className={styles.font}
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    maxLength="50"
                    placeholder="&#xf0e0;"
                    required
                />
                {emailError && (
                    <div className={styles.email__message}>
                        옳지않은 이메일 양식입니다.
                    </div>
                )}
                <label htmlFor="pwd">비밀번호</label>
                <input
                    ref={pwdRef}
                    type="password"
                    name="pwd"
                    value={pwd}
                    onChange={onChagePassword}
                    maxLength="20"
                    placeholder="&#xf09c;"
                    required
                />
                <label htmlFor="pwdCheck">비밀번호 확인</label>
                <input
                    type="password"
                    name="pwdCheck"
                    maxLength="20"
                    value={pwdCheck}
                    onChange={onChangePasswordChk}
                    placeholder="&#xf09c;"
                    required
                />
                {passwordError && <h2>비밀번호가 일치하지 않습니다.</h2>}
                <label htmlFor="nick">닉네임</label>
                <input
                    type="text"
                    name="nick"
                    value={nickname}
                    onChange={onChangeNick}
                    placeholder="&#xf2c1;"
                    maxLength="15"
                    required
                />
                <button type="submit" className={styles.submit__btn}>
                    회원가입
                </button>
            </form>
        </>
    );
};

export default SignUpForm;
