import React,{ useState ,useLayoutEffect } from 'react'

const Subtask = ({subtasks}) => {

    return(
        <div>
            <div>Sous-tâches : </div>
            <div className="mt-4" style={{overflowY:"scroll", height:"70px"}}>
                {subtasks.map((sub) =>
                    <li key={sub.id_subtask} 
                        style={{
                            display : 'flex',
                            listStyle: 'none'
                        }}
                    > 
                        <div className="d-flex align-items-center">
                            <input 
                                type="checkbox" 
                                className="form-check-input" 
                                checked={sub.done} 
                                // onChange={()=>updateDone(sub.id_subtask)}
                            />
                            <span className='ms-2' style={{textDecoration: sub.done ? 'line-through' : 'none'}}>
                                {sub.libelle}
                            </span>
                        </div>
                    </li>
                )}
            </div>
        </div>
    )
}
export default Subtask;