import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allAction } from "../../Redux/allAction"
import { ApplicationState } from "../../Redux/reducers/rootReducer"

const DeleteTodoModal: React.FC = (props: any) => {
  const dispatch = useDispatch()

  const ModalData = useSelector((state: ApplicationState) => {
    return state.modalControllerReducer.data
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const closeModal = (): void => {
    dispatch({ type: allAction.CLOSE_MODAL })
  }

  const confirmRemove = (): void => {
    dispatch({
      type: allAction.DELETE_ITEM,
      data: ModalData,
    })

    closeModal()
  }

  return (
    <div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className={["modal", "modal-open"].join(" ")}>
        <div className="modal-box">
          <div>
            Are you sure you want to remove
            <div className="py-1 px-2 border-gray-200 border rounded-lg my-2">
              {"#" + ModalData}
            </div>
          </div>
          <div className="modal-action">
            <button onClick={() => confirmRemove()}>
              <label
                htmlFor="my-modal-2"
                className={["btn btn-primary", isLoading ? "loading" : ""].join(
                  " "
                )}>
                Confirm
              </label>
            </button>

            <button onClick={() => closeModal()}>
              <label htmlFor="my-modal-2" className="btn">
                Close
              </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DeleteTodoModal
