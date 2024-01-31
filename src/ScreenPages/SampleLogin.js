import React from 'react'

const SampleLogin = () => {
    return (
        <>
            <main className="d-flex w-100" style={{backgroundColor:"#f6f5f7"}}>
                <div className="container d-flex flex-column">
                    <div className="row vh-100">
                        <div className="col-sm-10 col-md-9 col-lg-8 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">
                                <div className="text-center mt-4">
                                    <h1 className="h2">Welcome to Sign in your account</h1>
                                   
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="m-sm-4">
                                        <div className="text-left mt-4">
                                    <p className="lead ml-4" style={{paddingLeft:"80px"}}>
                                    <img src="assets/img/pathbreaker_logo.png" alt="Charles Hall" className="img-fluid rounded-circle " width={150} height={150} />
                                    </p>
                                </div>
                                            <form>
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input className="form-control form-control-lg" type="email" name="email"  />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input className="form-control form-control-lg" type="password" name="password"  />
                                                    <small>
                                                        <a href="index.html">Forgot password?</a>
                                                    </small>
                                                </div>
                                                <div>
                                                    <label className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue="remember-me" name="remember-me" defaultChecked />
                                                        <span className="form-check-label">
                                                            Remember me next time
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="text-center mt-3">
                                                    <a href="index.html" className="btn btn-lg btn-primary">Sign in</a>
                                                    {/* <button type="submit" class="btn btn-lg btn-primary">Sign in</button> */}
                                                </div>
                                            </form>
                                            <div className="overlay-container">
                                                <div className="overlay">
                                                    <div className="overlay-panel overlay-left">
                                                        <h1>Welcome Back!</h1>
                                                        <p>To keep connected with us please login with your personal info</p>
                                                        <button className="ghost" id="signIn">Sign In</button>
                                                    </div>
                                                    <div className="overlay-panel overlay-right">
                                                        <h1>Hello, Friend!</h1>
                                                        <p>Enter your personal details and start journey with us</p>
                                                        <button className="ghost" id="signUp">Sign Up</button>
                                                    </div>
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

        </>

    )
}

export default SampleLogin