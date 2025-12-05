// import { RouterProvider } from 'react-router-dom';
// import router from './routes';

import { RouterProvider } from "react-router-dom";
import router from "./routes";
import styles from "./App.module.css";

function App() {
  return (
    <div className={`${styles["root-background"]} ${styles["root-background-right"]}`}>
      <RouterProvider router={router} />
    </div>
  )
}
export default App;