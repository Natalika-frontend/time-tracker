import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const TimerContainer = ({ selectedProject, selectedTask }) => {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let timer;
		if (isRunning) {
			timer = setInterval(() => {
				setTime((prevTime) => prevTime + 1);
			}, 1000);
		} else if (!isRunning && time !== 0) {
			clearInterval(timer);
		}
		return () => clearInterval(timer);
	}, [isRunning]);

	const handleStartPause = () => {
		setIsRunning(!isRunning);
	};

	const handleReset = () => {
		setIsRunning(false);
		setTime(0);
	};

	return (
		<div>
			<h1>{new Date(time * 1000).toISOString().substr(11, 8)}</h1>
			<button onClick={handleStartPause}>
				{isRunning ? 'Pause' : 'Start'}
			</button>
			<button onClick={handleReset}>Reset</button>
		</div>
	);
};

export const Timer = styled(TimerContainer)``;
