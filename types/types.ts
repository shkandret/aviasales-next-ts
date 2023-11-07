interface ISegments {
	origin: string;
	destination: string;
	date: string;
	stops: string[];
	duration: number;
}

export interface ITicket {
	price: number;
	carrier: string;
	segments: ISegments[];
}