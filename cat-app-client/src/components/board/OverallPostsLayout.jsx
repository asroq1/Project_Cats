import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import ModalMenu from '../modal/ModalMenu';


const BackgroundColor = styled.div` 
    background-color:${({theme})=>theme.beige};
`;

const Header = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    position: sticky;
    top: 0; 
    z-index: 1;
    font-size: 1rem;
    background-color: ${({theme}) => theme.green};
    .plus {
        
        
        
        
        flex-direction: row-reverse;
        
    }
    
    .plus i {
        transition: 0.5s;
        cursor: pointer;
    }
    .plus i:hover{
        
        transform: rotate(-20deg);
        color:${({theme})=>theme.navy}
    }
}`;

const NavCol = styled.div`
    padding: 1rem;
    display: flex;
    font-size: 1.5rem;
    color: white;
    flex: 1;
    
    a {
        color: ${({theme}) => theme.beige};
    }
    
    a:hover {
        color:${({theme}) => theme.navy};
    }
`;

const Footer = styled.div`
    width: 100%;
    height: 50px;
    background-color: ${({theme}) => theme.green};
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
        
        <BackgroundColor>
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
        </BackgroundColor>
    );
};

OverallPostsLayout.propTypes = {
    children: PropTypes.object.isRequired,
}

export default OverallPostsLayout;