import React, { useState, useEffect } from 'react'
import Footer from '../ScreenPages/Footer';
import Header from '../ScreenPages/Header';
import SideNav from '../ScreenPages/SideNav';
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

const departments = [
  { value: "Permanent", label: "Permanent" },
  { value: "Contract", label: "Contract" },
  { value: "Trainee", label: "Trainee" },
  { value: "Support", label: "Support" }
];

const RelievingReg = () => {
  const { register, handleSubmit, control, setValue, formState: { errors }, reset } = useForm("");
  const [emp, setEmp] = useState([]);
  const [des, setDes] = useState([]);
  const [user, setUser] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();

  const getEmployeeId = () => {
    axios.get(`http://192.168.1.163:8092/employee/all`)
      .then((response) => {
        const formattedEmployeeList = response.data.map(user => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user.employeeId,
          name: user.employeeId,
        }));
        console.log('Formatted employee list:', formattedEmployeeList);
        setEmp(formattedEmployeeList);
      })
      .catch((errors) => {

        console.log(errors)
      });

  };
  const getDesignation = () => {
    axios.get(`http://192.168.1.163:8092/designation/all`)
      .then((response) => {

        console.log(response.data)

        setDes(response.data);
      })
      .catch((errors) => {

        console.log(errors)
      });

  };

  useEffect(() => {
    getEmployeeId();
    getDesignation();
  }, [])

  const onSubmit = (data) => {
    if (location && location.state && location.state.id) {
      axios.put(`http://192.168.1.163:8092/relieving/${location.state.id}`, data)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          navigate('/relievingview')
        }).catch((errors) => {

          console.log(errors)

        });
    } else {
      axios.post('http://192.168.1.163:8092/relieving/add', data)
        .then((response) => {
          console.log(response.data)
          console.log(data);
          navigate('/relievingview')
        })
        .catch((errors) => {

          console.log(errors)

        });
    };
  }
  useEffect(() => {

    if (location && location.state && location.state.id) {
      // setIsUpdating(true);
      axios.get(`http://192.168.1.163:8092/relieving/${location.state.id}`)
        .then((response) => { 
          console.log(response.data);
          reset();
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
            <h1 className="h3 mb-3"><strong>Employee Relieving Form</strong> </h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="dropdown-divider" style={{ borderTopColor: "#d7d9dd" }} />
                    <h5 className="card-title ">Relieving Form</h5>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">

                      <div className='row'>
                        <div className='col-12 col-md-6 col-lg-5 mb-2'>
                          <label class="form-label">Select Employee ID</label>
                          <Controller
                            name="employeeId"
                            control={control}
                            defaultValue=''
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={emp}
                                defaultValue={null}
                                onChange={(data) => {
                                  setValue('employeeId', data ? data.value : '');
                                }}
                              />
                            )}
                          />
                          {errors && errors.employeeId && (
                            <p className="errorMsg">Select Employee ID</p>)}
                        </div>
                        <div className='col-lg-5'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label class="form-label">Designation</label>
                          <Controller
                            name="designation"
                            control={control}
                            defaultValue=''
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={des.map((item) => ({
                                  label: item.designationTitle,
                                  value: item.designationTitle,
                                }))}
                                defaultValue={null}
                                onChange={(data) => {
                                  setValue('designation', data ? data.value : '');
                                }}
                              />
                            )}
                          />
                          {errors && errors.designation && (
                            <p className="errorMsg">Select Designation</p>
                          )}

                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label class="form-label">Type of Employement</label>
                          <Controller
                            className={`form-select ${errors.typeOfEmployement ? 'is-invalid' : ''}`}
                            name="typeOfEmployement"
                            control={control}
                            rules={{ required: true }}
                            render={({ value }) => (
                              <Select options={departments}
                                value={departments.find(c => c.value === value)}
                                onChange={(val => {
                                  setValue("typeOfEmployement", val.value);
                                })}
                              />
                            )}
                          />
                          {errors.typeOfEmployement && (
                            <p className="errorMsg">Select Employee Type.</p>
                          )}

                        </div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label class="form-label">Date of Resignation</label>
                          <input type="date" className="form-control" placeholder="Resignation Date" name='resignationDate'
                            {...register("resignationDate", {
                              required: true,
                            })}
                          />
                          {errors.resignationDate && (<p className='errorMsg'> Select Resignation Date</p>)}
                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label class="form-label">Date of Last Working Day</label>
                          <input type="date" className="form-control" placeholder="Last Working Date" name='lastWorkingDate'
                            {...register("lastWorkingDate", {
                              required: true,
                            })}
                          />
                          {errors.lastWorkingDate && (<p className='errorMsg'> Select Resignation Date</p>)}
                        </div>

                        <div className='col-12 col-md-6 col-lg-6 mt-5 ' >
                          <button className="btn btn-primary" style={{ marginLeft: "400px" }} type='submit'>Submit</button>
                        </div>
                      </div>

                    </div>
                  </form>
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

export default RelievingReg