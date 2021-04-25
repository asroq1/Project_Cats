import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Header = styled.header`
    height: 5vh;
    background-color: ${palette.beige};
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
