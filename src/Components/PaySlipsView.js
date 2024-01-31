import React,{useState,useEffect} from 'react'
import Footer from '../ScreenPages/Footer';
import Header from '../ScreenPages/Header';
import SideNav from '../ScreenPages/SideNav';
import { PencilSquare, XSquareFill,EyeFill,Download } from 'react-bootstrap-icons';
import DataTable from 'react-data-table-component';
import { Link ,useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';

const PaySlipsView = () => {
  const [view,setView]=useState([]);
  const [slip,setSlip]=useState([]);
  const [filteredData,setFilteredData]=useState([]);
  const [search,setSearch]=useState([]);
  const Navigate=useNavigate();
  const {id}=useParams();
  
  const getPaySLips=()=>{
    axios.get(`http://192.168.1.163:8092/payslip/all`)
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
  useEffect(()=>{
    getPaySLips();
  },[])

  const  onDelete=async(employeeId,id)=> {
    try {
       // Make a DELETE request to the API with the given ID
        await axios.delete(`http://192.168.1.163:8092/payslip/${employeeId}/${id}`)
       .then((response)=>{
           getPaySLips();
       console.log(response.data);
       })
     } catch (error) {
      // Log any errors that occur
      console.error(error.response);
  }
 }

 const onView = async (employeeId,id) => {
  try {
    // Make a GET request to the API with the given ID
    await axios.get(`http://192.168.1.163:8092/payslip/image/${employeeId}/${id}`)
      .then((response) => {
        // Assuming you have the id property in your response data, change it accordingly
        const idFromResponse = response.data.id;

        getPaySLips();
        console.log(response.data);

        // Navigate to FileViewer with the correct id
        Navigate(`/payslip/${employeeId}/${id}`);
      })
  } catch (error) {
    // Log any errors that occur
    console.error(error.response);
  }
}


 const downloadFile = async (employeeId,id) => {
  try {
    const response = await axios.get(`http://192.168.1.163:8092/payslip/download/${employeeId}/${id}`, {
      responseType: 'blob',
    });

    const downloadLink = document.createElement('a');
    const url = window.URL.createObjectURL(new Blob([response.data]));
    downloadLink.href = url;
    downloadLink.setAttribute('download', `payslip_${employeeId}/${id}.pdf`); // Specify the filename
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

const getData=(id)=>{console.log(id)
  Navigate(`/payslip/${id}`)  //deleteuser/
}
  const columns=[
    {
       name:"Sno",
        selector:(row)=>row.id,
      
    },
    {
        name:"Employee Name",
         selector:(row)=>`${row.fisrtName}${row.lastName}`,
    
    },
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
        cell:(row)=><div> <button className="btn btn-sm " style={{backgroundColor:"transparent"}} onClick={()=>onView(row.employeeId,row.id)} ><EyeFill size={22} color='#2255a4'/></button>
         <button className="btn btn-sm " style={{backgroundColor:"transparent"}} onClick={()=>downloadFile(row.employeeId,row.id)} ><Download size={22} color='orange'/></button>
        <button className="btn btn-sm " style={{backgroundColor:"transparent"}} onClick={()=>onDelete(row.employeeId,row.id)} ><XSquareFill size={22} color='#da542e'/></button>
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
                     <Link to={'/payslipRegistration'}> <button className="btn btn-primary">Generate PaySlip</button></Link>
                  </div>
                  <div className='col-12 col-md-6 col-lg-4'></div>
                  <div className='col-12 col-md-6 col-lg-4' >
                      <input type='search' className="form-control" placeholder='Search....'
                       value={search}
                       onChange={(e) => getFilteredList(e.target.value)}
                      /> 
                  </div>
                  <div className="dropdown-divider" style={{borderTopColor:"#d7d9dd"}} />
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
  )
}

export default PaySlipsView