import React,{ useState ,useLayoutEffect } from 'react'

const TaskLength = ({tasks}) => {
    const [task, setTask] = useState([]);
    
    useLayoutEffect(() => {
        setTask(tasks);
    }, [tasks]);

    return(
        <div>
            <div className='badge bg-secondary ms-2'>{task.length}</div>
        </div>
    )
}
export default TaskLength;