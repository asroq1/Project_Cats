import './App.css';
import { Reset } from 'styled-reset';
import { Route } from 'react-router-dom';
import signUp from './pages/signUp';
import index from './pages/index';
import weightResult from './pages/weightResult';
import weightAdd from './pages/weightAdd';
import catAdd from './pages/catAdd';
import catUpdate from './pages/catUpdate';
import main from './pages/main';
import postWrite from './pages/postWrite';
import postList from './pages/postList';
import postEdit from './pages/postEdit';
import postView from './pages/postView';
import Settings from './components/settings/setting';
import KakaLogin from './pages/kakaoLogin';
import NaverLogin from './pages/naverLogin';
import { GlobalStyles, lightTheme, darkTheme } from './styles/globalStyles';
import Toggle from './components/toggle/Toggle';
import { useDarkMode } from './styles/useDarkMode ';
import styled, { ThemeProvider } from 'styled-components';

const Container = styled.div`
    backgroud: black;
`;

function App() {
    const [theme, toggleTheme] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    return (
        <>
            <ThemeProvider theme={themeMode}>
                <Container>
                    <GlobalStyles />
                    <Toggle theme={theme} toggleTheme={toggleTheme} />
                    <Reset />
                    <Route path="/" component={index} exact />
                    <Route path="/user/signup" component={signUp} exact />
                    <Route path="/user/signup/naver" component={NaverLogin} />
                    <Route path="/user/signup/kakao" component={KakaLogin} />
                    <Route path="/cat/data" component={weightResult} />
                    <Route path="/cat/record" component={weightAdd} />
                    <Route path="/cat/add" component={catAdd} />
                    <Route path="/cat/update" component={catUpdate} />
                    <Route path="/user/main" component={main} />
                    <Route path="/user/settings" component={Settings} />
                    <Route path="/post/write" component={postWrite} />
                    <Route path="/post/list" component={postList} />
                    <Route path="/post/view/:postId" component={postView} />
                    <Route path="/post/edit/:postId" component={postEdit}/>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default App;
