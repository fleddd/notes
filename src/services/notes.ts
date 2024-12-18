import { API_URL } from "../constants/apiURL.ts";
import { ResponseError } from "../helpers/ResponseError.ts";
import { Note, NoteToUpdate } from "../types/note.ts";

type NotesResponse = {
	amount: number;
	notes: Note[];
};

export async function fetchData(
	endpoint: string,
	token: string,
	page: number = 1,
): Promise<NotesResponse> {
	const response = await fetch(`${API_URL}${endpoint}/?page=${page}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new ResponseError("Failed to get data.", response);
	}
	return (await response.json()) as NotesResponse;
}

export async function DeleteNote(id: number, token: string) {
	const response = await fetch(API_URL + "notes/" + id, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!response.ok) {
		throw new ResponseError("Failed to delete note.", response);
	}
	return await response.json();
}

export async function UpdateNote(
	id: number,
	updatedNote: NoteToUpdate,
	token: string,
) {
	const response = await fetch(`${API_URL}notes/${id}`, {
		method: "PUT",
		body: JSON.stringify({
			title: updatedNote.Title,
			description: updatedNote.Description,
			tag: updatedNote.Tag,
			isDone: updatedNote.IsDone,
		}),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	if (!response.ok) {
		throw new ResponseError("Failed to update note.", response);
	}
	return await response.json();
}

export async function GetNoteById(id: number | null, token: string) {
	if (!id) throw new Error("Bad note id.");

	const response = await fetch(`${API_URL}notes/${id}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new ResponseError("Failed to get note.", response);
	}

	return await response.json();
}

export async function GetNotesFromSearch(title: string, token: string) {
	if(!title.trim() || title == "") return []

	const response = await fetch(`${API_URL}notes/?title=${title}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})

	if (!response.ok) {
		throw new ResponseError("Failed to get notes from search.", response);
	}

	return await response.json();
}
