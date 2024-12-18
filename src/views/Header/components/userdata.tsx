import { useStore } from "../../../store/store.ts";
import { logout } from "../../../services/auth.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ActionButton } from "../../../components/ui";

type Props = {
	toggleModal: () => void;
};

const UserData = ({ toggleModal }: Props) => {
	const { email, username, resetStore} = useStore();
	const navigate = useNavigate();

	const onLogout = () => {
		toggleModal();
		navigate("/login", { replace: true });
		logout();
		resetStore()
		toast.success("You successfully logged out");
	};
	return (
		<div className={"grow flex flex-col gap-2 justify-between"}>
			<div className={"flex gap-2 flex-col text-black grow"}>
				<div>
					<span className={"font-bold"}>Email: </span>
					<span>{email}</span>
				</div>
				<div>
					<span className={"font-bold"}>Username: </span>
					<span>{username}</span>
				</div>
			</div>
			<div className={"m-auto space-x-2"}>
				<ActionButton onClick={onLogout}>Logout</ActionButton>

				<ActionButton onClick={() => toggleModal()}>Close</ActionButton>
			</div>
		</div>
	);
};

export default UserData;
