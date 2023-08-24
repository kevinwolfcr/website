type FormHandlerState<TResult, TError> =
  | { status: "idle" }
  | { status: "success"; data: TResult }
  | { status: "error"; data: TError }

export class FormHandler<TResult, TError> {
  static INITIAL_STATE = { status: "idle" } as const
  state: FormHandlerState<TResult, TError> = FormHandler.INITIAL_STATE

  getState() {
    const { state } = this
    this.state = FormHandler.INITIAL_STATE
    return state
  }

  succeed(data: TResult) {
    this.state = { status: "success", data }
  }

  fail(data: TError) {
    this.state = { status: "error", data }
  }
}
