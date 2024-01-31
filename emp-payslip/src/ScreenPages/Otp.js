import React, { useState, useRef } from 'react'
import { ChevronCompactRight} from 'react-bootstrap-icons';
import {useForm} from'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Otp = () => { 
   const{register,handleSubmit,formState:{errors}}=useForm()
    const [open,setOpen]=useState([]);
    const[show,setShow]=useState([]);
    // const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    // const [isOtpValid, setIsOtpValid] = useState(false);
    // const otpFieldsRef = useRef([]);
    const navigate=useNavigate();
 
    
    // const handleInput = (index, value) => {
    //     if (/^\d*$/.test(value) && value.length <= 1) {
    //         const newOtpValues = [...otpValues];
    //         newOtpValues[index] = value;
    //         setOtpValues(newOtpValues);
      
    //         // Assume your expected OTP is '123456'
    //         const expectedOtp = '123456';
    //         const enteredOtp = newOtpValues.join('');
      
    //         // Validate OTP
    //         setIsOtpValid(enteredOtp === expectedOtp);
            
    //         // Move to the next input field
    //         if (value.length === 1 && index < otpValues.length - 1) {
    //           otpFieldsRef.current[index + 1].focus();
    //         }
    //       }
    // };

    // const handleBackspace = (index) => {
    //     if (otpValues[index] !== '') {
    //         const newOtpValues = [...otpValues];
    //         newOtpValues[index] = '';
    //         setOtpValues(newOtpValues);
    //     } else if (index > 0) {
    //         otpFieldsRef.current[index - 1].focus();
    //     }
    // };
    const onSubmit = (data) => {
        // Adding logic to handle OTP submission, e.g., navigate to the next page
        axios.post("http://192.168.1.163:8092/employee/login", data)
        .then((response) => { 
            setOpen(response.data)
            sessionStorage.setItem('role',response.data.role)
            sessionStorage.setItem('userId', response.data.userId);
            sessionStorage.setItem('id', response.data.id)
            sessionStorage.setItem('userName', response.data.userName);
            console.log(response.data);
            console.log('OTP submitted successfully!');
            navigate("/main")
           
            
        })
        .catch((error) => {
          console.log(error);
        });
       
      };
    return (
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
                                            <label className="form-label"><b>Enter OTP</b></label>
                                            <input className="login__input" type="text" name="otp" id='otp' placeholder="Enter OTP"
                                                {...register("otp", {
                                                    required: "Enter OTP",
                                                   
                                                })}
                                            />
                                            {errors.otp && (<p>{errors.otp.message}</p>)}
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
    );
}
export default Otp