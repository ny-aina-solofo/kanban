import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import thunkMiddleware from "./thunkMiddleware";

const create = () => {
    const store = {
      getState: vi.fn(() => ({})),
      dispatch: vi.fn()
    }
    const next = vi.fn()
  
    const invoke = action => thunkMiddleware(store)(next)(action)
  
    return { store, next, invoke }
}

export default create;