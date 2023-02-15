import React from "react";

const CheckBox = ({ text = "", id = "", value, checked = false, onChange }) => {
	return (
		<div className="">
			<input className="checked:bg-gradient-v border-gradient-v border-2" type="checkbox" name={`checkbox_${id}`} id={`checkbox_${id}`} value={value} onChange={onChange} />
			<span className="ml-1">{text}</span>
		</div>
	);
};

export default CheckBox;
