import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Header = styled.header`
    height: 10vh;
    background-color: ${({theme})=>theme.palette.beige};
`;
const ExitButton = styled.p`
    //position: fixed;
    //right: 0;
    text-align: right; //추가
    font-size: 2rem;
    padding: 0.5rem;

    a{
        color: ${({theme})=>theme.palette.navy}
    }
    
}
`;
const AddWeightHeader = () => {
    return (
        <Header>
            <ExitButton>
                <Link to="/user/main">
                    <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            </ExitButton>
        </Header>
    );
};

export default AddWeightHeader;