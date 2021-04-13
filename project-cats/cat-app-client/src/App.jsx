import './App.css';
import { Reset } from 'styled-reset';
import { Route } from 'react-router-dom';
import signUp from './pages/signUp';
import index from './pages/index';
import weightResult from './pages/weightResult';
import weightAdd from './pages/weightAdd';
import catAdd from './pages/catAdd';
import main from './pages/main';

import postWrite from './pages/postWrite';

import postList from './pages/postList';

import postView from './pages/postView';

function App() {
    return (
        <>
            {/* ResetCSS  */}
            <Reset />
            <Route path="/" component={index} exact />
            <Route path="/user/signup" component={signUp} />
            <Route path="/cat/data" component={weightResult} />
            <Route path="/cat/record" component={weightAdd} />
            <Route path="/cat/add" component={catAdd} />
            <Route path="/user/main" component={main} />
            <Route path="/post/write" component={postWrite}/>
            <Route path="/post/list" component= {postList}/>
            <Route path="/post/view" component = {postView}/>
        </>
    );
}

export default App;
