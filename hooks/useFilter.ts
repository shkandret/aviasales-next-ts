import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
	sortCheaper,
	sortFaster,
	sortOptimal,
} from '@/store/reducers/ticketsSlice';

const useFilter = () => {
	const [active, setActive] = useState(0);
	const dispatch = useAppDispatch();
	const { checked } = useAppSelector((state) => state.tickets);

	const handleCheaper = () => {
		dispatch(sortCheaper());
		setActive(0);
	};

	const handleFaster = () => {
		dispatch(sortFaster());
		setActive(1);
	};

	const handleOptimal = () => {
		dispatch(sortOptimal());
		setActive(2);
	};

	useEffect(() => {
		if (active === 0) dispatch(sortCheaper());
		if (active === 1) dispatch(sortFaster());
		if (active === 2) dispatch(sortOptimal());
	}, [active, dispatch, checked]);

	return { active, handleCheaper, handleOptimal, handleFaster };
};

export default useFilter;