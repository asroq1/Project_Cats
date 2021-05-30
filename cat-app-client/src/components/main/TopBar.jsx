import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ModalMenu from '../modal/ModalMenu';
import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';
import PropTypes from 'prop-types';

const InnerGlobal = styled.div`
    background-color: ${({ theme }) => theme.navy};
    a {
        color: ${({ theme }) => theme.beige};
        text-decoration: none;
        font-weight: normal;
    }
    h1,
    h3,
    span {
        font-weight: normal;
    }
`;

const EachCol = styled.div`
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 1.25rem;
    font-weight: bold;
    flex: auto;
    
    
    &:nth-child(even){
        background-color: ${(props) =>
            props.active ? ({ theme }) => theme.beige : ({ theme }) => theme.navy};
        }
    &:nth-child(odd){
        background-color: ${(props) =>
            props.active ? ({ theme }) => theme.beige : ({ theme }) => theme.navy2
    }
}
    &:hover,
    &:focus {
        background-color: ${(props) =>
            props.active
                ? ({ theme }) => theme.beige
                : ({ theme }) => theme.text};
    }
    &:not(:last-child) {
        max-width: 110px;
        justify-content: center;
        color: ${(props) =>
            props.active
                ? ({ theme }) => theme.text
                : ({ theme }) => theme.beige};
        border-radius: ${(props) => (props.active ? '15px 15px 0 0' : 'none')};
        border-top: 1px solid
            ${(props) => (props.active ? ({ theme }) => theme.beige : 'none')};
        border-left: 1px solid
            ${(props) => (props.active ? ({ theme }) => theme.beige : 'none')};
        border-right: 1px solid
            ${(props) => (props.active ? ({ theme }) => theme.beige : 'none')};
        border-bottom: ${(props) =>
            props.active ? 'none' : '1px solid black'};
        cursor: pointer;
    }
    &:last-child {
        font-size: 2rem;
        text-align: right;
        justify-content: flex-end;
        border: none;
        border-bottom: 1px solid black;
        background: ${({ theme }) => theme.navy};
    }
    .fa-cog {
        padding-right: 0.5rem;
        cursor: pointer;

        color: ${({ theme }) => theme.beige};
        transition: 0.5s;
        &:hover,
        &:focus {
            transform: rotate(20deg);
        }
    }
`;

const TopBar = ({ cat, currentIndex, onSelect }) => {
    const menuStyle = useMemo(() => ({ height: '45px', display: 'flex' }), []);

    const [showCatIndex, setShowCatIndex] = useState(0);
    const [shownCats, setShownCats] = useState([...cat].slice(0, 3));

    const [moreCatsLeft, setMoreCatsLeft] = useState(false);
    const [moreCatsRight, setMoreCatsRight] = useState(false);

    useEffect(() => {
        console.log("showCatIndex",showCatIndex);
        console.log("cat", cat)
        console.log("shownCats",shownCats)
        console.log("currentIndex",currentIndex)
        if (cat.length - showCatIndex > 3) {
            setMoreCatsRight(true);
        } else {
            setMoreCatsRight(false);
        }

        if (showCatIndex >= 3) {
            setMoreCatsLeft(true);
        } else {
            setMoreCatsLeft(false);
        }
    }, [showCatIndex]);

    const showCatsLeft = useCallback(() => {
        const newShowCatIndex = showCatIndex - 3 >= 0 ? showCatIndex - 3: 0;

        setShowCatIndex(newShowCatIndex);
        console.log(showCatIndex);
        setShownCats([...cat].slice(newShowCatIndex, newShowCatIndex + 3));
    }, [showCatIndex]);

    const showCatsRight = useCallback(() => {

        const newShowCatIndex = showCatIndex + 3 < cat.length ? showCatIndex + 3 : cat.length-1;
        setShowCatIndex(newShowCatIndex);
        console.log(showCatIndex);
        
        
        setShownCats([...cat].slice(newShowCatIndex, newShowCatIndex + 3));
    }, [showCatIndex]);

    // const fillerCol = useMemo(
    //     () => ({
    //         display: 'inline-block',
    //         flex: 1,
    //         borderBottom: '1px solid black',
    //         paddingTop: '1.5rem',
    //         paddingBottom: '1.5rem',
    //         fontSize: '1rem',
    //     }),
    //     []
    // );

    const [showModalMenu, setShowModalMenu] = useState(false);
    const history = useHistory();
    const gotoAddCat = useCallback(() => {
        history.push('/cat/add');
    }, []);
    const onModalMenu = useCallback(() => {
        setShowModalMenu(true);
    }, []);
    const onModalClose = useCallback(() => {
        setShowModalMenu(false);
    }, []);

    return (
        <InnerGlobal>
            <div style={menuStyle}>
                {moreCatsLeft && (
                    <EachCol onClick={ showCatsLeft}><i className= "fa fa-chevron-left"></i></EachCol>
                )}
                {shownCats.map((el) => (
                    <EachCol
                        key={el.id + el.name}
                        active={currentIndex === el.id}
                        onClick={() => onSelect(el.id)}
                        id={el.id}
                    >
                        {el.name}
                    </EachCol>
                ))}
                {moreCatsRight && (
                    <EachCol onClick={showCatsRight}><i className =  "fa fa-chevron-right"></i></EachCol>
                )}
                <EachCol onClick={gotoAddCat}>
                    <i className="fa fa-plus"></i>
                </EachCol>
                <EachCol>
                    <i className="fa fa-cog" onClick={onModalMenu}></i>
                    {showModalMenu && <ModalMenu onClose={onModalClose} />}
                </EachCol>
            </div>
        </InnerGlobal>
    );
};

TopBar.propTypes = {
    cat: PropTypes.array.isRequired,
    currentIndex: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default TopBar;
