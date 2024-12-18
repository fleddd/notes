import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../services/notes.ts";
import { NOTES_QUERY_KEY } from "../constants/QueryKey.ts";
import { useStore } from "../store/store.ts";

const useNotes = () => {
	const { token, currentPage } = useStore();

	return useQuery({
		queryKey: [NOTES_QUERY_KEY, currentPage],
		queryFn: async () => await fetchData("notes", token, currentPage),
		refetchOnWindowFocus: false,
	});
};

export default useNotes;
