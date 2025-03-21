import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { closeModal, openModal } from '../../../redux/modalSlice';
import { useSelector, useDispatch } from "react-redux";

const AddTaskModal = () => {
    const [taskName,setTaskName]= useState('');
    const [description,setDescription] = useState('');
    const dispatch = useDispatch();
    const selectedBoard = useSelector((state) => state.boards.selectedBoard);    
    const columns = selectedBoard?.column || [] ;

    const handleAddTask = ()=>{
        setTaskName('');
        setDescription('');
        dispatch(closeModal());
    }
    
    return(
        <div>
            <Modal show={openModal} onHide={closeModal} backdrop="static" keyboard={false}>
                <Modal.Header >
                    <Modal.Title className='fw-bold'>Ajoutez une tâche</Modal.Title>
                    <button className="btn-close" type="button" onClick={()=>{
                        dispatch(closeModal());setTaskName('');setDescription('');
                    }}> 
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <label className="form-label">Nom</label>
                        <input 
                            type="text" className="form-control" name="" id="" 
                            aria-describedby="helpId" placeholder="Entrez un nom"
                            value={taskName} onChange={(e)=>setTaskName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea 
                            type="text" className="form-control" name="" id="" 
                            aria-describedby="helpId" placeholder="Entrez un description"
                            value={description} onChange={(e)=>setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Statut</label>
                        <select className="form-select" name="" id="">
                            {columns.map(col => (
                                <option 
                                    key={col.id_column}
                                    value={col.column_name}
                                >
                                    {col.column_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label className='form-label'>Ajouter Sous-tâches</label>
                        <div className="d-flex flex-row">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="" id="" aria-describedby="helpId" 
                                // value={sub.libelle}
                            />
                            <i className="bi bi-x-lg ms-2 mt-2" type="button"></i>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn btn-primary form form-control" 
                        onClick={handleAddTask}
                    >
                        Enregistrer
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default AddTaskModal;