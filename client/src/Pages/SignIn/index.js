

import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../App";
import Log from '../../assets/images/log.svg';
import Register from '../../assets/images/register.svg';
import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { postData } from "../../utils/api";

import { signIn, signUp } from "../../utils/api"; // ✅ Import API functions


const SignIn = () => {
    const context = useContext(MyContext);
    const containerRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Separate states for sign-in and sign-up forms
    const [signInFields, setSignInFields] = useState({
        email: "",
        password: ""
    });

    const [signUpFields, setSignUpFields] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    });

    // Handle input change for sign-in fields
    const onChangeSignIn = (e) => {
        setSignInFields({
            ...signInFields,
            [e.target.name]: e.target.value
        });
    };

    // Handle input change for sign-up fields
    const onChangeSignUp = (e) => {
        setSignUpFields({
            ...signUpFields,
            [e.target.name]: e.target.value
        });
    };

    // Sign-in form submission handler
    // const handleSignIn = (e) => {
    //     e.preventDefault();


    //     postData("/api/user/signin", signInFields)
    //         .then((res) => {
    //             console.log("API Response:", res); // Debugging API response

    //             if (!res || !res.token || !res.user) {
    //                 console.error("Invalid API response:", res);
    //                 throw new Error("Invalid response from server");
    //             }

    //             localStorage.setItem("token", res.token);

    //             const user = {
    //                 name: res.user?.name || "",
    //                 email: res.user?.email || "",
    //                 userId: res.user?.id || res.user?._id || "",  // Ensure correct key
    //             };

    //             if (!user.userId) {
    //                 console.error("userId is missing in API response:", res.user);
    //             }

    //             localStorage.setItem("user", JSON.stringify(user));

    //             context.setAlertBox({
    //                 open: true,
    //                 error: false,
    //                 msg: "Signed in successfully!",
    //             });

    //             setSignInFields({ email: "", password: "" });

    //             // Redirect or other post-login logic
    //             window.location.href = "/";
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error.response ? error.response.data : error.message);
    //             setErrorMessage("Invalid login credentials or server error.");
    //             context.setAlertBox({
    //                 open: true,
    //                 error: true,
    //                 msg: "Login failed. Please check your credentials.",
    //             });
    //         });

    // };

    //important
    // const handleSignIn = async (e) => {
    //     e.preventDefault();
    
    //     try {
    //         const res = await postData("/api/user/signin", signInFields); // Use postData
    
    //         console.log("🔹 API Response:", res); // Debugging API response
    
    //         if (!res || !res.token || !res.user) {
    //             console.error("❌ Invalid API response:", res);
    //             setErrorMessage(res.message || "Invalid response from server");
    //             return;
    //         }
    
    //         // ✅ Store the token
    //         localStorage.setItem("token", res.token);
    
    //         // ✅ Store user data
    //         const user = {
    //             name: res.user?.name || "",
    //             email: res.user?.email || "",
    //             userId: res.user?.id || res.user?._id || "",  // Ensure correct key
    //         };
    
    //         if (!user.userId) {
    //             console.error("⚠️ userId is missing in API response:", res.user);
    //         }
    
    //         localStorage.setItem("user", JSON.stringify(user));
    
    //         context.setAlertBox({
    //             open: true,
    //             error: false,
    //             msg: "Signed in successfully!",
    //         });
    
    //         setSignInFields({ email: "", password: "" });
    
    //         // ✅ Redirect to home page
    //         window.location.href = "/";
    //     } catch (error) {
    //         console.error("❌ Sign-In Error:", error);
    //         setErrorMessage(error.message || "Invalid login credentials or server error.");
    //         context.setAlertBox({
    //             open: true,
    //             error: true,
    //             msg: "Login failed. Please check your credentials.",
    //         });
    //     }
    // };
    

    const handleSignIn = async (e) => {
        e.preventDefault();
    
        try {
            const res = await signIn(signInFields); // ✅ Use signIn() from api.js
    
            console.log("🔹 Full API Response:", JSON.stringify(res, null, 2)); // 🔎 Log full API response
    
            if (!res?.success || !res?.token || !res?.user) {
                console.error("❌ Invalid API response:", res);
                setErrorMessage(res?.message || "Invalid response from server");
                return;
            }
    
            // ✅ Store token & user data safely
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify({
                name: res.user.name || "",
                email: res.user.email || "",
                userId: res.user.id || res.user._id || "", // Ensure correct key
            }));
    
            // ✅ Show success alert
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Signed in successfully!",
            });
    
            // ✅ Clear input fields
            setSignInFields({ email: "", password: "" });
    
            // ✅ Redirect user
            window.location.href = "/";
        } catch (error) {
            console.error("❌ Sign-In Error:", error);
            setErrorMessage(error?.response?.data?.message || "Invalid login credentials or server error.");
    
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Login failed. Please check your credentials.",
            });
        }
    };
    
    
    
    
    

    //important
    // const handleSignUp = async (e) => {
    //     e.preventDefault();

    //     // Validate input fields before submitting
    //     if (!signUpFields.name || !signUpFields.phone || !signUpFields.email || !signUpFields.password) {
    //         context.setAlertBox({
    //             open: true,
    //             error: true,
    //             msg: "Please fill in all fields."
    //         });
    //         return;
    //     }

    //     try {
    //         const res = await postData("/api/user/signup", signUpFields);

    //         // If response is successful (status 200)
    //         context.setAlertBox({
    //             open: true,
    //             error: false,
    //             msg: "Registered Successfully!",
    //         });
    //         setSignUpFields({ name: "", phone: "", email: "", password: "" }); // Clear fields
    //     } catch (error) {
    //         // Check for specific error status
    //         if (error.response && error.response.status === 409) {
    //             context.setAlertBox({
    //                 open: true,
    //                 error: true,
    //                 msg: "User already exists. Please use a different email.",
    //             });
    //         } else {
    //             console.log("Error:", error.response ? error.response.data : error.message);
    //             context.setAlertBox({
    //                 open: true,
    //                 error: true,
    //                 msg: "Sign-up failed. Please try again.",
    //             });
    //         }
    //     }
    // };



    // const handleSignUp = async (e) => {
    //     e.preventDefault();
    
    //     // ✅ Validate input fields before submitting
    //     if (!signUpFields.name || !signUpFields.phone || !signUpFields.email || !signUpFields.password) {
    //         context.setAlertBox({
    //             open: true,
    //             error: true,
    //             msg: "Please fill in all fields."
    //         });
    //         return;
    //     }
    
    //     try {
    //         const res = await postData("/api/user/signup", signUpFields);
    //         console.log("🔹 Signup Response:", res);
    
    //         context.setAlertBox({
    //             open: true,
    //             error: false,
    //             msg: "Registered Successfully!",
    //         });
    
    //         setSignUpFields({ name: "", phone: "", email: "", password: "" }); // ✅ Clear fields
    //     } catch (error) {
    //         console.log("❌ Signup Error:", error.response ? error.response.data : error.message);
    
    //         if (error.response && error.response.status === 409) {
    //             context.setAlertBox({
    //                 open: true,
    //                 error: true,
    //                 msg: "User already exists. Please use a different email.",
    //             });
    //         } else {
    //             context.setAlertBox({
    //                 open: true,
    //                 error: true,
    //                 msg: "Sign-up failed. Please try again.",
    //             });
    //         }
    //     }
    // };
    
    
    




    // useEffect(() => {
    //     // Hide header and footer when this component mounts
    //     context.setisHeaderFooterShow(false);

    //     const signInBtn = document.querySelector("#sign-in-btn");
    //     const signUpBtn = document.querySelector("#sign-up-btn");
    //     const container = containerRef.current;

    //     signUpBtn.addEventListener("click", () => {
    //         container.classList.add("sign-up-mode");
    //     });

    //     signInBtn.addEventListener("click", () => {
    //         container.classList.remove("sign-up-mode");
    //     });

    //     return () => {
    //         signUpBtn.removeEventListener("click", () => container.classList.add("sign-up-mode"));
    //         signInBtn.removeEventListener("click", () => container.classList.remove("sign-up-mode"));
    //     };
    // }, [context]);


    const handleSignUp = async (e) => {
        e.preventDefault();
    
        // ✅ Validate input fields before submitting
        if (!signUpFields.name || !signUpFields.phone || !signUpFields.email || !signUpFields.password) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill in all fields."
            });
            return;
        }
    
        try {
            const res = await signUp(signUpFields); // ✅ Use signUp() from api.js
            console.log("🔹 Signup Response:", res);
    
            if (!res?.success) {
                throw new Error(res?.message || "Registration failed");
            }
    
            // ✅ Show success alert
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Registered Successfully!",
            });
    
            // ✅ Clear form fields
            setSignUpFields({ name: "", phone: "", email: "", password: "" });
    
        } catch (error) {
            console.log("❌ Signup Error:", error.response ? error.response.data : error.message);
    
            const errorMessage = error?.response?.data?.message || "Sign-up failed. Please try again.";
    
            if (error?.response?.status === 409) {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "User already exists. Please use a different email.",
                });
            } else {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: errorMessage,
                });
            }
        }
    };
    

    useEffect(() => {
        // ✅ Hide header and footer
        context.setisHeaderShow(false);
        context.setisFooterShow(false);
    
        const signInBtn = document.querySelector("#sign-in-btn");
        const signUpBtn = document.querySelector("#sign-up-btn");
        const container = containerRef.current;
    
        const handleSignUpClick = () => container.classList.add("sign-up-mode");
        const handleSignInClick = () => container.classList.remove("sign-up-mode");
    
        signUpBtn.addEventListener("click", handleSignUpClick);
        signInBtn.addEventListener("click", handleSignInClick);
    
        return () => {
            signUpBtn.removeEventListener("click", handleSignUpClick);
            signInBtn.removeEventListener("click", handleSignInClick);
        };
    }, [context]);

    

    return (
        <section className="sections signIn">
            <div className="container" ref={containerRef}>
                <div className="forms-container">
                    <div className="signin-signup">
                        {/* Sign In Form */}

                        <form className="sign-in-form" onSubmit={handleSignIn}>
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={signInFields.email}
                                    onChange={onChangeSignIn}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={signInFields.password}
                                    onChange={onChangeSignIn}
                                />
                            </div>
                            <a className="border-effect forgot_pass mt-2">Forgot Password?</a>
                            <input type="submit" value="Login" className="btn solid mt-2" />
                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon"><FaFacebookF /></a>
                                <a href="#" className="social-icon"><FaTwitter /></a>
                                <a href="#" className="social-icon"><FaGoogle /></a>
                                <a href="#" className="social-icon"><FaLinkedinIn /></a>
                            </div>
                        </form>

                        {/* Sign Up Form */}
                        <form className="sign-up-form" onSubmit={handleSignUp}>
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="name"
                                    value={signUpFields.name}
                                    onChange={onChangeSignUp}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    placeholder="Phone number"
                                    name="phone"
                                    value={signUpFields.phone}
                                    onChange={onChangeSignUp}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={signUpFields.email}
                                    onChange={onChangeSignUp}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={signUpFields.password}
                                    onChange={onChangeSignUp}
                                />
                            </div>
                            <input type="submit" className="btn" value="Sign up" />
                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon"><FaFacebookF /></a>
                                <a href="#" className="social-icon"><FaTwitter /></a>
                                <a href="#" className="social-icon"><FaGoogle /></a>
                                <a href="#" className="social-icon"><FaLinkedinIn /></a>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>Welcome to our platform!</p>
                            <button className="btn transparent" id="sign-up-btn">Sign up</button>
                        </div>
                        <img className="image" src={Log} alt="LogIn illustration" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>Welcome back! Sign in to continue.</p>
                            <button className="btn transparent" id="sign-in-btn">Sign in</button>
                        </div>
                        <img className="image" src={Register} alt="Register illustration" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
