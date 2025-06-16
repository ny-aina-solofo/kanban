import http from '../http_common';

class TaskService {
    addTask(title:string,description:string,id_column:number){
        return http.post('/add-task',{title,description,id_column});
    }
    deleteTask(id_task:number){
        return http.delete(`/delete-task/${id_task}`);
    }
    updateTask(id_task:number,title:string,description:string,status:string){
        return http.put('/update-task',{id_task,title,description,status});
    }
    updateStatus(id_task:number,status:string){
        return http.put('/update-status',{id_task,status});
    }
}

export default new TaskService();
