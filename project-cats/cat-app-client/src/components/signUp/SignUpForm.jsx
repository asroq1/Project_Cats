import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';

import {loginRequestAction} from '../../reducers/user'

const SignUpForm = props => {
	const dispatch = useDispatch();
	
	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [name, setName] = useState('')

	const emailHandler = e => {
		console.log(email)
		setEmail(e.currentTarget.value)
	}
	const pwdHandler = e => {
		setPwd(e.currentTarget.value)
	}
	const nameHandler = e => {
		setName(e.currentTarget.value)
	}
	const submitHandler = e => {
		e.preventDefault()
		
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
			<form onSubmit={submitHandler}>
				<label htmlFor="name">이메일</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={emailHandler}
				/>
				<label htmlFor="pwd">비밀번호</label>
				<input type="password" name="pwd" value={pwd} onChange={pwdHandler} />
				<label htmlFor="pwdCheck">비밀번호 확인</label>
				<input type="password" name="pwdCheck" />
				<label htmlFor="name">이름</label>
				<input type="text" name="name" value={name} onChange={nameHandler} />
				<button type="submit">회원가입</button>
			</form>
		</>
	)
}

export default SignUpForm
