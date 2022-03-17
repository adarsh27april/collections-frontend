// import logo from './logo.svg';

import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Navbar from './components/Navbar';
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route exact path='/' element={<Welcome />} />
					<Route exact path="/register" element={<Register />} />
					<Route exact path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
