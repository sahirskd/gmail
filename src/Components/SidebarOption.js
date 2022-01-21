import React from 'react'
import './SidebarOption.css'

function SidebarOption({ title, Icon, number, selected }) {
    return (
        <div className={selected ? "sidebar__option active" : "sidebar__option"}>
            <Icon fontSize="small" />
            <h4>{title}</h4>
            <p>{number}</p>
        </div>
    )
    
}
export default SidebarOption;
