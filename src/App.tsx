import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react/jsx-runtime";
const App = () => {
   return (
   <Fragment>
      <ToastContainer/>
         <RouterProvider router={createBrowserRouter(router)} />
   </Fragment>
   )
}

export default App;
