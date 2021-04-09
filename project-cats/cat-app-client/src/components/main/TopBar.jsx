import React, { useMemo, useCallback } from 'react';
import { useHistory, BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

const EachCol = styled.div`
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    max-width: 150px;
    flex: auto;
    border: 1px solid darkblue;
    background: lightblue;
    &: hover {
        color: gray;
    }
    // & + & {
    // 	margin-left: 1rem;
    // }
    &:last-child {
        margin-left: auto;
        background: lightpink;
    }
`;

const TopBar = ({ cat, current_index, onSelect }) => {
    const menuStyle = useMemo(() => ({ height: '2rem', display: 'flex' }), []);
	const history = useHistory();

	const gotoAddCat = useCallback(()=>{

		history.push('/cat/add');
	})
    return (
        <>
            <div style={menuStyle}>
                {cat.map((el) => (
                    <EachCol
                        key={el.cat_id}
                        active={current_index === el.cat_id}
                        onClick={() => onSelect(el.cat_id)}
                        id={el.cat_id}
                    >
                        {el.name}
                    </EachCol>
                ))}
                <EachCol onClick={gotoAddCat}>+</EachCol>

                <EachCol>#</EachCol>
            </div>
        </>
    );
};

export default TopBar;
