import React,{ useState ,useLayoutEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { closeInput } from '../../../redux/inputSlice';
import { addSubtask } from '../../../redux/boardSlice';
import { RootState } from '@/redux/store';

const AddSubtask = () => {
    const dispatch = useDispatch();
    const [inputValue,setInputValue] = useState('');
    const activeBoardId = useSelector((state:RootState) => state.boards.activeBoardId);
    const selectedTask = useSelector((state:RootState) => state.boards.selectedTask);
    
    const handleAddSubtask = ()=>{
        if (!inputValue) return;
        dispatch(addSubtask({
            libelle : inputValue,
            tasks : selectedTask as any,
            activeBoardId
        })); 
        dispatch(closeInput());
        setInputValue('');
    }
    return(
        <div className=''>
            <div>
                <input 
                    type="text" 
                    className="form form-control"  
                    placeholder="e.g add task" 
                    value={inputValue} 
                    onChange={(e)=> {
                        e.preventDefault();
                        setInputValue(e.target.value);
                    }}
                />
            </div>
            <div className='d-flex mt-2'>
                <button 
                    className="btn btn-primary" type="button" 
                    onClick={handleAddSubtask}
                >
                    Ajouter
                </button>
                <button 
                    className="btn btn-secondary ms-2" type="button" 
                    onClick={()=>dispatch(closeInput())}
                >
                    Annuler
                </button>
            </div>
        </div>
    )
}
export default AddSubtask;