import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { closeModal, openModal } from '../../../redux/modalSlice';
import { useSelector, useDispatch } from "react-redux";
import { addTask } from '../../../redux/boardSlice';
import { RootState } from '@/redux/store';
import { BoardType, ColumnType, SubtaskType } from '@/types';

const AddTaskModal = () => {
    const dispatch = useDispatch();
    const boards = useSelector((state:RootState) => state.boards.boards);
    const activeBoardId = useSelector((state:RootState) => state.boards.activeBoardId);
    const activeBoard = boards.find((board:BoardType) => board.id_board === activeBoardId);
      
    const [taskName,setTaskName] = useState('');
    const [description,setDescription] = useState('');
    const [subtasks, setSubtasks] = useState<string[]>([]);
    const columns = activeBoard?.column || [] ;
    const [status, setStatus] = useState(columns.length > 0 ? columns[0].id_column : '');    
    const showTaskModal = useSelector((state:RootState) => state.modal.addTaskModal);

    const handleAddTask = ()=>{
        // console.log(taskName,description,status,subtasks,activeBoardId);        
        dispatch(addTask({
            taskName,
            description,
            id_column : parseInt(status),
            subtasks,
            id_board : activeBoardId
        }));
        setTaskName('');
        setDescription('');
        dispatch(closeModal('addTaskModal'));
    }

    const editSubtask = (index:number,value:any)=>{
        const newSubtasks = [...subtasks];
        newSubtasks[index] = value;
        setSubtasks(newSubtasks);
    }
    
    const deleteSubtask = (id_subtask:number)=>{
        setSubtasks(subtasks.filter((sub:any) => sub.id_subtask !== id_subtask));
    }
    
    return(
        <div>
            <Modal show={showTaskModal.open} onHide={()=>dispatch(closeModal('addTaskModal'))} backdrop="static" keyboard={false}>
                <Modal.Header >
                    <Modal.Title className='fw-bold'>Ajoutez une tâche</Modal.Title>
                    <button className="btn-close" type="button" onClick={()=>{
                        dispatch(closeModal('addTaskModal'));setTaskName('');setDescription('');
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
                            className="form-control" name="" id="" 
                            aria-describedby="helpId" placeholder="Entrez un description"
                            value={description} onChange={(e)=>setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Statut</label>
                        <select 
                            className="form-select" 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {columns.map((col:ColumnType) => (
                                <option key={col.id_column} value={col.id_column}>
                                    {col.column_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label className='form-label'>Ajouter des tâches secondaires</label>     
                        {subtasks.map((sub:any,index:number) => (
                            <div 
                                key={index} 
                                className='mb-3'
                            >
                                <div className="d-flex flex-row">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="" id="" aria-describedby="helpId" 
                                        value={sub}
                                        onChange={(e)=>editSubtask(index,e.target.value)}
                                    />
                                    <button 
                                        type='button'
                                        className='btn btn-danger ms-2 mt-2' 
                                        onClick={()=>deleteSubtask(sub.id_subtask)} 
                                    >    
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div 
                            style={{cursor:"pointer"}}
                            className='mt-2' 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSubtasks([...subtasks, ""]);
                            }} 
                        >    
                            <i className="bi bi-plus"></i>
                            <span className='ms-5'>Ajouter</span>
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