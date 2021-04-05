import React from 'react'
import {useSelector} from 'react-redux';
import MainComponent from '../components/main/Main';

const Main = () => {
	const {cat} = useSelector((state) => state.cat);
	return (
		<>
			<h2>메인 페이지</h2>
			<MainComponent cat={cat}/>
		</>
	)
}

export default Main