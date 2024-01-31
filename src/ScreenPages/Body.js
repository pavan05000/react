import React from 'react'
import SideNav from './SideNav'
import Header from './Header'
import { PeopleFill, PersonFillDown, PersonFillLock} from 'react-bootstrap-icons'
import Footer from './Footer'
//import Bgimage from '../../public/assets/img/Bg_images.jpg';

const Body = () => {
    return (
        <div className='wrapper'>
            <SideNav />
            <div className='main' >
                <Header />
                <main className="content">
                    <div className="container-fluid p-0">
                        <h1 className="h3 mb-3"><strong>Dashboard</strong> </h1>
                        <div className="row">
                            <div className="col-xl-12 col-5">
                                <div className="w-100">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row mt-2">
                                                        <div className="col mt-0">
                                                            <h5 className="card-title">Total Employees</h5>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div style={{marginRight:"10px"}}>
                                                                <PeopleFill  color='blue' size={30}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h1 className="mt-1 mb-3">38</h1>
                                                    <div className="mb-0">
                                                        <span className="text-muted">Last Updated 4days ago </span>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row mt-2">
                                                        <div className="col mt-0">
                                                            <h5 className="card-title">Current Employees</h5>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div style={{marginRight:"10px"}}>
                                                                <PersonFillLock color='green' size={30} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h1 className="mt-1 mb-3">30</h1>
                                                    <div className="mb-0">
                                                        <span className="text-muted">Last Updated 2days ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row mt-2">
                                                        <div className="col mt-0">
                                                            <h5 className="card-title">Relieved Employees</h5>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div style={{marginRight:"10px"}}>
                                                                <PersonFillDown color='orange' size={30} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h1 className="mt-1 mb-3">2</h1>
                                                    <div className="mb-0">
                                                        <span className="text-muted">Last Updated 1 month ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </main>
             <Footer/>
            </div>

        </div>
    )
}

export default Body