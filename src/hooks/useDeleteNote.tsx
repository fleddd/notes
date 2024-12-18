import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteNote } from "../services/notes.ts";
import { toast } from "react-toastify";
import { NOTES_QUERY_KEY } from "../constants/QueryKey.ts";
import { useStore } from "../store/store.ts";

export const useDeleteNote = () => {
	const queryClient = useQueryClient();
	const { token } = useStore();

	const { mutateAsync: deleteAsync } = useMutation({
		mutationFn: async ({ id }: { id: number }) => await DeleteNote(id, token),
		onSuccess: () => {
			queryClient
				.invalidateQueries({
					queryKey: [NOTES_QUERY_KEY],
				})
				.then(() => {
					toast.success("Note was successfully deleted!");
				});
		},
		onError: () => {
			toast.error("Failed to delete the note");
		},
	});
	return { deleteAsync };
};
