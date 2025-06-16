export type Modal = {
    open: boolean;
}
  
export type ModalState = {
    addBoardModal: Modal,
    deleteBoardModal: Modal,
    editBoardModal: Modal,
    addTaskModal: Modal,
    deleteTaskModal: Modal,
}

export type ModalKey = keyof ModalState;
  