import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { openModal,closeModal } from '../../../redux/modalSlice';
import { useSelector, useDispatch } from "react-redux";
import { editBoard } from '../../../redux/boardSlice';

const EditBoardModal = () => {
    const dispatch = useDispatch();
    const selectedBoard = useSelector((state) => state.boards.selectedBoard);    
    const [boardName,setBoardName]= useState(selectedBoard.board_name);
    const columns = selectedBoard?.column || [] ;
    const [columnName, setColumnName] = useState('');

    const handleEditBoard = (id_board)=>{
        dispatch(editBoard({id_board,boardName}))
        dispatch(closeModal());
        console.log(id_board);
    }
 
    return(
        <div>
            <Modal show={openModal} onHide={closeModal} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <header className='mb-4 d-flex justify-content-between'>
                        <h5 className='fw-bold mb-4'>Modifier {selectedBoard.board_name}</h5>
                        <button className="btn-close" type="button" onClick={()=>{
                                dispatch(closeModal());setBoardName('');
                            }}> 
                        </button>
                    </header>
                    <div className="mb-4">
                        <label className="form-label">Nom</label>
                        <input 
                            type="text" className="form-control" name="" id="" 
                            aria-describedby="helpId" 
                            value={boardName} 
                            onChange={(e)=>setBoardName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Colonnes</label>
                        {columns.length > 0 ? (
                            <div className="">
                                {columns.map(col => (
                                    <div 
                                        key={col.id_column} 
                                        className='mb-3'
                                    >
                                        <div className="d-flex flex-row">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="" id="" aria-describedby="helpId" 
                                                value={columnName || col.column_name}
                                                onChange={(e)=>setColumnName(e.target.value)}
                                            />
                                            <i className="bi bi-x-lg ms-2 mt-2" type="button"></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <button 
                        className='btn btn-primary form form-control' 
                        onClick={()=>{
                            handleEditBoard(selectedBoard.id_board);
                        }}
                    >
                        Enregistrer
                    </button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditBoardModal;