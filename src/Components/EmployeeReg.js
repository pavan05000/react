import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import SideNav from '../ScreenPages/SideNav';
import Header from '../ScreenPages/Header';
import Footer from '../ScreenPages/Footer';
import Select from 'react-select';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';

const departments = [
  { value: "Permanent", label: "Permanent" },
  { value: "Contract", label: "Contract" },
  { value: "Trainee", label: "Trainee" },
  { value: "Support", label: "Support" }
];

const EmployeeReg = () => {
  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm('');
  const [user, setUser] = useState([])
  const [dep, setDep] = useState([]);
  const [des, setDes] = useState([]);
  const [stat, setStat] = useState([]);
  const [role, setRole] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const handlePasswordChange = (e) => {
    setPasswordShown(e.target.value);
  };

  const getDepartment = () => {
    axios.get(`http://192.168.1.163:8092/department/all`)
      .then((response) => {
        console.log(response.data);
        const formattedDepList = response.data.map(user => ({
          label: user.departmentTitle,
          value: user.departmentTitle,
          name: user.departmentTitle,
        }));

        setDep(formattedDepList);
        console.log(formattedDepList);
      })
      .catch((errors) => {

        console.log(errors)
      });

  };

  const getDesignation = () => {
    axios.get(`http://192.168.1.163:8092/designation/all`)
      .then((response) => {
        console.log(response.data);
        const formattedDesList = response.data.map(user => ({
          label: user.designationTitle,
          value: user.designationTitle,
          name: user.designationTitle,
        }));

        setDes(formattedDesList);
        console.log(formattedDesList);
      })
      .catch((errors) => {

        console.log(errors)
      });

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
    getDepartment();
    getDesignation();
    getStatus();
    getRole();
  }, [])

  const onSubmit = (data) => {
    if (location && location.state && location.state.employeeId) {
      axios.put(`http://192.168.1.163:8092/employee/${location.state.employeeId}`, data)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          navigate('/employeeview')
        }).catch((errors) => {

          console.log(errors)

        });
    } else {
      axios.post('http://192.168.1.163:8092/employee/registration', data)
        .then((response) => {
          console.log(response.data)
          console.log(data);
          navigate('/employeeview')
        })
        .catch((errors) => {

          console.log(errors)

        });
    };
  }
  useEffect(() => {

    if (location && location.state && location.state.employeeId) {
      // setIsUpdating(true);
      axios.get(`http://192.168.1.163:8092/employee/${location.state.employeeId}`)
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
            <h1 className="h3 mb-3"><strong>Employee Form</strong> </h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title ">Employee Registration</h5>
                    <div className="dropdown-divider" style={{ borderTopColor: "#d7d9dd" }} />
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='row'>

                        <div className='col-12 col-md-6 col-lg-5 mb-2'>
                          <label className="form-label mb-3">Select Employee Type</label>
                          <Controller
                            className={`form-select ${errors.employeeType ? 'is-invalid' : ''}`}
                            name="employeeType"
                            control={control}
                            rules={{ required: true }}
                            render={({ value }) => (
                              <Select options={departments}
                                value={departments.find(c => c.value === value)}
                                onChange={(val => {
                                  setValue("employeeType", val.value);
                                })}
                              />
                            )}
                          />
                          {errors.employeeType && (
                            <p className="errorMsg">This is a required field.</p>
                          )}

                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">Employee ID</label>
                          <input type="text" className={`form-control ${errors.employeeId ? 'is-invalid' : ''}`} placeholder="Enter EmployeeID" name='employeeid'
                            {...register("employeeId", {
                              required: "Enter Employee Id",

                            })}
                          />
                          {errors.employeeId && (<p className='errorMsg'>{errors.employeeId.message}</p>)}
                        </div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">First Name</label>
                          <input type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} placeholder="Enter First Name" name='firstName'
                            {...register("firstName", {
                              required: "Enter First Name",

                            })}
                          />
                          {errors.firstName && (<p className='errorMsg'>{errors.firstName.message}</p>)}
                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">Last Name</label>
                          <input type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} placeholder="Enter Last Name" name='lastName'
                            {...register("lastName", {
                              required: "Enter Last Name",

                            })}
                          />
                          {errors.lastName && (<p className='errorMsg'>{errors.lastName.message}</p>)}
                        </div>
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
                          <label className="form-label">Date of Hiring</label>
                          <input type="date" name='dateOfHiring' placeholder="Enter Hiring Date" className={`form-control ${errors.dateOfHiring ? 'is-invalid' : ''}`}
                            {...register("dateOfHiring", {
                              required: true,

                            })}
                          />
                          {errors.dateOfHiring && (<p className='errorMsg'>Enter Date of Birth</p>)}
                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-2' >
                          <label className="form-label">Department</label>
                          <Controller
                            name="department"
                            control={control}
                            defaultValue=''
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={dep}
                                defaultValue={null}
                                onChange={(data) => {
                                  setValue('department', data ? data.value : '');
                                }}
                              />
                            )}
                          />
                          {errors && errors.department && (
                            <p className="errorMsg">Select Role</p>)}
                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-2' >
                          <label className="form-label">Designation</label>
                          <Controller
                            name="designation"
                            control={control}
                            defaultValue=''
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={des}
                                defaultValue={null}
                                onChange={(data) => {
                                  setValue('designation', data ? data.value : '');
                                }}
                              />
                            )}
                          />
                          {errors && errors.designation && (
                            <p className="errorMsg">Select Designation</p>)}
                        </div>

                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">Manager</label>
                          <input type="text" className={`form-control ${errors.manager ? 'is-invalid' : ''}`} placeholder="Enter Manager"
                            {...register("manager", {
                              required: "Enter manager",

                            })}
                          />
                          {errors.manager && (<p className='errorMsg'>{errors.manager.message}</p>)}
                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">Location</label>
                          <input type="text" className={`form-control ${errors.location ? 'is-invalid' : ''}`} placeholder="Enter Location"
                            {...register("location", {
                              required: "Enter Location",

                            })}
                          />
                          {errors.location && (<p className='errorMsg'>{errors.location.message}</p>)}
                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">Password</label>
                          <div className='col-sm-12'>
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
                          </div>
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
                          <input type="text" className={`form-control ${errors.manager ? 'is-invalid' : ''}`} placeholder="Enter Manager" name='ipAddress'
                            {...register("ipAddress", {
                              required: "Enter manager",

                            })}
                          />
                          {errors.ipAddress && (<p className='errorMsg'>{errors.ipAddress.message}</p>)}
                        </div>

                        <div className='col-12 col-md-6 col-lg-6 mt-5 ' >
                          <button className="btn btn-primary" style={{ marginLeft: "80px", marginTop: "50px" }} type='submit'>Submit</button>
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

export default EmployeeReg