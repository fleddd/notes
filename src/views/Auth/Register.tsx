import Form from "./components/Form.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../../services/auth.ts";
import { useStore } from "../../store/store.ts";
import { toast } from "react-toastify";

type Inputs = {
	email: string;
	password: string;
	username: string;
};

const Register = () => {
	const { setToken } = useStore();
	const navigate = useNavigate();

	const onRegister = (data: Inputs) => {
		try {
			register(data.email, data.password, data.username)
				.then((res) => {
					setToken(res.token);
					navigate("/", { replace: true });
					toast.success("Created account successfully");
				})
				.catch((error) => toast.error(error.message));
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<main className={"h-dvh w-dvw flex items-center justify-center"}>
			<div className={"flex flex-col gap-10"}>
				<div className={"text-center"}>
					<h1 className={"text-2xl"}>Register</h1>
				</div>
				<Form onSubmit={onRegister} type={"register"} />
				<div className={"text-center"}>
					Log into existing account{" "}
					<NavLink className={"text-blue-500"} to={"/login"}>
						here.
					</NavLink>
				</div>
			</div>
		</main>
	);
};
export default Register;
