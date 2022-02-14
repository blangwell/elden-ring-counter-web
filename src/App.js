import { useState, useEffect } from 'react';
import './App.css';
import audio from './assets/sword.wav';
import Particles from './Particles';

function App() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		let countFromStorage = localStorage.getItem("deathcount");
		if (countFromStorage != null) {
			setCount(+countFromStorage);
		} else {
			localStorage.setItem("deathcount", "0");
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("deathcount", count.toString())
	}, [count]);

	const die = () => {
		setCount(count + 1);
		new Audio(audio).play();
	}
	
	const undo = () => {
		if (count > 0) {
			setCount(count - 1);
		}
	}

  return (
    <div className="App">
			<Particles />
			<h1>Deaths: {count}</h1>
			<button onClick={die} id="die-btn">DIE</button>
			{/* <button onClick={undo}>undo</button> */}
    </div>
  );
}

export default App;
