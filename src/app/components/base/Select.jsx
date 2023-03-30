import React from "react";

export default function Select({className, name, id, label, dataList = [] , onChange}) {
    return(
    <select className={`border-2 border-gradient-v rounded-lg ${className}`} name={name} id={id} onChange={onChange}>
        <option disabled selected hidden>{label}</option>
        {dataList.map(({value, title}) => <option key={value} value={value}>{title}</option>)}
    </select>
)};
