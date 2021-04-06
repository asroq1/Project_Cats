import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginRequestAction } from '../../reducers/user'
import { regExpEmail, regExpPassword } from '../../common/auth'
const LoginForm = props => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [emailError, setEmailError] = useState(false)

	const onChangeEmail = e => {
		setEmail(e.currentTarget.value)
	}
	const onChangePwd = e => {
		setPwd(e.currentTarget.value)
		const mail = regExpEmail(email)
		if (!mail) {
			setEmailError(true)
		} else {
			setEmailError(false)
		}
	}
	const onSubmit = e => {
		{
			!emailError && e.preventDefault()
			const data = {
				email,
				pwd,
			}
			dispatch(loginRequestAction(data)).then(response => {
				if (response.payload.success) {
					props.history.push('/user/main')
				} else {
					alert('Error')
				}
			})
		}
	}

	return (
		<>
			<h2>로그인</h2>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="이메일"
					name="email"
					value={email}
					onChange={onChangeEmail}
					maxLength="50"
					required
				/>
				{emailError && <h2>이메일이 아니에용</h2>}
				<input
					type="password"
					placeholder="비밀번호"
					name="pwd"
					value={pwd}
					onChange={onChangePwd}
					maxLength="20"
					required
				/>
				<button>로그인</button>
			</form>
			<button>카카오로 로그인하기</button>
			<button>네이버로 로그인하기</button>
			<h2>또는</h2>
		</>
	)
}

export default LoginForm
