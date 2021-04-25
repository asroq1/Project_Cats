import React, { useState } from 'react';

import {Link} from 'react-router-dom';

import styled from 'styled-components';

import palette from '../../styles/palette';


const Overlay = styled.div`
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 5000;
    padding: 3rem;
    color: ${palette.beige};
    background-color: ${palette.navy};
    display: flex;
    
    flex-direction: column;
    
    text-align: center;
    
`;


const Header = styled.div`
h1 {
    font-size: 1.25rem;
    text-align: left;
}
h3 {
    font-size: 1.25rem;
    text-align: right;
}
`;

const MenuWrapper = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding-top: 2rem;
    
    padding-bottom: 2rem;

    
    border-top: 1.5px solid ${palette.beige};
    font-size: 2rem;

    line-height: 2;
`;




const NightModeWrapper = styled.div`

    font-size: 1.5rem;
    text-align:right;


    right: 0;
    padding: 2rem;
    
    border-top: 1.5px solid ${palette.beige};
    margin-top: auto;
`; 
    

const ModalMenu = ({userNickname, onClose}) => {

    //나중에 redux 상태 만들어줄 것
    const [isNightMode, setNightMode] = useState(false);
    
    return (
        
        <Overlay>
            
                
                <Header>

                <h3><i onClick={onClose}className ="fa fa-times"></i></h3>
                <h1> {userNickname} 집사님, 안녕하세요!</h1>

            
            
            </Header>
            
            <MenuWrapper>
                
                <Link to = "/user/main"onClick = {onClose}>
                <h2>HOME</h2>
                </Link>
                <Link to ="/post/list"onClick = {onClose}><h2>커뮤니티</h2></Link>
            
                <Link to ="/user/settings"onClick = {onClose}><h2>집사설정</h2></Link>
                <Link to ="/user/settings"onClick = {onClose}><h2>문의하기</h2></Link>
                <Link to ="/user/settings"onClick = {onClose}><h2>로그아웃</h2></Link>
            </MenuWrapper>

            <NightModeWrapper>
            {!isNightMode? (<span> 야간 모드</span>) : (<span>주간 모드</span>) } 
                <i className = "fa fa-star"></i>
            </NightModeWrapper>
        </Overlay>
    )
}

export default ModalMenu;