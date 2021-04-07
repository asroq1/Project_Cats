import React, { useRef } from 'react'
import { useState } from 'react'
import { regExpEmail, regExpPassword } from '../../common/regExp'
import { useDispatch } from 'react-redux'
import { signUpRequest } from '../../reducers/user'
const SignUpForm = props => {
	const dispatch = useDispatch()
	const pwdRef = useRef()
	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [pwdCheck, setPwdCheck] = useState('')
	const [name, setName] = useState('')
	const [nick, setNick] = useState('')
	const [passwordError, setPasswordError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const password = regExpPassword(pwd)

	const onChangeEmail = e => {
		setEmail(e.currentTarget.value)
		const mail = regExpEmail(email)
		if (!mail) {
			setEmailError(true)
		} else {
			setEmailError(false)
		}
	}
	const onChagePassword = e => {
		setPwd(e.currentTarget.value)
	}
	const onChangePasswordChk = e => {
		setPwdCheck(e.currentTarget.value)
	}
	const onChangeName = e => {
		setName(e.currentTarget.value)
	}
	const onChangeNick = e => {
		setNick(e.currentTarget.value)
	}
	const onSubmit = e => {
		e.preventDefault()
		if (password && !emailError && pwd !== pwdCheck) {
			setPasswordError(true)
			pwdRef.current.focus()
		} else {
			setPasswordError(false)
			const body = {
				email,
				pwd,
				name,
				nick,
			}
			dispatch(signUpRequest(body))
		}
	}
	return (
		<>
			<form onSubmit={onSubmit}>
				<label htmlFor="name">이메일</label>
				<input
					type="text"
					name="email"
					value={email}
					onChange={onChangeEmail}
					maxLength="50"
					required
				/>
				{emailError && <div>옳지않은 이메일 양식입니다.</div>}
				<label htmlFor="pwd">비밀번호</label>
				<input
					ref={pwdRef}
					type="password"
					name="pwd"
					value={pwd}
					onChange={onChagePassword}
					maxLength="20"
					placeholder=""
					required
				/>
				<label htmlFor="pwdCheck">비밀번호 확인</label>
				<input
					type="password"
					name="pwdCheck"
					maxLength="20"
					value={pwdCheck}
					onChange={onChangePasswordChk}
					required
				/>
				{passwordError && <h2>비밀번호가 일치하지 않습니다.</h2>}
				<label htmlFor="name">이름</label>
				<input
					type="text"
					name="name"
					value={name}
					onChange={onChangeName}
					maxLength="20"
					required
				/>
				<label htmlFor="nick">닉네임</label>
				<input
					type="text"
					name="nick"
					value={nick}
					onChange={onChangeNick}
					maxLength="15"
					required
				/>
				<button type="submit">회원가입</button>
			</form>
		</>
	)
}

export default SignUpForm
