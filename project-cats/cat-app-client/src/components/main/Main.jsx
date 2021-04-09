import React, { useMemo } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link } from 'react-router-dom';

//코드 너무 장황해지니
//필요 딱히 없는 건 나중에 지워주기
//짧은 건 useMemo로 넣어줌
const GeneralWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`;
const PhotoContainer = styled.img`
    width: 150px;
    height: 150px;
    margin: auto;
    border: 1px solid green;
    object-fit: cover;
`;

const Main = ({ cat, current_index }) => {
    // styled-component대신 useMemo 써줌
    const colStyle = useMemo(
        () => ({
            maxWidth: '150px',
            flex: 'auto',
            border: '1px solid lightgreen',
        }), []);
    const paddingStyle = useMemo(
        () => ({ marginTop : '1em', padding: '0.5em' 
    }), []);

    const currentCat = cat[current_index];

    return (
        <>
            <GeneralWrapper>
                <PhotoContainer
                    src={currentCat.Photo.url}
                    alt="cat_image"
                ></PhotoContainer>
            </GeneralWrapper>
            <GeneralWrapper>
                <div>{currentCat.gender}</div>
                <div>{currentCat.age}</div>

                <div>{currentCat.Record.length> 0 ? currentCat.Record[currentCat.Record.length - 1].cdt : '-'}</div>
                <div>{currentCat.Record.length > 0 ? currentCat.Record[currentCat.Record.length - 1].wgt :'-'}</div>
            </GeneralWrapper>
            <GeneralWrapper>
                <Link
                    to={{
                        pathname: '/cat/addWeight',
                        cat_id: current_index,
                    }}
                >
                    <button style={paddingStyle}>Weight Record</button>
                </Link>

                <Link
                    to={{
                        pathname: '/cat/record',
                        cat_id: current_index,
                    }}
                >
                    <button style={paddingStyle}>See Previous Data</button>
                </Link>

                <Link to="/">Back to Home</Link>
            </GeneralWrapper>
        </>
    );
};

export default Main;