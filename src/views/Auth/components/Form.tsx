import { useForm, SubmitHandler } from "react-hook-form";
import { schema } from "../../../helpers/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
	email: string;
	password: string;
	username: string;
};

type Props = {
	onSubmit: (data: Inputs) => void;
	type: "login" | "register";
};

const Form = ({ onSubmit, type }: Props) => {
	const { handleSubmit, register, formState } = useForm<Inputs>({
		defaultValues: { email: "", password: "", username: "" },
		resolver: zodResolver(schema),
	});

	const handleOnSubmit: SubmitHandler<Inputs> = (data) => {
		onSubmit(data);
	};

	return (
		<form
			onSubmit={handleSubmit(handleOnSubmit)}
			method={"POST"}
			autoComplete={"off"}
			className={"flex flex-col gap-5 justify-center items-center"}
		>
			<div className={"space-y-5"}>
				<div>
					<input
						{...register("username", { required: true })}
						type={"text"}
						placeholder={"Username"}
						className={"border-2 shadow-md px-2 py-1 rounded-xl"}
					/>
				</div>
				<span className={"text-red-500 text-xs"}>
					{formState?.errors?.username?.message}
				</span>
				{type === "register" && (
					<>
						<div>
							<input
								{...register("email", { required: true })}
								type={"email"}
								placeholder={"Email"}
								className={"border-2 shadow-md px-2 py-1 rounded-xl"}
							/>
						</div>
						<span className={"text-red-500 text-xs"}>
							{formState?.errors?.email?.message}
						</span>
					</>
				)}
				<div>
					<input
						{...register("password", { required: true })}
						type={"password"}
						placeholder={"Password"}
						className={"border-2 shadow-md px-2 py-1 rounded-xl"}
					/>
				</div>
				<span className={"text-red-500 text-xs"}>
					{formState?.errors?.password?.message}
				</span>
			</div>
			<div>
				<input
					type={"submit"}
					className={"bg-black text-white px-3 py-1 rounded-xl shadow-xl"}
					placeholder={"Submit"}
				/>
			</div>
		</form>
	);
};

export default Form;
