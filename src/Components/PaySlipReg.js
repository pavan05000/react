import React, { useState, useEffect } from 'react'
import Footer from '../ScreenPages/Footer';
import Header from '../ScreenPages/Header';
import SideNav from '../ScreenPages/SideNav';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const PaySlipReg = () => {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm("")
  const [select, setSelect] = useState(false);
  const [view, setView] = useState('');
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://192.168.1.163:8092/employee/all`)
      .then((response) => {
        const formattedEmployeeList = response.data.map(user => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user.employeeId,
          name: user.employeeId,
        }));
        console.log('Formatted employee list:', formattedEmployeeList);
        setView(formattedEmployeeList);
      })
      .catch((errors) => {

        console.log(errors)
      });

  }, []);

  //   const getUser=()=>{
  //     axios.get("http://192.168.1.163:8092/employee/all")
  //     .then((response) =>{
  //         console.log(response.data);
  //         setView(response.data);
  //     })
  //     .catch((errors) => {

  //       console.log(errors)

  //     });
  //   } 
  //  useEffect(()=>{
  //       getUser();
  //     },[])

  /**Year Drop Down */
  const currentYear = new Date().getFullYear();
  const startYear = 2000; // or any other start year you prefer
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

  const months = Array.from({ length: 12 }, (_, index) => ({
    value: (index + 1).toString().padStart(2, '0'),
    label: new Date(2000, index, 1).toLocaleString('default', { month: 'long' }),
  }));
  const options = years.map((year) => ({
    value: year,
    label: year.toString(),
  })).reverse();

  const [selectedYear, setSelectedYear] = useState({ value: currentYear, label: currentYear.toString() });

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
    // Perform any additional actions you want when the year changes
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : '');
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('employeeId', data.employeeId);
    formData.append('financialYear', data.financialYear.value); // Assuming financialYear is an object with a 'value' property
    formData.append('month', data.month.value); // Assuming month is an object with a 'value' property
    formData.append('file', data.file[0]); // Assuming file is an array of File objects

    axios.post('http://192.168.1.163:8092/payslip/upload-document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data)
        console.log(data);
        navigate('/payslipview');
      })
      .catch((errors) => {

        console.log(errors)

      });

  }

  return (
    <div className='wrapper'>
      <SideNav />
      <div className='main'>
        <Header />
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3"><strong>PaySlips Form</strong> </h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title ">Generate PaySlip</h5>
                    <div className="dropdown-divider" style={{ borderTopColor: "#d7d9dd" }} />

                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">
                      <div className='row'>

                        <div className='col-12 col-md-6 col-lg-5 mb-2'>
                          <label className="form-label">Select Employee ID</label>
                          <Controller
                            name="employeeId"
                            control={control}
                            defaultValue=''
                            rules={{ required: true}}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={view}
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
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">Select Financial Year</label>
                          <Controller
                            name="financialYear"
                            control={control}
                            defaultValue={null}
                            rules={{ required: true}}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={options}
                                isClearable
                                placeholder="Select a year"
                              />
                            )}
                          />
                          {errors && errors.financialYear && (
                            <p className="errorMsg">Select Year</p>)}
                        </div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">Select Month</label>
                          <Controller
                            name="month"
                            control={control}
                            defaultValue={null}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={months}
                                placeholder="Select a month"

                              />
                            )}
                          />
                          {errors && errors.month && (
                            <p className="errorMsg">Select Month</p>)}
                        </div>
                        <div className='col-lg-1'></div>
                        <div className='col-12 col-md-6 col-lg-5 mb-3' >
                          <label className="form-label">PaySlip</label>
                          <input type="file" name='file' className="form-control" placeholder="upload Pay Slip"
                            onChange={(e) => handleFileChange(e)}
                            {...register("file", {
                              required: true,
                            })}
                          />

                          {errors.file && (
                            <p className="errorMsg">{fileName || 'Upload a file...'}</p>)}
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

export default PaySlipReg