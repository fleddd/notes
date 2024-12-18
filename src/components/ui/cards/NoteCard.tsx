import { Checkbox, Delete, Edit } from "../index.ts";
import { useStore } from "../../../store/store.ts";
import { AnimatePresence, motion } from "framer-motion";
import { useDeleteNote } from "../../../hooks/useDeleteNote.tsx";
import { Note, NoteToUpdate } from "../../../types/note.ts";
import useUpdateNote from "../../../hooks/useUpdateNote.tsx";
import { formatDateByCreation } from "../../../helpers/formatDateByCreation.ts";
import NoteModal from "../../../views/Modal/NoteModal.tsx";
import { NoteTypes } from "../../../constants/noteTypes.ts";
import { useState } from "react";

const NoteCard = ({
	title,
	createdAt,
	tag,
	isDone,
	id,
	userId,
	description,
}: Note) => {
	const { deleteAsync } = useDeleteNote();
	const { updateAsync } = useUpdateNote();

	const {
		isModalOpened,
		noteMode,
		setNoteMode,
		setIsModalOpened,
		setOpenedNote,
	} = useStore();
	const [mode, setMode] = useState<NoteTypes>(NoteTypes.showing);

	const handleOnCheck = async () => {
		const markedNote: NoteToUpdate = {
			Title: title,
			Description: description,
			IsDone: !isDone,
			Tag: tag,
		};
		await updateAsync({ id: id, updatedNote: markedNote });
	};
	const handleOnDelete = async () => await deleteAsync({ id });
	const handleOnEdit = () => {
		setIsModalOpened(true);
		setOpenedNote(id);
		setNoteMode(NoteTypes.editing);
	};
	const handleOnShowMore = () => {
		setIsModalOpened(true);
		setOpenedNote(id);
		setNoteMode(NoteTypes.showing);
	};

	const formatedDate = formatDateByCreation(createdAt);
	return (
		<>
			<AnimatePresence>{isModalOpened && <NoteModal />}</AnimatePresence>
			<motion.div
				className={
					" min-h-48 max-h-48   bg-white rounded-lg grow shrink p-4 shadow-md flex flex-col justify-around gap-3"
				}
			>
				<div className={"flex justify-between"}>
					<div className={"bg-gray-200 text-gray-700 rounded-full px-2 py-1"}>
						{tag}
					</div>
					<div className={"flex items-center gap-2"}>
						<Checkbox size={30} isChecked={isDone} onClick={handleOnCheck} />
						<Edit size={30} onClick={handleOnEdit} />
						<Delete size={30} onClick={handleOnDelete} />
					</div>
				</div>
				<div className={"space-y-2"}>
					<div className={"text-xl"}>{title}</div>
					<div className={"text-gray-500 text-xs"}>
						<button type={"button"} onClick={handleOnShowMore}>
							Show more
						</button>
					</div>
				</div>
				<div className={"text-xs text-end"}>Created at {formatedDate}</div>
			</motion.div>
		</>
	);
};

export default NoteCard;
