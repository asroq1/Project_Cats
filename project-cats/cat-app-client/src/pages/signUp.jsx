import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignUpForm from '../components/signUp/SignUpForm';
import palette from '../styles/palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const SignupBackground = styled.div`
    background-color: #f4f1de;
`;
const SignupWrapper = styled.div`
    display: grid;
    max-width: 1200px;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    background-color:  background-color: ${palette.orange};
`;

const TitleWrapper = styled.div`
    display: grid;
    align-items: end;
`;

const Title = styled.h2`
    margin-bottom: 1rem;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: ${palette.navy};
`;
const ExitButton = styled.p`
position: fixed;
    right: 0;
    font-size: 2rem;
    padding: 0.5rem;

    a{
        color: ${palette.navy}
    }
    
}
`;
// const DivideLine = styled.div`
//     width: 30%;
//     margin: 0 auto;
//     text-align: center;
//     padding: 0.5rem 0 0.5rem 0;
//     border-top: 1px solid #909090;
//     border-bottom: 1px solid #909090;
//     color: #909090;
//     font-size: 1.2rem;

//     @media ${(props) => props.theme.mobile} {
//         width: 85vw;
//         font-size: 1rem;
//     } ;
// `;
const signUp = () => {
    return (
        <SignupBackground>
            <SignupWrapper>
                <TitleWrapper>
                    <ExitButton>
                        <Link to="/">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </ExitButton>
                    <Title>회원가입</Title>
                </TitleWrapper>
                <article>
                    <SignUpForm />
                </article>
            </SignupWrapper>
        </SignupBackground>
    );
};

export default signUp;
