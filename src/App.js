import { useState, useEffect } from 'react';
import './App.css';
import Particles from './Particles';
import estus from './assets/estus.mp3';
import dspain from './assets/dspain.mp3';
import bonfire from './assets/bonfire.mp3';

function App() {
	const [count, setCount] = useState(0);
	const [audio] = useState({
		estus: new Audio(estus),
		dspain: new Audio(dspain),
		bonfire: new Audio(bonfire)
	});
	const [soundPlaying, setSoundPlaying] = useState(false);

	useEffect(() => {
		let countFromStorage = localStorage.getItem("deathcount");
		if (countFromStorage != null) {
			setCount(+countFromStorage);
		} else {
			localStorage.setItem("deathcount", "0");
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("deathcount", count.toString());
	}, [count]);

	useEffect(() => {
		Object.keys(audio).forEach(key => {
			audio[key].addEventListener("ended", () => setSoundPlaying(false));
		})
	}, [soundPlaying]);

	const die = () => {
		setCount(count + 1);
		audio.dspain.play();
		setSoundPlaying(true);
	}

	const undo = () => {
		if (count > 0) {
			setCount(count - 1);
			audio.estus.play();
			setSoundPlaying(true);
		}
	}

	const reset = () => {
		setCount(0);
		audio.bonfire.play();
		setSoundPlaying(true);
	}

	return (
		<div className="App">
			<Particles />
			<div className="overlay"></div>
			<h1>Deaths: {count}</h1>
			<button onClick={die} id="die-btn">Die</button>
			<div id="undo-reset-container">
				<p onClick={undo} id="undo">Undo&nbsp;</p><p id="vr">|</p>
				<p onClick={reset} id="reset">&nbsp;Reset</p>
			</div>
		</div>
	);
}

export default App;
