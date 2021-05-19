import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LOG_OUT_REQUEST } from '../../reducers/user';
import Toggle from '../toggle/Toggle';
import { useDarkMode } from '../../hooks/useDarkMode ';
// import { lightTheme, darkTheme } from '../../styles/globalStyles';

const BackgroundWrapper = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5000;
    background-color: none;
`;

const Overlay = styled.div`
    width: 100%;
    max-width: ${({ theme }) => theme.width.mobile};
    box-sizing: border-box;
    height: 100vh;
    margin: 0 auto;
    padding: 3rem;
    color: ${({ theme })=>theme.textlight};
    background-color: ${({ theme }) => theme.navy};
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const Header = styled.div`
    i{
        padding-right: 1rem;
    }
    h1 {
        font-size: 1.25rem;
        text-align: left;

        line-height: 1.75;
    }
    h3 {
        font-size: 1.75rem;
        cursor: pointer;
        margin-bottom: 1rem;
        text-align: right;
    }
`;

// const SvgContainer = styled.img`
//     height: 1.5rem;
//     width: 1.5rem;

//     filter: invert(100%);
// `;

const MenuWrapper = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;

    border-top: 1.5px solid ${({ theme }) => theme.beige};
    font-size: 2rem;
    line-height: 2;
    cursor: pointer;

    a {
        text-decoration: none;
    }
    h2 {
        color: ${({ theme })=>theme.textlight};
    }

    h2:hover, h2:focus {
        color: ${({ theme }) => theme.cOrange};
    }
`;

const NightModeWrapper = styled.div`
    font-size: 1.5rem;
    text-align: right;
    right: 0;
    padding: 2rem;
    border-top: 1.5px solid ${({ theme }) => theme.beige};
    margin-top: auto;
    cursor: pointer;
`;

// const NightWrapper = styled.button`
//     background: ${({ theme }) => theme.light.mainBackground};
// `;

const ModalMenu = ({ onClose }) => {
    const { me } = useSelector((state) => state.user);
    const [theme, toggleTheme] = useDarkMode();
    //const themeMode = theme === 'light' ? lightTheme : darkTheme;

    // const toggleNightMode = useCallback(() => {
    //     setNightMode(!isNightMode);
    // });

    const dispatch = useDispatch();

    const onLogOut = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    const history = useHistory();
    useEffect(() => {
        if (!localStorage.token) {
            
            alert('로그인 먼저 해주세요');
            history.push('/');
        }
    }, [me]);

    return (
        <BackgroundWrapper>
            <Overlay>
                <Header>
                    <h3>
                        <i onClick={onClose} className="fa fa-times"></i>
                    </h3>
                    <h1>
                        {' '}
                        {/* <SvgContainer src =  "/image/icon/elegant-party.svg" alt="Hi"/>  */}
                        <i className="fa fa-paw"></i>
                            {me&&me.nickname}{' '}
                            집사님, <br />
                            안녕하세요!
                    </h1>
                </Header>

                <MenuWrapper>
                    <Link to="/user/main" onClick={onClose}>
                        <h2>HOME</h2>
                    </Link>
                    <Link to="/post/list" onClick={onClose}>
                        <h2>커뮤니티</h2>
                    </Link>
                    {/* <Link to="/user/settings" onClick={onClose}>
                        <h2>집사설정</h2>
                    </Link> */}
                    <Link to="/user/settings" onClick={onClose}>
                        <h2>문의하기</h2>
                    </Link>
                    <Link to="#" onClick={onClose}>
                        <h2>
                            {' '}
                            <span onClick={onLogOut}>로그아웃</span>
                        </h2>
                    </Link>
                </MenuWrapper>

                <NightModeWrapper>
                    {/* {!isNightMode ? (
                        <span onClick={toggleNightMode}>
                            야간 모드 <i className="fa fa-toggle-off"></i>
                        </span>
                    ) : (
                        <span onClick={toggleNightMode}>
                            야간 모드 <i className="fa fa-toggle-on"></i>
                        </span>
                    )} */}
                    <Toggle theme={theme} toggleTheme={toggleTheme} />
                </NightModeWrapper>
            </Overlay>
        </BackgroundWrapper>
    );
};

ModalMenu.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ModalMenu;
