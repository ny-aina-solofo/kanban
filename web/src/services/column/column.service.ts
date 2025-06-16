import http from '../http_common';

class ColumnService {
    addColumn(column_name:string,id_board:number){
        return http.post('/add-column',{column_name,id_board});
    }
    deleteColumn(id_column:number){
        return http.delete(`/delete-column/${id_column}`);
    }
    updateColumn(id_column:number,column_name:string){
        return http.put('/update-column',{id_column,column_name});
    }
}

export default new ColumnService();
