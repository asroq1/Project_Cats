import React from 'react';
import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';

const InnerGlobal = styled.div`
    background-color: ${({ theme }) => theme.beige};
    min-height: calc(100vh - 45px);
    margin: 0 auto;
    display: flex;
    text-align: center;
    div {
        margin: auto;
        line-height: 2;
        font-size: 1.5rem;
    }
`;

const MainEmpty = () => {
    return (
        <>
            <InnerGlobal>
                <div>
                    <h1>
                        <i className="fa fa-heart"></i> 귀여운 고양이를 <br />
                        추가해 주세용! <i className="fa fa-heart"></i>
                    </h1>
                </div>
            </InnerGlobal>
        </>
    );
};

export default MainEmpty;
