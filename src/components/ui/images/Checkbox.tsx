import checkboxOn from "../../../assets/checkbox-on.svg";
import checkboxOff from "../../../assets/checkbox-off.svg";

type CheckboxProps = {
	size: number;
	isChecked: boolean;
	onClick?: () => void;
	id?: string;
};

const Checkbox = ({ size, isChecked, onClick, id }: CheckboxProps) => {
	const image = isChecked ? checkboxOn : checkboxOff;

	return (
		<img
			src={image}
			id={id}
			height={size}
			width={size}
			alt={"Checkbox"}
			onClick={onClick}
			className={"cursor-pointer"}
		/>
	);
};

export default Checkbox;
