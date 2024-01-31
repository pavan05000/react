import React, { useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ChevronCompactRight, EnvelopeFill, LockFill, UnlockFill } from 'react-bootstrap-icons';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm('')
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState([]);
    const [data, setData] = useState([]);

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };
    const handlePasswordChange = (e) => {
        setPasswordShown(e.target.value);
    };

    const onSubmit = (data) => {

        axios.post("http://192.168.1.163:8092/user/send-otp", data)
            .then((response) => {
                setUser(response.data)
                console.log(response.data);
                reset();
                navigate('/otp')
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div>
            {/* linear-gradient(to right, #FF4B2B, #FF416C) */}
            <main className="d-flex w-100 ">
                <div className="container d-flex flex-column">
                    <div className="row vh-100">
                        <div className="col-sm-10 col-md-7 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">
                                <div className="text-center mt-4">
                                    <h1 className="h2">Welcome</h1>
                                    <div className="text-center">
                                        <img src="assets/img/pathbreaker_logo.png" alt="Charles Hall" className="img-fluid rounded-circle " width={150} height={150} />
                                    </div>
                                    <p className="lead">
                                        Sign in to your account to continue
                                    </p>
                                </div>
                                <div className="card" style={{ backgroundColor: "transparent" }}>
                                    <div className="card-body">
                                        <div className="m-sm-6">

                                            <form onSubmit={handleSubmit(onSubmit)} >
                                                <div className="mb-3">
                                                    <label className="form-label"><EnvelopeFill size={25} color='#4C489D' /></label>
                                                    <input className="login__input" type="email" name="emailId" id='emailId' placeholder="Enter your email"
                                                        {...register("emailId", {
                                                            required: "Enter Email",
                                                            pattern: {
                                                                value: "/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/",
                                                                message: "Please check the Email You Entered",
                                                            }
                                                        })}
                                                    />
                                                    {errors.emailId && (<p>{errors.email.message}</p>)}
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label"><i onClick={togglePasswordVisiblity}> {passwordShown ? (
                                                        <UnlockFill size={25} color='#4C489D' />
                                                    ) : (
                                                        <LockFill size={25} color='#4C489D' />
                                                    )}</i></label>
                                                    <input className="login__input" name="password" id='password' placeholder="Enter your password"
                                                        onChange={handlePasswordChange}
                                                        type={passwordShown ? "text" : "password"}
                                                        {...register("password", {
                                                            required: "Enter Password",
                                                            pattern: {
                                                                value: " /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/",
                                                                message: " Please Check Password You Entered"
                                                            }
                                                        })}
                                                    />
                                                    {errors.password && (<p>{errors.password.message}</p>)}
                                                    <br />
                                                    <small style={{ marginTop: "3px" }}>
                                                        <a href="index.html" style={{ color: "black" }}>Forgot password?</a>
                                                    </small>
                                                </div>
                                                <div>
                                                    <label className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue="remember-me" name="remember-me" defaultChecked />
                                                        <span className="form-check-label">
                                                            Remember me next time
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="text-center mt-3" style={{ display: "flex" }}>
                                                    <button className="login__submit" type='submit'>Get Otp <ChevronCompactRight className='button__icon' /></button>

                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>

    )
}

export default Login