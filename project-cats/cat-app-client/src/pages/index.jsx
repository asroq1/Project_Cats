import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../components/index/LoginForm';
import styles from '../styles/index.module.css';
import palette from '../styles/palette';

const IndexContainer = styled.div`
    display: grid;
    max-width: 1200px;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    background-color: ${palette.beige};
`;

const LogoWrapper = styled.div`
    display: grid;
    align-items: end;
`;

const SignupButton = styled.div`
    width: 30%;
    margin: 0 auto;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: ${palette.navy};
    border-radius: 4px;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;

    a {
        color: ${palette.white};
        text-decoration: none;
    }
    @media ${(props) => props.theme.mobile} {
        width: 85vw;
    }
`;

const DivdeContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 85%;
    margin: 0 auto;
`;

const DivdeLine = styled.div`
    width: 40%;
    border-color: ;
`;

const DivdeText = styled.div`
    width: 15%;
    text-align: center;
    color: ${palette.borderColor};
`;
const index = () => {
    return (
        <div>
            <IndexContainer>
                <div className={styles.logo__wrapper}>
                    <Link to="/">
                        <img
                            src="/image/cats.png"
                            alt="logo"
                            className={styles.logo}
                        />
                    </Link>
                </div>
                <article>
                    <LoginForm />
                    <DivdeContainer>
                        <DivdeLine>
                            <hr />
                        </DivdeLine>
                        <DivdeText>또는</DivdeText>
                        <DivdeLine>
                            <hr />
                        </DivdeLine>
                    </DivdeContainer>
                    <SignupButton>
                        <Link to="/user/signup">회원가입</Link>
                    </SignupButton>
                </article>
            </IndexContainer>
        </div>
    );
};

export default index;
