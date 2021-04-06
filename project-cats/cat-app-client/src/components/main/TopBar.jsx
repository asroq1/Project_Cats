import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { changeCat } from '../../reducers/cat'

const TopBar = ({ cat }) => {
	const colStyle = useMemo(
		() => ({
			'max-width': '150px',
			flex: 'auto',
			border: '1px solid lightgreen',
		}),
		[]
	)
	const menuStyle = useMemo(() => ({ height: '2rem', display: 'flex' }), [])
	const dispatch = useDispatch()

	const onClick = data => {
		dispatch(changeCat(data))
	}

	return (
		<>
			<div style={menuStyle}>
				{cat.map(el => (
					<div
						style={colStyle}
						key={el.cat_id}
						onClick={() => onClick(el.cat_id)}
						id={el.cat_id}
					>
						{el.name}
					</div>
				))}
				{/* {cat.map((el) => <button key= {el.cat_id} onCli	ck={onClickName}>{el.name}</button>)} */}
				<div style={colStyle}>+</div>
				<div style={colStyle}>#</div>
			</div>
		</>
	)
}

export default TopBar
