import React, { useCallback, useState } from 'react';

import { Link } from 'react-router-dom';

import palette from '../../styles/palette';
import styled from 'styled-components';

const Overlay = styled.div`
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    z-index: 5000;
    padding: 3rem;
    color: ${({theme})=>theme.palette.beige};
    background-color: ${palette.navy};
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const Header = styled.div`
    h1 {
        font-size: 1.25rem;
        text-align: left;


        line-height: 1.25;
    }
    h3 {
        font-size: 1.75rem;
        cursor:pointer;
        margin-bottom:1rem;
        text-align: right;
    }
`;

const MenuWrapper = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-top: 1.5px solid ${({theme})=>theme.palette.beige};
    font-size: 2rem;
    line-height: 2;
    cursor: pointer;

    h2:hover{
        color: ${({theme})=>theme.palette.orange};
    }

`;

const NightModeWrapper = styled.div`
    font-size: 1.5rem;
    text-align: right;
    right: 0;
    padding: 2rem;
    border-top: 1.5px solid ${({theme})=>theme.palette.beige};
    margin-top: auto;

    cursor: pointer;
`;

const ModalMenu = ({ userNickname, onClose }) => {
    //나중에 redux 상태 만들어줄 것
    const [isNightMode, setNightMode] = useState(false);

    const toggleNightMode = useCallback(() => {
        setNightMode(!isNightMode)
    })
    
    return (
        <Overlay>
            <Header>
                <h3>
                    <i onClick={onClose} className="fa fa-times"></i>
                </h3>
                <h1> <i className="fa fa-black-tie"></i> {userNickname} 집사님, <br/>안녕하세요!</h1>
            </Header>

            <MenuWrapper>
                <Link to="/user/main" onClick={onClose}>
                    <h2>HOME</h2>
                </Link>
                <Link to="/post/list" onClick={onClose}>
                    <h2>커뮤니티</h2>
                </Link>
                <Link to="/user/settings" onClick={onClose}>
                    <h2>집사설정</h2>
                </Link>
                <Link to="/user/settings" onClick={onClose}>
                    <h2>문의하기</h2>
                </Link>
                <Link to="/user/settings" onClick={onClose}>
                    <h2>로그아웃</h2>
                </Link>
            </MenuWrapper>

            <NightModeWrapper>
                {!isNightMode ? (
                    <span onClick={toggleNightMode}> 야간 모드 <i className="fa fa-toggle-off"></i></span>
                ) : (
                    <span onClick={toggleNightMode}>야간 모드 <i className="fa fa-toggle-on"></i></span>
                )}
            </NightModeWrapper>
        </Overlay>
    );
};

export default ModalMenu;