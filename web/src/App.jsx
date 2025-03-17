import { Board,ViewTask,Sidebar,Navbar } from "./components";
import { Routes, Route, useNavigate } from "react-router";

const KanbanTaskApp = () => {
    return (
        <div>
            <Sidebar />
            <Navbar/>
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
