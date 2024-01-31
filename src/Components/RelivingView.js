import React, { useState, useEffect } from 'react'
import Footer from '../ScreenPages/Footer';
import Header from '../ScreenPages/Header';
import SideNav from '../ScreenPages/SideNav';
import { PencilSquare, XSquareFill } from 'react-bootstrap-icons';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const RelivingView = () => {
  const [view, setView] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')
  const Navigate = useNavigate();

  const getUser = () => {
    axios.get("http://192.168.1.163:8092/relieving/all")
      .then((response) => {
        console.log(response.data);
        setView(response.data);
        setFilteredData(response.data);
      })
      .catch((errors) => {

        console.log(errors)

      });
  }
  useEffect(() => {
    getUser();
  }, []);

   const getData=(id)=>{console.log(id)
          Navigate(`/relievingRegistration`,{state:{id}})  //deleteuser/
       }



  const  onDelete=async(id)=> {
    try {
       // Make a DELETE request to the API with the given ID
        await axios.delete(`http://192.168.1.163:8092/relieving/${id}`)
       .then((response)=>{
           getUser();
       console.log(response.data);
       })
     } catch (error) {
      // Log any errors that occur
      console.error(error.response);
  }
 }


  
  const columns = [
    {
      name: "Sno",
      selector: (row) => row.id,

    },
    {
      name: "Employee Name",
      selector: (row) => `${row.firstName}${row.lastName}`,

    },
    {
      name: "Employee Id",
      selector: (row) => row.employeeId,

    },
    {
      name: "Resignation Date ",
      selector: (row) => row.resignationDate,

    },
    {
      name: "Relieve Date",
      selector: (row) => row.lastWorkingDate,

    },

    {
      name: "Action",
      cell: (row) => <div> <button className="btn btn-sm " style={{ backgroundColor: "transparent" }}onClick={()=>getData(row.id)} ><PencilSquare size={22} color='#2255a4' /></button>
        <button className="btn btn-sm " style={{ backgroundColor: "transparent" }}  onClick={()=>onDelete(row.id)} ><XSquareFill size={22} color='#da542e' /></button>
      </div>

    }
  ]

  const getFilteredList = async (searchData) => {
    console.log("search", searchData)
    setSearch(searchData)
    const result = view.filter((data) => {
      return (
        // (data.username.toLowerCase().match(search.toLowerCase())) ||
        (data.id && data.id.toString().includes(searchData)) ||
        (data.employeeId.toString().includes(searchData))
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
            <h1 className="h3 mb-3"><strong>Relieving Form</strong> </h1>


            {/**Department View TableForm */}
            <div className="row">
              <div className="col-12 col-lg-12 col-xxl-12 d-flex">
                <div className="card flex-fill">
                  <div className="card-header">
                    <div className='row'>
                      <div className='col-12 col-md-6 col-lg-4' >
                        <Link to={'/relievingRegistration'}> <button className="btn btn-primary">Add Relieving</button></Link>
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
  )
}

export default RelivingView