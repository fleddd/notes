import Form from "./components/Form.tsx";
import { login, save } from "../../services/auth.ts";
import { useStore } from "../../store/store.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type LoginRequest = {
	email?: string;
	password: string;
	username: string;
};

const Login = () => {
	const { setToken, setEmail, setUsername } = useStore();
	const navigate = useNavigate();

	const onLogin = (data: LoginRequest) => {
		try {
			login(data.username, data.password)
				.then((res) => {
					toast.success("Login successfully");
					setToken(res.token);
					setUsername(res.userName);
					setEmail(res.email);
					save(res.token, res.email, res.userName);
					navigate("/", { replace: true });
				})
				.catch((error) => toast.error(error.message));
		} catch (error) {
			console.log(error)
		}
	};
	return (
		<main className={"h-dvh w-dvw flex items-center justify-center"}>
			<div className={"flex flex-col gap-10"}>
				<div className={"text-center"}>
					<h1 className={"text-2xl"}>Login</h1>
				</div>
				<Form onSubmit={onLogin} type={"login"} />
				<div className={"text-center"}>
					Create account{" "}
					<NavLink className={"text-blue-500"} to={"/register"}>
						here.
					</NavLink>
				</div>
			</div>
		</main>
	);
};
export default Login;
