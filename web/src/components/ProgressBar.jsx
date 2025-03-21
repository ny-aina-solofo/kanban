import React,{ useState ,useLayoutEffect } from 'react'

const ProgressBar = ({subtasks}) => {
    const [count,setCount] = useState(0);
    const [subtask, setSubtask] = useState([]);
    
    useLayoutEffect(() => {
        setSubtask(subtasks);
        const initialCount = subtasks.filter((sub) => sub.done).length; 
        setCount(initialCount);
    }, [subtasks]);

    const totalSubtasks = subtask.length;
    const progressValue = totalSubtasks > 0 ? ( count / totalSubtasks) * 100 : 0 ;
    
    return(
        <div>
            <div 
                className="progress mt-3" role="progressbar" aria-label="Example 10px high" aria-valuenow="25" 
                aria-valuemin="0" aria-valuemax="100" style={{height:'5px'}}   
                >
                <div className="progress-bar" style={{width: `${progressValue}` + '%'}}></div>
            </div>
            {/* <div className='mt-2 d-flex justify-content-between'>
                <small>Progression</small>
                <small>{count}/{subtask.length}</small>
            </div>          */}
        </div>
    )
}
export default ProgressBar;
