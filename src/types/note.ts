export type Note = {
	id: number;
	title: string;
	description: string;
	createdAt: string;
	tag: string;
	isDone: boolean;
	userId: string;
};

export type NoteToUpdate = {
	Title: string;
	Description: string;
	Tag: string;
	IsDone: boolean;
};
