import { openModal } from "../../redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTask } from "../../redux/boardSlice";
import { openInput } from "../../redux/inputSlice";

const DropdownTask = ({tasks}) => {
    const dispatch = useDispatch();
    const selectedTask = useSelector((state) => state.boards.selectedTask);
    
    return (
        <div>
            <div className="dropdown">
                <i 
                    className="bi bi-three-dots mx-2" type="button" 
                    data-bs-toggle="dropdown" aria-expanded="false"
                >
                </i>
                <ul className="dropdown-menu" >
                    <li 
                        className="dropdown-item" type="button"
                        onClick={() => dispatch(openInput("addSubtask"))} 
                    >
                    ajouter sous-tâches
                    </li>
                    <li 
                        className="dropdown-item " type="button" 
                        onClick={() =>{
                            dispatch(openModal("deleteTaskModal"));
                            dispatch(setSelectedTask(selectedTask));
                        }}
                    >
                    supprimer
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DropdownTask;
