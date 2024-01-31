import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Footer from '../ScreenPages/Footer';
import Header from '../ScreenPages/Header';
import SideNav from '../ScreenPages/SideNav';
import { Download, EyeFill, XSquareFill } from 'react-bootstrap-icons';


const Payslips = () => {
  const [select, setSelect] = useState(false);
  const [view, setView] = useState([]);
  const [slip, setSlip] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState([]);
  const Navigate = useNavigate();

  const userId = sessionStorage.getItem('userId');
  /**Year Drop Down */
  // const currentYear = new Date().getFullYear();
  // const startYear = 2000; // or any other start year you prefer
  // const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

  // const options = years.map((year) => ({
  //   value: year,
  //   label: year.toString(),
  // })).reverse();

  // const [selectedYear, setSelectedYear] = useState({ value: currentYear, label: currentYear.toString() });

  // const handleYearChange = (selectedOption) => {
  //   setSelectedYear(selectedOption);
  //   // Perform any additional actions you want when the year changes
  // };


  const getPaySLips = () => {
    axios.get(`http://192.168.1.163:8092/payslip/${userId}`)
      .then((response) => {
        setSlip(response.data);
        setFilteredData(response.data);
        console.log(response.data)
      })
      .catch((errors) => {

        console.log(errors)
      }
      );
  }
  useEffect(() => {
    getPaySLips();
  }, [])
  console.log("slip Stage", slip);

  // const onDelete = async (id) => {
  //   try {
  //     // Make a DELETE request to the API with the given ID
  //     await axios.delete(`http://192.168.1.163:8092/payslip/${userId}/${id}`)
  //       .then((response) => {
  //         getPaySLips();
  //         console.log(response.data);
  //       })
  //   } catch (error) {
  //     // Log any errors that occur
  //     console.error(error.response);
  //   }
  // }

  const downloadFile = async (id) => {
    try {
      const response = await axios.get(`http://192.168.1.163:8092/payslip/download/${userId}/${id}`, {
        responseType: 'blob',
      });

      const downloadLink = document.createElement('a');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      downloadLink.href = url;
      downloadLink.setAttribute('download', `payslip_${userId}/${id}.pdf`); // Specify the filename
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const onView = async (id) => {
    try {
      // Make a GET request to the API with the given ID
      await axios.get(`http://192.168.1.163:8092/payslip/image/${userId}/${id}`)
        .then((response) => {
          // Assuming you have the id property in your response data, change it accordingly
          const idFromResponse = response.data.id;
  
          getPaySLips();
          console.log(response.data);
  
          // Navigate to FileViewer with the correct id
          Navigate(`/payslip/${userId}/${id}`);
        })
    } catch (error) {
      // Log any errors that occur
      console.error(error.response);
    }
  }
  

  const getData = (userId) => {
    console.log(userId)
    Navigate(`/payslip/${userId}`, { state: { userId } })  //deleteuser/
  }
//   const columns = [
//     {
//       name: 'Title',
//       selector: row => row.title,
//     },
//     {
//       name: 'Year',
//       selector: row => row.year,
//     },
//   ];
//   const data = [
//   	{
// 		id: 1,
// 		title: 'Beetlejuice',
// 		year: '1988',
// 	},
// 	{
// 		id: 2,
// 		title: 'Ghostbusters',
// 		year: '1984',
// 	},
// ]

    const columns=[
      {
         name:"Sno",
          selector:(row)=>row.id,

      },
      // {
      //     name:"Employee Name",
      //      selector:(row)=>`${row.fisrtName}${row.lastName}`,

      // },
      {
        name:"Employee Id",
         selector:(row)=>row.employeeId,

    },
    {
      name:"Year/Month",
       selector:(row)=>`${row.financialYear}/${row.month}`,

  },
      {
          name:"Action",
          cell:(row)=><div> <button className="btn btn-sm " style={{backgroundColor:"transparent"}} onClick={()=>onView(row.id,row.userId)} ><EyeFill size={22} color='#2255a4'/></button>
           <button className="btn btn-sm " style={{backgroundColor:"transparent"}} onClick={()=>downloadFile(row.id)} ><Download size={22} color='orange'/></button>
          {/* <button className="btn btn-sm " style={{backgroundColor:"transparent"}} onClick={()=>onDelete(row.id)} ><XSquareFill size={22} color='#da542e'/></button> */}
          </div>

              }
          ]
  const getFilteredList = async (searchData) => {
    console.log("search", searchData)
    setSearch(searchData)
    const result = slip.filter((data) => {
      return (
        (data.id && data.id.toString().includes(searchData)) ||
        (data.employeeId && data.employeeId.toString().includes(searchData)) ||
        // (data.departmentTitle.toLowerCase().match(search.toLowerCase())) ||

        // (data.firstName .toString().includes(searchData))||
        (data.financialYear.toString().includes(searchData))||
        (data.month.toString().includes(searchData))
      );
    });
    setFilteredData(result);
  }

  return (
    <div className='wrapper'>
      <SideNav />
      <div className='main'>
        <Header />
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3"><strong>PaySlip Form</strong> </h1>
            {/**Department View TableForm */}
            <div className="row">
              <div className="col-12 col-lg-12 col-xxl-12 d-flex">
                <div className="card flex-fill">
                  <div className="card-header">
                    <div className='row'>
                      <div className='col-12 col-md-6 col-lg-4' >

                      </div>
                      <div className='col-12 col-md-6 col-lg-4'></div>
                      <div className='col-12 col-md-6 col-lg-4' >
                        <input type='search' className="form-control" placeholder='Search....'
                       value={search}
                       onChange={(e) => getFilteredList(e.target.value)}
                      /> 
                      </div>
                      <div className="dropdown-divider" style={{ borderTopColor: "#d7d9dd" }} />
                    </div>
                  </div>
                   <DataTable
                   columns={columns}
                   data={filteredData}
                   />
                  {/* <table className="table table-hover my-0">
                    <thead>
                      <tr>
                        <th >S No</th>
                        <th className="d-none d-xl-table-cell">Designation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Project Manager</td>
                      </tr>
                      <tr>
                      <td>2</td>
                        <td>DataScience</td>
                      </tr>
                      <tr>
                      <td>3</td>
                        <td>Project Coordinator</td>
                      </tr>
                      <tr>
                      <td>4</td>
                        <td>Hr Department</td>
                      </tr>
                      <tr>
                      <td>5</td>
                        <td>Software</td>
                      </tr>
                    </tbody>
                  </table> */}
                </div>
              </div>

            </div>

          </div>
        </main>
        <Footer />
      </div>

    </div>
    //     <div className='col-12 col-md-6 col-lg-5 mb-2' >
    //     <label class="form-label">Designation</label>
    //     <Select
    //   className="form-select mb-3"
    //         options={options} 
    //       />
    //     {/* <Controller
    //     className="form-select"
    //     //  className={`form-select ${errors.designation ? 'is-invalid' : ''}`}
    //     name="designation"
    //     id="designation"
    //     // control={control}
    //     // rules={{ required: "true" }}
    //     render={({ value }) => (
    //       <Select
    //         // value={des.find((e) => e.value === value)}
    //         // options={des.map(title => ({ label: title, value: title }))}
    //         // onChange={(data) => {
    //         //   setValue('designation', data.value);

    //         // }}
    //       />

    //       )} 
    //     />
    //      {errors.designation && (
    //       <p className="errorMsg">This is a required field.</p>
    //     )} */}
    //   </div>
  )
}

export default Payslips
