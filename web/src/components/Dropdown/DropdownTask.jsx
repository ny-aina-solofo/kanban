import { openModal } from "../../redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";

const DropdownTask = ({tasks}) => {
    const dispatch = useDispatch();

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
                        // onClick={() => dispatch(openModal("editTaskModal"))} 
                    >
                    modifier
                    </li>
                    <li 
                        className="dropdown-item " type="button" 
                        // onClick={() =>{
                        //     dispatch(openModal("deleteTaskModal"));
                        //     dispatch(setSelectedTask(tasks));
                        // }}
                    >
                    supprimer
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DropdownTask;
