import React from 'react'
import { Envelope, Facebook, Instagram, Linkedin } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row text-muted">
                        <div className="col-6 text-start">
                            <p className="mb-0">
                                <Link className="text-muted" to={"https://pathbreakertech.com/"} target="_blank"><strong>PathBreaker Technologies.Pvt.LTD</strong></Link>
                            </p>
                        </div>
                        <div className="col-6 text-end">
                            <ul className="list-inline">
                            <li className="list-inline-item">
                                    <Link className="text-muted" target="_blank"><Envelope color='blue'/>&nbsp;info@pathbreaker.com</Link>
                                </li>
                                &nbsp;
                                <li className="list-inline-item">
                                    <a className="text-muted" target="_blank"><Facebook color='blue'/> Facebook</a>
                                </li>
                                &nbsp;
                                <li className="list-inline-item">
                                    <a className="text-muted" href="https://adminkit.io/" target="_blank"><Instagram color='purple'/> Instagram</a>
                                </li>
                                &nbsp;
                                <li className="list-inline-item">
                                    <a className="text-muted" href="https://adminkit.io/" target="_blank"><Linkedin color='blue'/> Linkedin</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer