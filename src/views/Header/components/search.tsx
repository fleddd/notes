import {useForm} from "react-hook-form";
import useSearch from "../../../hooks/useSearch.tsx";
import useDebounce from "../../../hooks/useDebounce.tsx";
import {useStore} from "../../../store/store.ts";
import {NoteTypes} from "../../../constants/noteTypes.ts";
import {Note} from "../../../types/note.ts";

type SearchType = {
    searchedNote: string
}

const Search = () => {
    const {setNoteMode, setOpenedNote, setIsModalOpened} = useStore()


    const { register, watch, reset} = useForm<SearchType>({
        mode: "onChange",
    })
    const searchedValue = watch("searchedNote")
    const debouncedSearchedValue = useDebounce(searchedValue, 150)
    const {data} = useSearch(debouncedSearchedValue);

    const handleOnClick =(id:number) => {
        reset()
        setOpenedNote(id)
        setNoteMode(NoteTypes.editing)
        setIsModalOpened(true)
    }

    return (
            <form
                className={"grow max-sm:py-0 flex flex-col justify-center relative"}
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    {...register("searchedNote")}
                    className={
                        "max-sm:text-xs outline-none w-full px-2 py-2 placeholder:pl-1 bg-gray-100 border-2 border-gray-200 placeholder:text-gray-700"
                    }
                    type="search"
                    placeholder="Search"
                />
                {data?.notes?.length > 0 && (
                    <div className="absolute top-10 bg-white shadow-md w-full p-2 flex flex-col gap-2 divide-y divide-gray-300 ">
                        {data.notes?.map((note:Note)   => (
                            <button type={"button"} onClick={() => handleOnClick(note.id)} className={"border-black text-start"} key={note.id}>{note.title}</button>
                        ))}
                    </div>
                )}
            </form>
    )
}

export default Search;