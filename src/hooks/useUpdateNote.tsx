import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateNote } from "../services/notes.ts";
import { NoteToUpdate } from "../types/note.ts";
import { useStore } from "../store/store.ts";
import { toast } from "react-toastify";
import { NOTES_QUERY_KEY } from "../constants/QueryKey.ts";

const useUpdateNote = () => {
	const { token } = useStore();
	const queryClient = useQueryClient();
	const { mutateAsync: updateAsync } = useMutation({
		mutationFn: async ({
			id,
			updatedNote,
		}: { id: number; updatedNote: NoteToUpdate }) =>
			await UpdateNote(id, updatedNote, token),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [NOTES_QUERY_KEY],
			});
		},
		onError: () => {
			toast.error("Something went wrong when you tried to update the note.");
		},
	});

	return { updateAsync };
};

export default useUpdateNote;
