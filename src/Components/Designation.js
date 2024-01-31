import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {useForm} from 'react-hook-form'
import Footer from '../ScreenPages/Footer';
import Header from '../ScreenPages/Header';
import SideNav from '../ScreenPages/SideNav';
import { PencilSquare, XSquareFill } from 'react-bootstrap-icons';
import DataTable from 'react-data-table-component';

const Designation = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm('')
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState([]);
  const [post,setPost]=useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const onSubmit = (data) => {
    if (editingUserId) {
      axios.put(`http://192.168.1.163:8092/designation/${editingUserId}`, data)
          .then((res) => {
              console.log(res.data);
              setPost(res.data);
             
          }).catch((errors) => {
             
              console.log(errors)
            
            });
  } else {
      axios.post('http://192.168.1.163:8092/designation/add',data)
          .then((response) => {
              console.log(response.data)
              setPost(response.data);
              console.log(data);
          })
          .catch((errors) => {
         
              console.log(errors)
            
            });
  };
}

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.1.163:8092/designation/all');
      setUsers(response.data);
      setFilteredData(response.data);
      console.log(response.data);
      console.log(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    // Fetch initial user data (Read operation)
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    // Set the user data to the form for editing
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setValue('designationTitle', userToEdit.designationTitle);
      setEditingUserId(id);
    }
    const formElement = document.getElementById('designationForm');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete user (Delete operation)
      await axios.delete(`http://192.168.1.163:8092/designation/${id}`); // Replace with your actual API endpoint
      // Fetch updated user data after deletion
      fetchUsers();
      // Reset the form
      reset();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns=[
    {
       name:"Sno",
        selector:(row)=>row.id,
      
    },
    {
        name:"Designation",
         selector:(row)=>row.designationTitle,
    
    },
    {
        name:"Action",
        cell:(row)=><div> <button className="btn btn-sm " style={{backgroundColor:"transparent"}} onClick={()=>handleEdit(row.id)}><PencilSquare size={22} color='#2255a4'/></button>
        <button className="btn btn-sm " style={{backgroundColor:"transparent"}} onClick={() => handleDelete(row.id)}><XSquareFill size={22} color='#da542e'/></button>
        </div>

            }
        ]

        const getFilteredList = async (searchData) => {
          console.log("search", searchData)
          setSearch(searchData)
          const result = users.filter((data) => {
            return (
              (data.id && data.id.toString().includes(searchData)) ||
              // (data.departmentTitle.toLowerCase().match(search.toLowerCase())) ||
      
              (data.designationTitle.toString().includes(searchData))
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
            <h1 className="h3 mb-3"><strong>Designation</strong> </h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title ">Add Designation</h5>
                    <div className="dropdown-divider" style={{borderTopColor:"#d7d9dd"}} />
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} id='designationForm'>
                  <div className="card-body">
                    <div className='row'>
                      <div className='col-12 col-md-6 col-lg-4 mb-2'>
                        <input type="text" className="form-control" placeholder="Enter Designation"
                        name='designationTitle' id='designation'
                        {...register("designationTitle",{
                          required:true
                        })}
                        />
                        {errors.designationTitle && (<p className='errorMsg'>Enter Designation</p>)}
                      </div>
                      <div className='col-12 col-md-6 col-lg-4' >
                        <button className="btn btn-primary" type='submit'>Submit</button>
                      </div>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
            {/**Department View TableForm */}
            <div className="row">
              <div className="col-12 col-lg-12 col-xxl-12 d-flex">
                <div className="card flex-fill">
                  <div className="card-header">
                    <div className='row'>
                      <div className='col-12 col-md-6 col-lg-4' >
                        <h5 className="card-title">Designation</h5>
                      </div>
                      <div className='col-12 col-md-6 col-lg-4'></div>
                      <div className='col-12 col-md-6 col-lg-4' >
                        <input type='search' className="form-control" placeholder='Search....'
                          value={search}
                          onChange={(e) => getFilteredList(e.target.value)}
                        />
                      </div>
                    </div> 
                    <div className="dropdown-divider" style={{ borderTopColor: "#d7d9dd" }} /> 
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

export default Designation