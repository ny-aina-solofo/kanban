import React,{ useState ,useLayoutEffect } from 'react'

const Subtask = ({subtasks}) => {
    const [count,setCount] = useState(0);
    useLayoutEffect(() => {
        const initialCount = subtasks.filter((sub) => sub.done).length; 
        setCount(initialCount);
    }, [subtasks]);

    return(
        <div>
            <div> Sous-tâches : {count} sur {subtasks.length} </div>
            <div className="mt-4">
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