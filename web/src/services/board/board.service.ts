import http from '../http_common';

class BoardService {
    getBoard(){
        return http.get('/get-board',{});
    }
    addBoard(board_name:string){
        return http.post('/add-board',{board_name});
    }
    deleteBoard(id_board:number){
        return http.delete(`/delete-board/${id_board}`);
    }
    updateBoard(id_board:number,board_name:string){
        return http.put('/update-board',{id_board,board_name});
    }
}

export default new BoardService();
