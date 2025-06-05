import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

interface ColumnProps {
    columns: any;
    setColumns:(columns:any)=>void;
}


const EditColumn = ({columns,setColumns}:ColumnProps) => {
    const editColumn = (index:number,value:string)=>{
        let newArray:any = [];
        columns.forEach((col:any,i:number) => {
            if (i === index) {
                newArray.push({...col,column_name : value});
            } else {
                newArray.push(col);
            }
        });
        setColumns(newArray);
    }
    
    const deleteColumn = (id_column:number)=>{
        setColumns(columns.filter((col:any) => col.id_column !== id_column));
    }
    
    return(
        <div>
            {columns.length > 0 ? (
                <div className="">
                    {columns.map((col:any,index:number) => (
                        <div 
                            key={col.id_column} 
                            className='mb-3'
                        >
                            <div className="d-flex flex-row">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="" id="" aria-describedby="helpId" 
                                    value={col.column_name}
                                    onChange={(e)=>editColumn(index,e.target.value)}
                                />
                                <button 
                                    type='button'
                                    className='btn btn-danger ms-2 mt-2' 
                                    onClick={()=>deleteColumn(col.id_column)} 
                                >    
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div></div>
            )}
        </div>            
    )
}

export default EditColumn;