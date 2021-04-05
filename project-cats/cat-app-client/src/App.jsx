import './App.css'
import { Reset } from 'styled-reset'
import { Route } from 'react-router-dom'
import signUp from './pages/signUp'
import index from './pages/index'
import weightResult from './pages/weightResult'
function App() {
	return (
		<>
			{/* ResetCSS  */}
			<Reset />
			<Route path="/" component={index} exact />
			<Route path="/user/signup" component={signUp} />
			<Route path="/cat/data" component={weightResult} />
		</>
	)
}

export default App
