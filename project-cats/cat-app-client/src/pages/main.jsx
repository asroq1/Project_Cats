import React from 'react'
import {useSelector} from 'react-redux';
import MainComponent from '../components/main/Main';

const Main = () => {
	const {cat, current_index} = useSelector((state) => state.cat);
	return (
		<>
			<h2>메인 페이지</h2>
			<MainComponent cat={cat} current_index={current_index}/>
		</>
	)
}

export default Main