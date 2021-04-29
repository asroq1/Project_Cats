import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
body{
    // background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.5s linear
}
`;

export const lightTheme = {
    body: '#fff',
    text: '121212',
    primary: '#fff',
};

export const darkTheme = {
    body: '#292929',
    text: 'fff',
    primary: '#121212',
};
