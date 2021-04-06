import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginRequestAction } from '../../reducers/user'

const SignUpForm = props => {
	const dispatch = useDispatch()

	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [pwdCheck, setPwdCheck] = useState('')
	const [name, setName] = useState('')
	const [passwordError, setPasswordError] = useState(false)
	const onChangeEmail = e => {
		// let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
		setEmail(e.currentTarget.value)
		console.log(email)
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
	const onSubmit = e => {
		e.preventDefault()
		if (pwd !== pwdCheck) {
			setPasswordError(true)
			return false
		} else {
			setPasswordError(false)
			console.log({
				email,
				pwd,
				name,
			})
			return true
		}
		//dispatch(loginRequestAction(data));
	}
	const data = {
		email,
		pwd,
		name,
	}

	// dispatch(loginRequestAction(data)).then(response => {
	// 	//redux로 가져올 경우 payload
	// 	if (response.data.success) {
	// 		props.history.push('/')
	// 	} else {
	// 		alert(response.data.err)
	// 	}
	// })
	return (
		<>
			<form onSubmit={onSubmit}>
				<label htmlFor="name">이메일</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={onChangeEmail}
					maxLength="50"
					required
				/>
				<label htmlFor="pwd">비밀번호</label>
				<input
					type="password"
					name="pwd"
					value={pwd}
					onChange={onChagePassword}
					maxLength="20"
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
