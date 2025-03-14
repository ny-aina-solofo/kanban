import { openModal } from "../../redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";

const DropdownColumn = ({col}) => {
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
                        // onClick={() => dispatch(openModal("editBoardModal"))} 
                    >
                    modifier
                    </li>
                    <li 
                        className="dropdown-item " type="button" 
                        // onClick={() =>{
                        //     dispatch(openModal("deleteBoardModal"));
                        //     dispatch(setSelectedBoard(board));
                        // }}
                    >
                    supprimer
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DropdownColumn;
