import { motion } from "framer-motion";
import { Form, useForm } from "react-hook-form";
import { ActionButton } from "../../../components/ui";
import { newNoteSchema } from "../../../helpers/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/apiURL.ts";
import { useStore } from "../../../store/store.ts";
import { useQueryClient } from "@tanstack/react-query";
import { NOTES_QUERY_KEY } from "../../../constants/QueryKey.ts";

type Props = {
	toggleModal: () => void;
};

type CreateNote = {
	title: string;
	description: string;
	tag: "home" | "personal" | "business";
};

const NewNote = ({ toggleModal }: Props) => {
	const queryClient = useQueryClient();
	const { token } = useStore();
	const { register, control } = useForm<CreateNote>({
		defaultValues: {
			title: "",
			description: "",
			tag: "home",
		},
		resolver: zodResolver(newNoteSchema),
	});

	return (
		<div className={"w-full flex flex-col grow "}>
			<div className={"text-end"}>
				<motion.button
					whileTap={{ scale: 0.9 }}
					className={"border-2 border-black px-2 rounded-xl"}
					onClick={toggleModal}
				>
					X
				</motion.button>
			</div>
			<Form
				control={control}
				action={`${API_URL}Notes`}
				method="post"
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
							toggleModal();
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
							{...register("title", { required: true })}
							placeholder={"Title"}
							className={"font-bold outline-none text-xl  "}
						/>
						<hr />
						<textarea
							{...register("description")}
							placeholder={"Description"}
							className={
								"outline-none text-gray-500  overflow-hidden h-[clamp(170px,170px,170px)] resize-none "
							}
						/>
					</div>
					<div className={"text-center"}>
						<ActionButton type="submit">Create</ActionButton>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default NewNote;
