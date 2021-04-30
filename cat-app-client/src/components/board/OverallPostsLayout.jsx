import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import ModalMenu from '../modal/ModalMenu';

const Header = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    position: sticky;
    top: 0; 
    z-index: 1;
    font-size: 1rem;
    background-color: ${({theme}) => theme.palette.green};
    .plus {
        flex-direction: row-reverse;
        cursor: pointer;
    }
    .plus:hover{
        color:${({theme})=>theme.palette.navy}
    }
}`;

const NavCol = styled.div`
    padding: 1rem;
    display: flex;
    font-size: 1.5rem;
    color: white;
    flex: 1;
    a {
        color: ${({theme}) => theme.palette.beige};
    }
    a:hover {
        color:${({theme}) => theme.palette.navy};
    }
`;

const Footer = styled.div`
    width: 100%;
    height: 50px;
    background-color: ${({theme}) => theme.palette.green};
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
        <>
            {showModalMenu && (
                        <ModalMenu
                            onClose={onModalClose}
                        />
                    )}
            <Header>
                <NavCol>커뮤니티</NavCol>
                <NavCol className="plus">
                    <i onClick={onModalMenu} className="fa fa-bars"></i>
                    
                </NavCol>
            </Header>

            {children}

            <Footer>
                {/* <NavCol className="center">
                    <i className="fa fa-search"></i>
                </NavCol> */}
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
        </>
    );
};

export default OverallPostsLayout;