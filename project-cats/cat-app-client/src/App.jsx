import './App.css'
import { Reset } from 'styled-reset'
import { Route } from 'react-router-dom'
import signUp from './pages/signUp'
import index from './pages/index'
import weightResult from './pages/weightResult'
<<<<<<< HEAD
<<<<<<< HEAD
import main from './pages/main'
=======

>>>>>>> d3ad080e30352dc0947da0bb4e090bb2e1c29218
=======

>>>>>>> d3ad080e30352dc0947da0bb4e090bb2e1c29218
function App() {
	return (
		<>
			{/* ResetCSS  */}
			<Reset />
			<Route path="/" component={index} exact />
			<Route path="/user/signup" component={signUp} />
			<Route path="/cat/data" component={weightResult} />
			<Route path="/user/main" component={main} />
		</>
	)
}

export default App
