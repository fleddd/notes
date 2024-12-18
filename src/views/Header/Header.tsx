import { motion } from "framer-motion";
import { useState } from "react";
import ModalContext from "../Modal/ModalContext.tsx";
import UserData from "./components/userdata.tsx";
import NewNote from "./components/NewNote.tsx";
import Search from "./components/search.tsx";

const Header = () => {
	const [isUserModalOpened, setIsUserModalOpened] = useState(false);
	const [isNewNoteModalOpened, setIsNewNoteModalOpened] = useState(false);
	const toggleUserModal = () => setIsUserModalOpened((prev) => !prev);
	const toggleNewNoteModal = () => setIsNewNoteModalOpened((prev) => !prev);
	return (
		<header
			className={
				"flex justify-between items-center px-5 sm:px-20 py-3 gap-5 sm:gap-10 sm:min-h-14 w-dvw shadow-md "
			}
		>
			<ModalContext
				isModalOpened={isUserModalOpened}
				setIsModalOpened={setIsUserModalOpened}
			>
				<UserData toggleModal={toggleUserModal} />
			</ModalContext>

			<ModalContext
				isModalOpened={isNewNoteModalOpened}
				setIsModalOpened={setIsNewNoteModalOpened}
			>
				<NewNote toggleModal={toggleNewNoteModal} />
			</ModalContext>


			<Search/>

			<div className={"flex gap-2"}>
				<motion.button
					onClick={toggleNewNoteModal}
					whileHover={{
						scale: 1.02,
						backgroundColor: "#242424",
						color: "#ffffff",
						transition: { duration: 0.2 },
					}}
					whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
					className={"text-xs border-2 px-3 py-2 rounded-3xl border-black"}
					type={"button"}
				>
					Add
				</motion.button>
				<motion.button
					onClick={toggleUserModal}
					whileHover={{
						scale: 1.02,
						backgroundColor: "#242424",
						color: "#ffffff",
						transition: { duration: 0.2 },
					}}
					whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
					className={"text-xs border-2 px-3 py-2 rounded-3xl border-black"}
					type={"button"}
				>
					Profile
				</motion.button>
			</div>
		</header>
	);
};
export default Header;
