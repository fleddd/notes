import deleteImg from "../../../assets/delete.svg";
import { motion } from "framer-motion";
type DeleteProps = {
	size: number;
	onClick?: () => void;
};

const Checkbox = ({ size, onClick }: DeleteProps) => {
	return (
		<motion.img
			whileTap={{ scale: 0.9 }}
			src={deleteImg}
			height={size}
			width={size}
			alt={"Checkbox"}
			onClick={onClick}
			className={"cursor-pointer"}
		/>
	);
};

export default Checkbox;
