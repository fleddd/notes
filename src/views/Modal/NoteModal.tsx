import { motion } from "framer-motion";
import { useStore } from "../../store/store.ts";
import ModalContext from "./ModalContext.tsx";
import useGetNoteById from "../../hooks/useGetNoteById.tsx";
import { NoteTypes } from "../../constants/noteTypes.ts";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newNoteSchema } from "../../helpers/schema.ts";
import { API_URL } from "../../constants/apiURL.ts";
import { toast } from "react-toastify";
import { NOTES_QUERY_KEY } from "../../constants/QueryKey.ts";
import { ActionButton } from "../../components/ui";
import { useQueryClient } from "@tanstack/react-query";
import { Note } from "../../types/note.ts";

const NoteModal = () => {
	const queryClient = useQueryClient();
	const { token, noteMode: mode } = useStore();
	const { isModalOpened, setIsModalOpened, openedNote: id } = useStore();
	const { data: note } = useGetNoteById(id);

	const { register, control } = useForm<Note>({
		resolver: zodResolver(newNoteSchema),
		values: note || {},
	});

	return (
		<ModalContext
			isModalOpened={isModalOpened}
			setIsModalOpened={setIsModalOpened}
		>
			<div className={"w-full flex flex-col grow "}>
				<div className={"flex justify-end items-center gap-2"}>
					<motion.button
						whileTap={{ scale: 0.9 }}
						className={"border-2 border-black px-2 rounded-xl"}
						onClick={() => setIsModalOpened(false)}
					>
						X
					</motion.button>
				</div>
				<Form
					control={control}
					action={`${API_URL}notes/${id}`}
					method="put"
					headers={{
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					}}
					onError={({ response }) => {
						toast.error(`Some error occurred here. ${response?.statusText}`);
					}}
					onSuccess={() => {
						queryClient
							.invalidateQueries({
								queryKey: [NOTES_QUERY_KEY],
							})
							.then(() => {
								toast.success("Successfully created!");
								setIsModalOpened(false);
							});
					}}
					className={"w-full flex flex-col gap-4"}
				>
					<div>
						<div className={"flex flex-col gap-3 h-full"}>
							<div
								className={
									"outline-none px-2 py-1 bg-gray-200 rounded-xl text-gray-700 font-bold max-w-fit "
								}
							>
								<label htmlFor="tag">Tag: </label>
								<select
									disabled={mode == NoteTypes.showing}
									{...register("tag", { required: true })}
									className={"outline-none bg-gray-200 text-gray-700"}
									name="tag"
									id="tag"
								>
									<option className={"font-medium"} value="Home">
										Home
									</option>
									<option className={"font-medium"} value="Business">
										Business
									</option>
									<option className={"font-medium"} value="Personal">
										Personal
									</option>
								</select>
							</div>
							<input
								readOnly={mode == NoteTypes.showing}
								{...register("title", { required: true })}
								placeholder={"Title"}
								className={"font-bold outline-none text-xl  "}
							/>
							<hr />
							<textarea
								readOnly={mode == NoteTypes.showing}
								{...register("description")}
								placeholder={"Description"}
								className={
									"outline-none text-gray-500  overflow-hidden h-[clamp(170px,170px,170px)] resize-none "
								}
							/>
						</div>
						{mode == NoteTypes.editing && (
							<div className={"text-center"}>
								<ActionButton type="submit">Update</ActionButton>
							</div>
						)}
					</div>
				</Form>
			</div>
		</ModalContext>
	);
};

export default NoteModal;
