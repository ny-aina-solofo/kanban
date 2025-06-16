import http from '../http_common';

class SubtaskService {
    addSubtask(libelle:string,id_task:number){
        return http.post('/add-subtask',{libelle,id_task});
    }
    deleteSubtask(id_subtask:string){
        return http.delete(`/delete-subtask/${id_subtask}`);
    }
    updateSubtask(id_subtask:number,libelle:string){
        return http.put('/update-subtask',{id_subtask,libelle});
    }
    updateDone(id_subtask:number,done:boolean){
        return http.put('/update-done',{id_subtask,done});
    }
}

export default new SubtaskService();
