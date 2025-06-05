import React,{ useState ,useLayoutEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { closeInput } from '../../../redux/inputSlice';
import { editTitle } from '../../../redux/boardSlice';

const EditTitle = () => {
    const dispatch = useDispatch();
    const selectedTask = useSelector((state:any) => state.boards.selectedTask);    
    const activeBoardId = useSelector((state:any) => state.boards.activeBoardId);
    const [inputValue,setInputValue] = useState(selectedTask.title);
    
    const handleEdit = ()=>{
        // if (!inputValue) return;
        dispatch(editTitle({
            title : inputValue,
            task : selectedTask,
            activeBoardId
        })); 

        dispatch(closeInput());
        setInputValue('');
    }
    return(
        <div className='' >
            <div>
                <input 
                    type="text" 
                    className="form form-control"  
                    placeholder="Nom de la colonne" 
                    value={inputValue} 
                    onChange={(e)=> {
                        e.preventDefault();
                        setInputValue(e.target.value);
                    }}
                    onKeyDown={e => e.key === "Enter" ? handleEdit() : ""}
                />
            </div>
        </div>
    )
}
export default EditTitle;