import axios from "axios"; 

export default axios.create({
    baseURL : "http://localhost:3000/kanban-task-api",
    headers: {
        "Content-type": "application/json"
    } 
}); 