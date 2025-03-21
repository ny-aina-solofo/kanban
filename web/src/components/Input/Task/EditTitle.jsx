import React,{ useState ,useLayoutEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { closeInput } from '../../../redux/inputSlice';

const EditTitle = ({initialValue}) => {
    const [inputValue,setInputValue] = useState(initialValue);
    const dispatch = useDispatch();

    const editTitle = ()=>{
        if (!inputValue) return;
        // dispatch({ type: 'add_item', libelle : inputValue });
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
                    onKeyDown={e => e.key === "Enter" ? editTitle() : ""}
                />
            </div>
        </div>
    )
}
export default EditTitle;