import { create } from "zustand";
import { NoteTypes } from "../constants/noteTypes.ts";

type Store = {
	noteMode: NoteTypes;
	openedNote: number | null;
	currentPage: number;
	email: string;
	username: string;
	token: string;
	isModalOpened: boolean;
	currentFilter: string;
	isHideCompleted: boolean;
	setNoteMode: (noteMode: NoteTypes) => void;
	setNextPage: () => void;
	setOpenedNote: (id: number) => void;
	setPreviousPage: () => void;
	setEmail: (email: string) => void;
	setUsername: (username: string) => void;
	setToken: (token: string) => void;
	setHideCompleted: () => void;
	setCurrentFilter: (filter: string) => void;
	setIsModalOpened: (value: boolean) => void;
	resetStore: () => void;
};

export const useStore = create<Store>()((set) => ({
	noteMode: NoteTypes.showing,
	openedNote: null,
	currentPage: 1,
	email: "",
	token: "",
	username: "",
	isModalOpened: false,
	currentFilter: "All",
	isHideCompleted: false,
	setNoteMode: (noteMode: NoteTypes) => set(() => ({ noteMode: noteMode })),
	setOpenedNote: (id: number) => set(() => ({ openedNote: id })),
	setNextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
	setPreviousPage: () =>
		set((state) => ({ currentPage: state.currentPage - 1 })),
	setEmail: (email: string) => set(() => ({ email: email })),
	setUsername: (username: string) => set(() => ({ username: username })),
	setToken: (token: string) => set(() => ({ token: token })),
	setHideCompleted: () =>
		set((state) => ({ isHideCompleted: !state.isHideCompleted })),
	setCurrentFilter: (filter: string) => set(() => ({ currentFilter: filter })),
	setIsModalOpened: (value) => set(() => ({ isModalOpened: value })),
	resetStore: () => set(() => ({ email: "", username: "", token: "", currentPage: 1, openedNote: null })),
}));
