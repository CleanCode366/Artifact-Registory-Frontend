import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useCsrf } from "./hooks/useCsrf";

function App() {
  useCsrf();
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
export default App;
