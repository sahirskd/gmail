import React from 'react'
import './SidebarOption.css'
import { useNavigate } from "react-router-dom";


function SidebarOption({ title, Icon, number, selected, navigateTo }) {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(navigateTo)} className={selected ? "sidebar__option active" : "sidebar__option"}>
            <Icon fontSize="small" />
            <h4>{title}</h4>
            <p>{number}</p>
        </div>
    )

}
export default SidebarOption;
