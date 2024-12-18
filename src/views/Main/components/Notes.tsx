import NoteCard from "../../../components/ui/cards/NoteCard.tsx";
import { filterNames } from "../../../constants/filterNames.ts";
import Pagination from "./pagination.tsx";
import { Note } from "../../../types/note.ts";
type Props = {
	currFilter: string;
	hideCompleted: boolean;
	data:
		 {
			amount: number;
			notes: Note[];
		  }
		| undefined;
};

const Notes = ({ currFilter, data, hideCompleted }: Props) => {
	const isAllFilter = currFilter === filterNames.All;

	if (data == undefined) {
		return <div>Loading</div>;
	}
	const { notes, amount } = data;

	return (
		<div className={"flex flex-col justify-center gap-3"}>
			<div
				className={
					"w-full grid grid-cols-sm-notes md:grid-cols-md-notes lg:grid-cols-notes gap-3 max-sm:px-5"
				}
			>
				{notes.map((note) => {
					if (hideCompleted) {
						return (currFilter.toLowerCase() === note.tag.toLowerCase() ||
							isAllFilter) &&
							!hideCompleted == note.isDone ? (
							<NoteCard key={note.createdAt} {...note} />
						) : null;
					}
					return currFilter.toLowerCase() == note.tag.toLowerCase() ||
						isAllFilter ? (
						<NoteCard key={note.createdAt} {...note} />
					) : null;
				})}
			</div>
			{amount != 0 ? (
				<Pagination notesLength={amount} />
			) : (
				<div>There is no notes there.</div>
			)}
		</div>
	);
};

export default Notes;
