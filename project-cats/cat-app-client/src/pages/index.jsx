import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import styled from 'styled-components'
import LoginForm from '../components/index/LoginForm'

const index = () => {
	return (
		<>
			<h2>index</h2>
			<div>
				<LoginForm />
			</div>
			<div>
				<Link to="/user/signup">회원가입</Link>
			</div>

			<div>
				<Link to="/user/main">메인화면</Link>
			</div>
		</>
	)
}

export default index
