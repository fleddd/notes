import { filterNames } from "../../constants/filterNames";
import Notes from "./components/Notes.tsx";
import { useStore } from "../../store/store.ts";
import Filters from "./components/Filters.tsx";
import useNotes from "../../hooks/useNotes.tsx";
import Welcome from "./components/Welcome.tsx";
import { Suspense } from "react";
import { toast } from "react-toastify";

const Main = () => {
	const { data, isLoading, isError } = useNotes();
	const filters = Object.values(filterNames);
	const { currentFilter, isHideCompleted } = useStore();

	if (isError) {
		toast.error("Something went wrong!");
	}
	if (!data && !isLoading) return <Welcome />;
	if (isLoading) return <div>Loading...</div>;

	return (
		<main
			className={
				"flex flex-col gap-3 w-full justify-center items-center sm:px-20"
			}
		>
			<Filters filters={filters} />
			<Suspense fallback={<div>Loading...</div>}>
				<Notes
					hideCompleted={isHideCompleted}
					currFilter={currentFilter}
					data={data}
				/>
			</Suspense>
		</main>
	);
};

export default Main;
