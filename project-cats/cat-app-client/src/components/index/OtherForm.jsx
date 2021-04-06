import React from 'react'
import { Link } from 'react-router-dom'

const OtherForm = () => {
	return (
		<>
			<div>또는</div>
			<button>카카오톡으로 회원가입</button>
			<button>네이버로 회원가입</button>
			<Link to="/">로그인 하러가기</Link>
		</>
	)
}

export default OtherForm
