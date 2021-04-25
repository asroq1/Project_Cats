import styled from 'styled-components';
import palette from '../../styles/palette';

// 스타일링된 input block
export const InnerGlobal = styled.div`
    width: 80%;
    margin: 0 auto;

    & > form > div > label {
        visibility: hidden;
    }
`;

export const StyledInputBlock = styled.div`
    input {
        font-size: 1rem;
        border: 1px solid gray;
        background-color:white;
        padding: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-radius:10px;
        outline: none;
    }

    label {
        visibility: hidden;
    }

    input-placeholder {
        text-align: center;
    }

    & > .inputcontainer > input:focus {
        background-color: white;
    }
    .regular {
        width: 100%;
    }
    .inputcontainer {
        display: flex;
    }
    .birth {
        min-width: 20px;
        max-width: 33%;
        flex: 1 1 auto;
        text-align: center;

        &::placeholder {
            text-align: center;
        }
    }

    & + & {
        margin-top: 0.5rem;
    }
    .birth + .birth {
        margin-left: 0.5rem;
    }
`;

export const CenterWrapper = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    justify-content: center;
`;

export const ButtonWrapper = styled.button`
    flex: 1;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 0.5rem;
    color: white;
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        background: darkred;
    }
    &:first-child {
        background-color: ${palette.navy};
    }
    &:last-child {
        background-color: ${palette.orange};
    }
`;

export const RadioBtnWrapper = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    display: flex;
    input {
        display: none;
    }
    .radiobtn {
        flex: 1;
        display: inline-block;
        background-color: lightgray;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-radius: 10px;
        color: white;
        cursor: pointer;
        text-align: center;
    }
    input + .radiobtn:last-child {
        margin-left: 0.5rem;
    }
    input:checked + .radiobtn {
        background-color: ${palette.orange};
    }
`;