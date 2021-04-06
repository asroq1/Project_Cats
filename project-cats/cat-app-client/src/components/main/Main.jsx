import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { BrowserRouter as Router, Link } from 'react-router-dom'

import TopBar from './TopBar'

//코드 너무 장황해지니
//필요 딱히 없는 건 나중에 지워주기
//짧은 건 useMemo로 넣어줌
const GeneralWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
`

const PhotoContainer = styled.img`
	width: 150px;
	height: 150px;
	margin: auto;
	border: 1px solid green;
	object-fit: cover;
`

const Main = ({ cat, current_index }) => {
	console.log(cat)
	console.log(current_index)
	const dispatch = useDispatch()

	const colStyle = useMemo(
		() => ({
			'max-width': '150px',
			flex: 'auto',
			border: '1px solid lightgreen',
		}),
		[]
	)
	const menuStyle = useMemo(() => ({ height: '2rem', display: 'flex' }), [])
	const paddingStyle = useMemo(
		() => ({ 'margin-top': '1em', padding: '0.5em' }),
		[]
	)
	const imgStyle = useMemo(() => ({ 'object-fit': 'cover' }), [])

	return (
		<>
			<TopBar cat={cat} />
			{/* <CatChoose /> <Setting Icon /> */}

			<GeneralWrapper>
				<PhotoContainer
					src={cat[current_index].photo}
					alt="cat_image"
				></PhotoContainer>
			</GeneralWrapper>

			<GeneralWrapper>
				<div>{cat[current_index].gender}</div>
				<div>{cat[current_index].age}</div>

				<div>{cat[current_index].Record.cdt}</div>
				<div>{cat[current_index].Record.wgt}</div>
			</GeneralWrapper>

			<GeneralWrapper>
				<Link
					to={{
						pathname: '/cat/addWeight',
						cat_id: current_index,
					}}
				>
					<button style={paddingStyle}>Weight Record</button>
				</Link>

				<Link
					to={{
						pathname: '/cat/record',
						cat_id: current_index,
					}}
				>
					<button style={paddingStyle}>See Previous Data</button>
				</Link>

				<Link to="/">Back to Home</Link>
			</GeneralWrapper>
		</>
	)
}

export default Main
