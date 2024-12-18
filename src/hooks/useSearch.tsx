import {useQuery} from "@tanstack/react-query";
import {GetNotesFromSearch} from "../services/notes.ts";
import {useStore} from "../store/store.ts";
import {SEARCH_QUERY_KEY} from "../constants/QueryKey.ts";

const useSearch = (searchedNote:string) => {
    const {token} = useStore()


    return useQuery({
        queryFn: async () => await GetNotesFromSearch(searchedNote, token),
        queryKey: [SEARCH_QUERY_KEY, searchedNote],
        refetchOnWindowFocus: false,
        // enabled: !!searchedNote.trim(),
    })

}

export default useSearch