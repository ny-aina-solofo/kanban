import { SubtaskType } from '@/types';
import React,{ useState ,useLayoutEffect } from 'react'

interface ProgressBarProps {
    subtasks:SubtaskType[];
} 

const ProgressBar = ({subtasks}:ProgressBarProps) => {
    const [count,setCount] = useState(0);
    const [subtask, setSubtask] = useState<SubtaskType[]>([]);
    
    useLayoutEffect(() => {
        setSubtask(subtasks);
        const initialCount = subtasks.filter((sub:SubtaskType) => sub.done).length; 
        setCount(initialCount);
    }, [subtasks]);

    const totalSubtasks = subtask.length;
    const progressValue = totalSubtasks > 0 ? ( count / totalSubtasks) * 100 : 0 ;
    
    return(
        <div>
            <div 
                className="progress mt-3" role="progressbar"  style={{height:'5px'}}   
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
