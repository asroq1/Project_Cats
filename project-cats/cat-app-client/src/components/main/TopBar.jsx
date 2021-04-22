import React, { useMemo, useCallback, useEffect } from 'react';
import { useHistory, BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../styles/palette';

import 'font-awesome/css/font-awesome.min.css';

const Global = styled.div`
    max-width: 1200px;
    width: 100vw;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width: 75vw;
    }
`;

const EachCol = styled.div`
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 1rem;
    flex: auto;
    background-color: ${(props) => (props.active ? 'white' : palette.navy)};
    &: hover {
        background-color: ${(props) => (props.active ? 'white' : 'black')};
    }
    &:not(:last-child) {
        max-width: 150px;
        justify-content: center;
        color: ${(props) => (props.active ? 'black' : palette.beige)};
        border-radius: 5px 5px 0 0;
        border: 1px solid ${(props) => (props.active ? 'lightgray' : 'black')};
        border-bottom: ${(props) =>
            props.active ? 'none' : '1px solid black'};
        cursor: pointer;
    }
    &:last-child {
        font-size: 2rem;
        text-align: right;
        justify-content: flex-end;
        border: 1px solid white;
        border-bottom: 1px solid black;
        background: white;
    }
    .fa-cog {
        color: ${palette.navy};
    }
`;

const TopBar = ({ cat, currentIndex, onSelect }) => {
    const menuStyle = useMemo(() => ({ height: '2rem', display: 'flex' }), []);
    const fillerCol = useMemo(
        () => ({
            display: 'inline-block',
            flex: 1,
            borderBottom: '1px solid black',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
            fontSize: '1rem',
        }),
        []
    );

    const history = useHistory();
    const gotoAddCat = useCallback(() => {
        history.push('/cat/add');
    });

    return (
        <Global>
            <div style={menuStyle}>
                {cat.map((el) => (
                    <EachCol
                        key={el.id}
                        active={currentIndex === el.id}
                        onClick={() => onSelect(el.id)}
                        id={el.id}
                    >
                        {el.name}
                    </EachCol>
                ))}
                <EachCol onClick={gotoAddCat}>
                    <i className="fa fa-plus"></i>
                </EachCol>

                <EachCol>
                    <Link to="/user/settings">
                        <i className="fa fa-cog"></i>
                    </Link>
                </EachCol>
            </div>
        </Global>
    );
};

export default TopBar;
