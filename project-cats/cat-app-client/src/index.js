import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider }from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/configureStore'

ReactDOM.render(
	<React.StrictMode>
		{/* React.StrictMode는 배포시 지울 코드 */}
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)