import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const index = () => {
	return (
		<>
			<h2>index</h2>
			<Link to="/user/signup">회원가입</Link>
			
			<Link to="/user/main">메인화면</Link>

			<Link to="/cat/add">고양이 추가</Link>

		</>
	)
}

export default index
