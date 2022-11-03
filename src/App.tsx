import React from "react"
import { Provider } from "react-redux"
import store from "./Redux/reducers/rootReducer"
import { BrowserRouter } from "react-router-dom"
import RouterManager from "./RouterManager"
import ModalProvider from "./Provider/ModalProvider/ModalProvider"
import Layout from "./Component/Layout/Layout"

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Layout>
            <ModalProvider />
            <RouterManager />
          </Layout>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
