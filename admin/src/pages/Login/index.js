

// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MyContext } from "../../App";
// import { postData } from "../../utils/api";

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const context = useContext(MyContext);
//     const navigate = useNavigate();

//     const [formFields, setformFields] = useState({
//         email: "",
//         password: "",
//         isAdmin: true
//     })

//     useEffect(() => {
//         context.setisHideSidebarandHeader(true);
//     }, [context]);

//     const onChangeInput = (e) => {
//         setformFields(() => ({
//             ...formFields,
//             [e.target.name]: e.target.value
//         }))
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         postData("/api/user/signin", formFields)
//             .then((res) => {
//                 try {
//                     localStorage.setItem("token", res.token);
//                     const user = {
//                         name: res.user?.name,
//                         email: res.user?.email,
//                         userId: res.user?.id,
//                     };
//                     localStorage.setItem("user", JSON.stringify(user));
//                     context.setAlertBox({
//                         open: true,
//                         error: false,
//                         msg: "Login Successful!",
//                     });
//                     window.location.href = "/products";
//                 } catch (error) {
//                     console.log(error);
//                 }
//             })
//             .catch((error) => {
//                 console.log(error.response ? error.response.data : error.message);
//                 setErrorMessage("Invalid login credentials or server error.");
//             });

//     };

//     return (
//         <div className="signin">
//             <div className="login-container">
//                 <div className="login-box">
//                     <h2>Admin Login</h2>
//                     {errorMessage && <div className="error-message">{errorMessage}</div>}
//                     <form onSubmit={handleSubmit}>
//                         <div className="input-container">
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 name="email"
//                                 onChange={onChangeInput}
//                                 required
//                             />
//                             <input
//                                 type="password"
//                                 placeholder="Password"
//                                 name="password"
//                                 onChange={onChangeInput}
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="login-button">Sign In</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;









import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const [formFields, setFormFields] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        context.setisHideSidebarandHeader(true);
    }, [context]);

    const onChangeInput = (e) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use the correct endpoint for admin login
        postData("/api/admin/login", formFields)
            .then((res) => {
                try {
                    localStorage.setItem("token", res.token);
                    const user = {
                        name: res.user?.name,
                        username: res.user?.username,
                        userId: res.user?.id,
                    };
                    localStorage.setItem("user", JSON.stringify(user));
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Login Successful!",
                    });
                    window.location.href = "/products";
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error.response ? error.response.data : error.message);
                setErrorMessage("Invalid login credentials or server error.");
            });
    };

    return (
        <div className="signin">
            <div className="login-container">
                <div className="login-box">
                    <h2>Admin Login</h2>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={onChangeInput}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={onChangeInput}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
