import editImg from "../../../assets/edit.svg";
import { motion } from "framer-motion";
type EditProps = {
	size: number;
	onClick?: () => void;
};

const Checkbox = ({ size, onClick }: EditProps) => {
	return (
		<motion.img
			whileTap={{ scale: 0.9 }}
			src={editImg}
			height={size}
			width={size}
			alt={"Checkbox"}
			onClick={onClick}
			className={"cursor-pointer"}
		/>
	);
};

export default Checkbox;
