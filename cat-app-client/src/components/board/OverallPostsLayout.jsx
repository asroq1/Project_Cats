import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import palette from '../../styles/palette';
import styled from 'styled-components';

import ModalMenu from '../modal/ModalMenu';

const Global = styled.div`
    background-color: ${palette.beige};
    max-width: 1200px;
    width: 100vw;
    height: 100%;
    margin: 0 auto;
    h2 {
        font-size: 2rem;
        text-align: center;
    }
    label {
        font-weight: bold;
    }
    @media screen and (max-width: 768px) {
        width: 100vw;
    }
`;

const Header = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    position: sticky;
    top: 0;
    
    z-index: 1;
    font-size: 1rem;
    background-color: ${palette.green};
    .plus {
        flex-direction: row-reverse;
    }
`;

const NavCol = styled.div`
    padding: 1rem;
    display: flex;
    font-size: 1.5rem;
    color: white;
    flex: 1;
    a {
        text-decoration: none;
        color: white;
    }
    a:hover {
        color: ${palette.navy};
    }
`;

const Footer = styled.div`
    width: 100%;
    height: 50px;
    background-color: ${palette.green};
    position: sticky;
    bottom: 0;
    display: flex;
    .center {
        justify-content: center;
    }
`;

const OverallPostsLayout = ({ children }) => {
    const [showModalMenu, setShowModalMenu] = useState(false);
    const onModalMenu = useCallback(() => {
        setShowModalMenu(true);
    }, []);
    const onModalClose = useCallback(() => {
        setShowModalMenu(false);
    }, []);

    return (
        <Global>
            <Header>
                <NavCol>커뮤니티</NavCol>
                <NavCol className="plus">
                    <i onClick={onModalMenu} className="fa fa-bars"></i>
                    {showModalMenu && (
                        <ModalMenu
                            userNickname={'어쩌구 저쩌궁'}
                            onClose={onModalClose}
                        />
                    )}
                </NavCol>
            </Header>

            {children}

            <Footer>
                <NavCol className="center">
                    <i className="fa fa-search"></i>
                </NavCol>
                <NavCol className="center">
                    <Link to="/post/write">
                        <i className="fa fa-plus-square"></i>
                    </Link>
                </NavCol>
                <NavCol className="center">
                    <Link to="/post/list">
                        <i className="fa fa-paw"></i>
                    </Link>
                </NavCol>
            </Footer>
        </Global>
    );
};

export default OverallPostsLayout;