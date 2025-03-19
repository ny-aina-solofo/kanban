import React,{ useState ,useLayoutEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { closeInput } from "../../redux/inputSlice";

const AddColumnInput = () => {
    const [inputValue,setInputValue] = useState('');
    const dispatch = useDispatch();

    const addColumn = ()=>{
        if (!inputValue) return;
        // dispatch({ type: 'add_item', libelle : inputValue });
        dispatch(closeInput());
        setInputValue('');
    }
    return(
        <div className='mx-3' style={{width:"252px", height:"60px"}}>
            <div>
                <p>&nbsp;</p>
            </div>
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
                />
            </div>
            <div className='d-flex mt-2'>
                <button 
                    className="btn btn-primary" type="button" 
                    onClick={addColumn}
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
export default AddColumnInput;