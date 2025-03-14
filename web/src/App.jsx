import { Board,ViewTask,Sidebar } from "./components";
import { Routes, Route, useNavigate } from "react-router";

const KanbanTaskApp = () => {
    return (
        <div>
            <Sidebar />
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

export default KanbanTaskApp;
