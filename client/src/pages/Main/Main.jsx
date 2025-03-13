import Board from "../../components/Board/Board";
import ViewTask from "../../components/ViewTask/ViewTask";
import { Routes, Route, useNavigate } from "react-router";

const Main = () => {
    return (
        <div>
            <Routes>
                <Route  
                    path="/"
                    element= {    
                        <Board/>
                    }
                />
                <Route
                    path="/view-task/:id_task"
                    element= {
                        <ViewTask />
                    }
                />
            </Routes>
        </div>
    )
}

export default Main;
