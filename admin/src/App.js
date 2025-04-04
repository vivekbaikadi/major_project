import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './Login.css';
import Header from './components/Header';
import "bootstrap/dist/css/bootstrap.min.css"
import Sidebar from './components/Sidebar';
import { createContext, useState } from 'react';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ProductUpload from './pages/ProductUpload';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import UserList from './pages/UserList';


const MyContext = createContext();

function App() {

  const [isToggleSidebar, setisToggleSidebar] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [isHideSidebarandHeader, setisHideSidebarandHeader] = useState(false);
  const [user, setuser] = useState({
    name:"",
    email:""
  })
  const [alertBox, setAlertBox] = React.useState({
    msg:'',
    error:true,
    open:false
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertBox({
      open:false,
    });
  };

  const values = {
    isToggleSidebar,
    setisToggleSidebar,
    isLogin,
    setisLogin,
    isHideSidebarandHeader,
    setisHideSidebarandHeader,
    alertBox,
    setAlertBox,
    user,
    setuser
  }
  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertBox.error===false? "success" : "error"}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>
        {
          isHideSidebarandHeader !== true && <Header />
        }

        <div className='main d-flex'>
          {
            isHideSidebarandHeader !== true &&
            <div className={`sidebarWrapper ${isToggleSidebar === true ? 'toggle' : ''}`}>
              <Sidebar />
            </div>
          }


          <div className={`content ${isHideSidebarandHeader === true && 'full'} ${isToggleSidebar === true ? 'toggle' : ''}`}>
            <Routes>
              {/* <Route path='/' exact={true} element={<Dashboard />} /> */}
              <Route path='/products' exact={true} element={<ProductList />} />
              <Route path='/product/upload' exact={true} element={<ProductUpload />} />
              <Route path='/user' exact={true} element={<UserList />} />
              <Route path='/' exact={true} element={<Login />} />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  )
}

export default App;
export { MyContext };