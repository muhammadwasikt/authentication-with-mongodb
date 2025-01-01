// import {Routes , Route} from 'react-router';
import { Route, Routes } from 'react-router';
import { routes } from './routes';
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {
          routes.map((item, index) => <Route key={index} path={item.path} element={item.element} >
            {item?.children?.map((item, index) => <Route key={index} path={item.path} element={item.element} />)}
          </Route>)
        }
      </Routes>
    </>
  )
}

export default App
