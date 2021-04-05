import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import {ADD_CAT} from '../../reducers/cat'


//코드 너무 장황해지니	
//필요 딱히 없는 건 나중에 지워주기
//짧은 건 useMemo로 넣어줌
const GeneralWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items:center;
	padding: 10px;
	`;

const PhotoContainer = styled.div`
	width: 150px;
	height: 150px;
	margin: auto;
	border: 1px solid green;
	`;

const Main = ({cat}) => {
	const dispatch = useDispatch();

	const onClick = useCallback(() => {
		dispatch({
			type: ADD_CAT,
		})
	}, []);

	const colStyle = useMemo(() => ({'max-width': '150px', flex: 'auto'}), []);
	const menuStyle = useMemo(() => ({height: '2rem', display: 'flex'}), []);
	const paddingStyle = useMemo(() => ({'margin-top': '1em',padding: '0.5em'}), []);

	return (
		<>
			<div style={menuStyle}>
				{/* <CatWrapper><span>후추</span></CatWrapper>
				<CatWrapper><span>+</span></CatWrapper>
				<CatWrapper><span>#</span></CatWrapper> */}
				<div style={colStyle}>{cat[0].name}</div>
				<div style={colStyle}>+</div>
				<div style={colStyle}>#</div>
			</div>
			{/* <CatChoose /> <Setting Icon /> */}

			<div>
			<PhotoContainer>
				<img src="" alt="cat_image"></img>
			</PhotoContainer>
			</div>
			
			<GeneralWrapper>
				<div>{cat[0].gender}</div>
				<div>{cat[0].age}</div>

				<div>{cat[0].Record.cdt}</div>
				<div>{cat[0].Record.wgt}</div>
			</GeneralWrapper>

			<GeneralWrapper>
			<Link href="/cat/addWeight" ><button style={paddingStyle}>Weight Record</button></Link>
			
			<Link href="cat/record"><button style={paddingStyle}>See Previous Data</button></Link>
			
			<button style={paddingStyle} onClick = {onClick}>DummyButton</button>
			
			</GeneralWrapper>
		</>
	)
}

export default Main
