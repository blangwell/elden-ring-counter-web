import { useState, useEffect } from 'react';
import './App.css';

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
	}
	
	const undo = () => {
		if (count > 0) {
			setCount(count - 1);
		}
	}

  return (
    <div className="App">
			<h1>Deaths: {count}</h1>
			<button onClick={die}>Die</button>
			<button onClick={undo}>Undo</button>
    </div>
  );
}

export default App;
