import React,{ useState ,useLayoutEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { closeInput } from "../../../redux/inputSlice";

const EditDescription = ({initialValue}) => {
    const [inputValue,setInputValue] = useState(initialValue);
    const dispatch = useDispatch();

    const editDescription = ()=>{
        if (!inputValue) return;
        // dispatch({ type: 'add_item', libelle : inputValue });
        dispatch(closeInput());
        setInputValue('');
    }
    return(
        <div className='' >
            <div>
                <textarea 
                    type="text" className="form-control" name="" id="" 
                    aria-describedby="helpId" placeholder="Entrez un description"
                    value={inputValue} onChange={(e)=>setInputValue(e.target.value)}
                />
            </div>
            <div className='d-flex mt-2'>
                <button 
                    className="btn btn-primary" type="button" 
                    onClick={editDescription}
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