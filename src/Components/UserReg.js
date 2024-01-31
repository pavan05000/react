import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../ScreenPages/Footer';
import Header from '../ScreenPages/Header';
import SideNav from '../ScreenPages/SideNav';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const UserReg = () => {
  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm('');
  const [stat, setStat] = useState([]);
  const [role, setRole] = useState([]);
  const [user, setUser] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const handlePasswordChange = (e) => {
    setPasswordShown(e.target.value);
  };

  const getStatus = () => {
    axios.get(`http://192.168.1.163:8092/status/all`)
      .then((response) => {
        const statusMapping = {
          1: 'Active',
          2: 'Pending',
          3: 'Inactive'
        };
        console.log(response.data);
        const formattedStatusList = response.data.map(user => ({
          label: user.statusInfo,
          value: user.status,
          name: user.status,
        }));

        setStat(formattedStatusList);
        console.log(formattedStatusList);
      })
      .catch((errors) => {

        console.log(errors)
      });

  };
  const getRole = () => {
    axios.get(`http://192.168.1.163:8092/role/all`)
      .then((response) => {
        setRole(response.data);
        console.log(role);
      })
      .catch((errors) => {

        console.log(errors)
      });

  };

  useEffect(() => {
    getStatus();
    getRole();
  }, [])

  // useEffect(() => {
  //     axios.get(`http://192.168.1.163:8092/role/all`)
  //       .then((response) => {

  //         setRole(response.data);
  //         console.log(response.data)
  //       })
  //       .catch((errors) => {

  //         console.log(errors)
  //       }
  //       );
  //   }, []);    
  // useEffect(() => {
  //   axios.get(`http://192.168.1.163:8092/status/all`)
  //     .then((response) => {
  //       const statusMapping = {
  //         1: 'Active',
  //         2: 'Pending',
  //         3: 'Inactive'
  //       };
  //       setStat(response.data);
  //       console.log(response.data)
  //       console.log(stat);
  //     })
  //     .catch((errors) => {

  //       console.log(errors)
  //     }
  //     );
  // }, []);
  const onSubmit = (data) => {
    if (location && location.state && location.state.userId) {
      axios.put(`http://192.168.1.163:8092/user/${location.state.userId}/`, data)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          navigate('/usersView')
        }).catch((errors) => {

          console.log(errors)

        });
    } else {
      axios.post('http://192.168.1.163:8092/user/registration', data)
        .then((response) => {
          console.log(response.data);

          navigate('/usersView')
        })
        .catch((errors) => {

          console.log(errors)

        });
    };
  }
  useEffect(() => {

    if (location && location.state && location.state.userId) {
      // setIsUpdating(true);
      axios.get(`http://192.168.1.163:8092/user/${location.state.userId}`)
        .then((response) => {
          console.log(response.data);

          reset(response.data);
        })
        .catch((errors) => {

          console.log(errors)

        });
    }
  }, [])
  return (
    <div className='wrapper'>
      <SideNav />
      <div className='main'>
        <Header />
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3"><strong>Users Registration Form</strong> </h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title ">Users Registration</h5>
                    <div className="dropdown-divider" style={{ borderTopColor: "#d7d9dd" }} />
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='row'>
                      <div className='col-12 col-md-6 col-lg-5 mb-3' >
                        <label className="form-label">User ID</label>
                        <input type="text" className={`form-control ${errors.employeeId ? 'is-invalid' : ''}`} placeholder="Enter EmployeeID" name='userId'
                        {...register("userId",{
                          required:"Enter User Id",
                          
                        })}
                        />
                         {errors.userId && (<p className='errorMsg'>{errors.userId.message}</p>)}
                      </div>
                      <div className='col-lg-1'></div>
                      <div className='col-12 col-md-6 col-lg-5 mb-3' >
                        <label className="form-label">UserName</label>
                        <input type="text" className={`form-control ${errors.employeeId ? 'is-invalid' : ''}`} placeholder="Enter EmployeeID" name='userName'
                        {...register("userName",{
                          required:"Enter User Name", 
                        })}
                        />
                         {errors.userName && (<p className='errorMsg'>{errors.userName.message}</p>)}
                      </div>
                      
                      <div className='col-12 col-md-6 col-lg-5 mb-3' >
                        <label className="form-label">Date of Registration</label>
                        <input type="date" name='registrationDate' placeholder="Enter Hiring Date"   className={`form-control ${errors.dateOfHiring ? 'is-invalid' : ''}`} 
                         {...register("registrationDate",{
                          required:true,
                          
                        })}
                        />
                        {errors.registrationDate && (<p className='errorMsg'>Enter Registration Data</p>)}
                      </div>
                      <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">emailId</label>
                          <input type="emailId" className={`form-control ${errors.emailId ? 'is-invalid' : ''}`} placeholder="Enter emailId" name='emailId'
                            {...register("emailId", {
                              required: "Enter emailId",
                              pattern: {
                                value: "/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/",
                                message: "Please check the Email Id You Entered",
                              }
                            })}
                          />
                          {errors.emailId && (<p className='errorMsg'>{errors.emailId.message}</p>)}
                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">Password</label>
                          <input className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Enter Password"
                            onChange={handlePasswordChange}
                            type={passwordShown ? "text" : "password"}
                            {...register("password", {
                              required: "Enter Password",
                              pattern: {
                                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                                message: "Invalid Password"
                              }
                            })}
                          />
                          <i onClick={togglePasswordVisiblity}> {passwordShown ? (
                            <Eye size={20} />
                          ) : (
                            <EyeSlash size={20} />
                          )}</i>
                          {errors.password && (<p className='errorMsg'>{errors.password.message}</p>)}
                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">Status</label>
                          <Controller
                            name="status"
                            control={control}
                            defaultValue=''
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={stat}
                                defaultValue={null}
                                onChange={(data) => {
                                  setValue('status', data ? data.value : '');
                                }}
                              />
                            )}
                          />
                          {errors && errors.status && (
                            <p className="errorMsg">Select Status</p>)}
                        </div>

                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-2' >
                          <label className="form-label">Role</label>
                          <Controller
                            name="role"
                            control={control}
                            defaultValue=''
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={role.map((item) => ({
                                  label: item.role,
                                  value: item.role,
                                }))}
                                defaultValue={null}
                                onChange={(data) => {
                                  setValue('role', data ? data.value : '');
                                }}
                              />
                            )}
                          />
                          {errors && errors.role && (
                            <p className="errorMsg">Select Role</p>)}
                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">Ip Address</label>
                          <input type="text" className={`form-control ${errors.manager ? 'is-invalid' : ''}`} placeholder="Enter IP Address" name='ipAddress'
                            {...register("ipAddress", {
                              required: "Enter IP Address",

                            })}
                          />
                          {errors.ipAddress && (<p className='errorMsg'>{errors.ipAddress.message}</p>)}
                        </div>

                        <div className='col-12 col-md-6 col-lg-6 mt-5 ' >
                          <button className="btn btn-primary" style={{ marginLeft: "400px" }} type='submit'>Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

    </div>
  )
}

export default UserReg
