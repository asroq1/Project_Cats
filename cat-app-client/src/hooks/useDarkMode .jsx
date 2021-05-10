import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CHANGE_DARK_MODE} from '../reducers/user';

export const useDarkMode = () => {
    const [theme, setTheme] = useState('dark');
    //const {themeMode} = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const setMode = (mode) => {
        window.localStorage.setItem('theme', mode);
        setTheme(mode);
        dispatch({
            type: CHANGE_DARK_MODE,
        })
    };

    const toggleTheme = () => {
        theme === 'dark' ? setMode('light') : setMode('dark');
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme ? setTheme(localTheme) : setMode('dark');
    }, []);

    return [theme, toggleTheme];
};
