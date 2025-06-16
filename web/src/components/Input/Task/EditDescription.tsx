import React,{ useState ,useLayoutEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { closeInput } from "../../../redux/inputSlice";
import { editDescription } from '../../../redux/boardSlice';
import { RootState } from '@/redux/store';

const EditDescription = () => {
    const dispatch = useDispatch();
    const selectedTask = useSelector((state:RootState) => state.boards.selectedTask);    
    const activeBoardId = useSelector((state:RootState) => state.boards.activeBoardId);
    const [inputValue,setInputValue] = useState(selectedTask.description);

    const handleEdit = ()=>{
        // if (!inputValue) return;
        dispatch(editDescription({
            description : inputValue,
            task : selectedTask,
            activeBoardId
        })); 
        dispatch(closeInput());
        setInputValue('');
    }
    return(
        <div className='' >
            <div>
                <textarea 
                    className="form-control" name="" id="" 
                    aria-describedby="helpId" placeholder="Entrez un description"
                    value={inputValue} onChange={(e)=>setInputValue(e.target.value)}
                />
            </div>
            <div className='d-flex mt-2'>
                <button 
                    className="btn btn-primary" type="button" 
                    onClick={handleEdit}
                >
                    sauvegarder
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
export default EditDescription;