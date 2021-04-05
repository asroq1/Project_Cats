import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const index = () => {
	return (
		<>
			<h2>index</h2>
			<Link to="/user/signup">회원가입</Link>
		</>
	)
}

export default index
