import React from 'react'
import './SidebarOption.css'
import { useNavigate } from "react-router-dom";


function SidebarOption({ title, Icon, number, selected, navigateTo }) {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(navigateTo)} className={selected ? "sidebar__option active" : "sidebar__option"}>
            <Icon fontSize="small" />
            <h4 className='sidebar__opTitle'>{title}</h4>
            <p className='sidebar__opNumber'>{number}</p>
        </div>
    )

}
export default SidebarOption;
