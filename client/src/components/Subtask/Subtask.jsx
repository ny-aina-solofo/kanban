import React,{ useState ,useEffect } from 'react'

const Subtask = ({subtasks}) => {

    return(
        <div>
            <div className="mt-3 ">
                {subtasks.map((sub) =>
                    <li key={sub.id_subtask} 
                        style={{
                            display : 'flex',
                            listStyle: 'none',
                            marginBottom: '8px',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                        }}
                    > 
                        <div className="d-flex align-items-center ms-3">
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