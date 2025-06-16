export type Input = {
  open: boolean;
}

export type InputState = {
  addColumn: Input;
  editDescription: Input;
  editTitle: Input;
  addSubtask: Input;
}
export type InputKey = keyof InputState;
  