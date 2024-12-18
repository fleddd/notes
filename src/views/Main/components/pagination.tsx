import { useStore } from "../../../store/store.ts";
import { ActionButton } from "../../../components/ui";

type Props = {
	notesLength: number;
};

const Pagination = ({ notesLength }: Props) => {
	const { currentPage, setNextPage, setPreviousPage } = useStore();
	const notesPerPage = 6;
	const availablePages = Math.round(notesLength / notesPerPage);
	return (
		<div className={"flex justify-center gap-3"}>
			{currentPage > 1 && (
				<div>
					<ActionButton onClick={setPreviousPage}>Previous page</ActionButton>
				</div>
			)}
			{notesLength > 6 && <div>Current page: {currentPage}</div>}
			{availablePages > currentPage && (
				<div>
					<ActionButton onClick={setNextPage}>Next Page</ActionButton>
				</div>
			)}
		</div>
	);
};

export default Pagination;
