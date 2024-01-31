import React from 'react'
import { Diagram3Fill, EraserFill, FileMedicalFill, PersonCircle, PersonVcardFill, Receipt, Speedometer2 } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'


const SideNav = () => {
    return (
        <>
            <nav id="sidebar" className="sidebar js-sidebar">
                <div className="sidebar-content js-simplebar">
                    <a className="sidebar-brand" href="index.html">
                        <span ><img className="align-middle" src="assets/img/pathbreaker_logo.png" alt='VBRSIT' style={{height:"80px",width:"180px"}} /></span>
                    </a>                    
                    <ul className="sidebar-nav mt-2">
                       
                        <li className="sidebar-item active">
                            <Link className="sidebar-link" to={'/main'}>
                                <Speedometer2 color='orange' size={25}/> <span className="align-middle" style={{fontSize:"large"}}>Dashboard</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to={"/department"}>
                                <Diagram3Fill color='orange' size={25} /> <span className="align-middle" style={{fontSize:"large"}}>Departments</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to={'/designation'} >
                                <FileMedicalFill color='orange' size={25} /> <span className="align-middle" style={{fontSize:"large"}}>Designation</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to={'/employeeview'} >
                                <PersonVcardFill color='orange' size={25}/> <span className="align-middle" style={{fontSize:"large"}}>Employees</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to={'/payslipview'}>
                                <Receipt color='orange' size={25} /> <span className="align-middle" style={{fontSize:"large"}}>PaySlips</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to={'/relievingview'}>
                                <EraserFill color='orange' size={25}/> <span className="align-middle" style={{fontSize:"large"}}>Relieved Summary</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to={'/usersView'}>
                                <PersonCircle color='orange' size={25}/> <span className="align-middle" style={{fontSize:"large"}}>Users Summary</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

        </>

    )
}

export default SideNav