import axios from 'axios';
import {
	createAsyncThunk,
	createSlice,
	current,
	PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ITicket } from '../../types/types';

interface IState {
	searchId: string;
	tickets: ITicket[];
	filteredTickets: ITicket[];
	loading: 'idle' | 'pending' | 'succeeded' | 'failed';
	error: string;
	pagination: 5;
	isStop: boolean;
	checked: { number: number; active: boolean }[];
}

const initialState: IState = {
	searchId: '',
	tickets: [],
	filteredTickets: [],
	error: '',
	loading: 'idle',
	pagination: 5,
	isStop: false,
	checked: [],
};

export const fetchSearchId = createAsyncThunk(
	'tickets/fetchSearchId',
	async () => {
		const response = await axios.get(
			'https://aviasales-test-api.kata.academy/search'
		);
		return response.data;
	}
);

export const fetchTickets = createAsyncThunk(
	'tickets/fetchTickets',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { searchId } = (getState() as RootState).tickets;
			const response = await axios.get(
				'https://aviasales-test-api.kata.academy/tickets',
				{
					params: {
						searchId,
					},
				}
			);
			return response.data;
		} catch (err) {
			// @ts-ignore
			return rejectWithValue(err.message);
		}
	}
);

export const tickets = createSlice({
	name: 'tickets',
	initialState,
	reducers: {
		pagination(state) {
			state.pagination += 5;
		},
		sortCheaper(state) {
			const filterTickets = current(state.filteredTickets).slice();
			state.filteredTickets = filterTickets.sort(
				(prev, next) => prev.price - next.price
			);
		},
		sortFaster(state) {
			const filterTickets = current(state.filteredTickets).slice();
			state.filteredTickets = filterTickets.sort(
				(prev, next) =>
					prev.segments[0].duration +
					prev.segments[1].duration -
					(next.segments[0].duration + next.segments[1].duration)
			);
		},
		sortOptimal(state) {
			const filterTickets = current(state.filteredTickets).slice();
			state.filteredTickets = filterTickets.sort(
				(prev, next) =>
					prev.segments[0].duration +
					prev.segments[1].duration +
					prev.price -
					(next.segments[0].duration + next.segments[1].duration + next.price)
			);
		},

		turnAllTransfers(state) {
			state.checked = [];
			state.filteredTickets = state.tickets.filter((item) => item);
		},

		filterByTransfer(
			state,
			action: PayloadAction<{ number: number; active: boolean }[]>
		) {
			state.checked = action.payload;
			state.filteredTickets = [];
			action.payload.forEach((elem) => {
				if (elem.active) {
					const filtered = state.tickets.filter((item) => {
						return (
							item.segments[0].stops.length + item.segments[1].stops.length ===
							elem.number
						);
					});
					state.filteredTickets.push(...filtered);
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSearchId.pending, (state: IState) => {
			state.loading = 'pending';
			state.error = '';
		});
		builder.addCase(
			fetchSearchId.fulfilled,
			(state: IState, action: PayloadAction<IState>) => {
				state.loading = 'succeeded';
				state.searchId = action.payload.searchId;
			}
		);
		builder.addCase(fetchSearchId.rejected, (state: IState, action) => {
			state.loading = 'failed';
			state.error = action.payload as string;
		});
		builder.addCase(fetchTickets.pending, (state: IState) => {
			state.loading = 'pending';
			state.error = '';
		});
		builder.addCase(fetchTickets.fulfilled, (state: IState, action) => {
			state.isStop = action.payload.stop;
			state.loading = 'succeeded';
			state.tickets.push(...action.payload.tickets);
		});
		builder.addCase(fetchTickets.rejected, (state: IState, action) => {
			state.loading = 'failed';
			state.error = action.payload as string;
		});
	},
});

export const {
	pagination,
	sortCheaper,
	sortFaster,
	sortOptimal,
	filterByTransfer,
	turnAllTransfers,
} = tickets.actions;