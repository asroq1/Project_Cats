import React, { useRef } from 'react'
import { useState } from 'react'
import { regExpEmail, regExpPassword } from '../../common/auth'
import { useDispatch } from 'react-redux'
// import { signUpReqAction } from '../../reducers/users'
import { signUpRequest } from '../../reducers/user'
const SignUpForm = props => {
	const dispatch = useDispatch()
	const pwdRef = useRef()
	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [pwdCheck, setPwdCheck] = useState('')
	const [name, setName] = useState('')
	const [passwordError, setPasswordError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const data = {
		email,
		pwd,
		name,
	}
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
		const password = regExpPassword(pwd)
		if (!password) {
			console.log('비밀번호 양식이 맞습니다')
		}
	}
	const onChangePasswordChk = e => {
		setPwdCheck(e.currentTarget.value)
	}
	const onChangeName = e => {
		setName(e.currentTarget.value)
	}
	const onSubmit = e => {
		e.preventDefault()
		if (!emailError && pwd !== pwdCheck) {
			setPasswordError(true)
			pwdRef.current.focus()
		} else {
			setPasswordError(false)
			const data = {
				email: email,
				pwd: pwd,
				name: name,
			}
			dispatch(signUpRequest(data)).then(response => {
				if (response.payload.success) {
					props.history.push('/')
				} else {
					alert('Error ')
				}
			})
		}
		dispatch(signUpRequest(data))
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
				<button type="submit">회원가입</button>
			</form>
		</>
	)
}

export default SignUpForm
