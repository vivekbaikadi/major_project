import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './InUp.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductDetails from './Pages/ProductDetails';
import ShoppingApp from './Components/ShoppingApp';
import CartView from './Pages/CartView';
import SignIn from './Pages/SignIn';
import MyList from './Pages/MyList';
import { createContext, useEffect, useState } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React from 'react';
import PaymentHistory from './Pages/PaymentHistory';
import AllProducts from './Pages/AllProducts';
// import MobileNavbar from './Components/MobileNavbar';

const MyContext = createContext();


function App() {
  const [isLogin, setisLogin] = useState(false);
  const [isHeaderShow, setisHeaderShow] = useState(true);
  const [isFooterShow, setisFooterShow] = useState(true);
  const [isOpenProductModel, setisOpenProductModel] = useState({
    id: '',
    open: false
  });

  const [alertBox, setAlertBox] = React.useState({
    msg: '',
    error: true,
    open: false
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: ""
  })

  // useEffect(()=>{
  //   const token = localStorage.getItem("token");

  //   if(token!=="" && token!==undefined && token!==null){
  //     setisLogin(true);

  //     const userData =JSON.parse(localStorage.getItem("user"));

  //     setUser(userData);
  //   }else{
  //     setisLogin(false);
  //   }
  // },[isLogin]);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token !== "" && token !== "undefined" && token !== "null") {
      setisLogin(true);

      const userData = JSON.parse(localStorage.getItem("user"));

      if (userData && userData.userId) {
        setUser(userData);
      } else {
        console.error("❌ User data is missing userId!");
      }
    } else {
      setisLogin(false);
    }
  }, [isLogin]);



  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertBox({
      open: false,
    });
  };

  const values = {
    isHeaderShow,
    setisHeaderShow,
    isFooterShow,
    setisFooterShow,
    isLogin,
    setisLogin,
    isOpenProductModel,
    setisOpenProductModel,
    alertBox,
    setAlertBox
  }

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertBox.error === false ? "success" : "error"}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>
        {
          isHeaderShow === true && <Header />
        }
        {/* <MobileNavbar/> */}
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/scan" exact={true} element={<ShoppingApp />} />
          <Route path="/cart" exact={true} element={<CartView />} />
          <Route path="/signIn" exact={true} element={<SignIn />} />
          <Route path="/my-list" exact={true} element={<MyList />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/products" element={<AllProducts />} />
        </Routes>
        {
          isFooterShow === true && <Footer />
        }


      </MyContext.Provider>
    </BrowserRouter>

  );
}

export default App;

export { MyContext }