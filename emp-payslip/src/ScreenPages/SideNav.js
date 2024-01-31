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
                            <Link className="sidebar-link" to={'/emppayslip'}>
                                <Receipt color='orange' size={25} /> <span className="align-middle" style={{fontSize:"large"}}>PaySlips</span>
                            </Link>
                        </li>
                       
                    </ul>
                </div>
            </nav>

        </>

    )
}

export default SideNav