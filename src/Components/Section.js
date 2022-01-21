import React from 'react'
import './Section.css'

function Section({Icon, title, selected, color}) {
  
    return (
        <div
         className={`emailList__section ${selected && "section--selected"}`} 
         style={{
             borderBottom: `${selected ? '3px' : '0px'} solid ${color}`,
             color: `${selected ? color : "#5f6368"}`,
         }}>
            <Icon fontSize="small" />
            <h5>{title}</h5>
        </div>
    )
}

export default Section
