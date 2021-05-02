import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
body{
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.5s linear
}
`;

export const lightTheme = {
    body: '#F4F1DE', //배경색(beige)
    text: '#484848',
    primary: '#fff',
    input: '#f2f1ee',
    button: '#3D405B',//navy
    graph: '#3D405B',
    resultText: '#ffffff',
    resultHeader: '#3D405B',
    resultBackground: '#3D405B',
    resultExit: '#d8d8d8',

    textlight: '#F4F1DE',

    cOrange: '#E07A5F',
    beige: '#F4F1DE',
    orange: '#E07A5F',
    navy: '#3D405B',
    green: '#81B29A',

    shadow : 'rgba(0,0,0,0.5)' 
};

export const darkTheme = {
    body: '#121212',
    text: '#d8d8d8',
    primary: '#121212',
    input: '#1f1f1f',
    button: '#E07A5F',
    graph: '#1e1e1e',
    resultText: '#d8d8d8',
    resultHeader: '#1e1e1e',
    resultBackground: '#121212',
    resultExit: '#484848',
    test: 'dark',

    // alt colors for dark mode
    textlight:'#d8d8d8',

    cOrange: '#E07A5F',

    beige: '#121212',
    orange: '#3D405B',
    navy: '#3D405B',
    green: '#3D405B',

    shadow : 'rgba(255, 255, 255, 0.5)',
};
