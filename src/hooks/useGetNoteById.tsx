import { useStore } from "../store/store.ts";
import { useQuery } from "@tanstack/react-query";
import { GetNoteById } from "../services/notes.ts";
import { NOTES_QUERY_KEY } from "../constants/QueryKey.ts";

const useGetNoteById = (id: number | null) => {
	const { token } = useStore();

	return useQuery({
		queryFn: async () => await GetNoteById(id, token),
		queryKey: [`${NOTES_QUERY_KEY}_${id}`],
		refetchOnWindowFocus: false,
	});
};

export default useGetNoteById;
