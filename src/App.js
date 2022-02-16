import { useState, useEffect } from 'react';
import './App.css';
import Particles from './Particles';
import estus from './assets/estus.mp3';
import bonfire from './assets/bonfire.mp3';
import youdied from './assets/youdied.mp3';
import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
	const [count, setCount] = useState(0);
	const [audio] = useState({
		estus: new Audio(estus),
		bonfire: new Audio(bonfire),
		youdied: new Audio(youdied)
	});
	const [currentAudio, setCurrentAudio] = useState(null);
	const [muted, setMuted] = useState(true);

	useEffect(() => {
		let countFromStorage = localStorage.getItem("deathcount");
		if (countFromStorage != null) {
			setCount(+countFromStorage);
		} else {
			localStorage.setItem("deathcount", "0");
		}
	}, []);

	// set local storage count
	useEffect(() => {
		localStorage.setItem("deathcount", count.toString());
	}, [count]);

	// set soundPlaying to false when sound ended
	useEffect(() => {
		Object.keys(audio).forEach(key => {
			audio[key].addEventListener("ended", () => setCurrentAudio(null));
		})
	}, [audio]);

	// conditionally mute audio
	useEffect(() => {
			Object.keys(audio).forEach(key => {
				audio[key].muted = muted;
			})
	}, [muted, audio])


	const playAudio = sound => {
		if (currentAudio) {
			currentAudio.pause();
			currentAudio.currentTime = 0;
		}
		sound.play();
		setCurrentAudio(sound);
	}


	const die = () => {
		setCount(count + 1);
		playAudio(audio.youdied);
	}

	const undo = () => {
		if (count > 0) {
			setCount(count - 1);
			playAudio(audio.estus);
		}
	}

	const reset = () => {
		setCount(0);
		playAudio(audio.bonfire);
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
			<i onClick={() => setMuted(!muted)} className={muted ? "bi bi-volume-mute" : "bi bi-volume-up"} aria-label="Mute"></i>
		</div>
	);
}

export default App;
