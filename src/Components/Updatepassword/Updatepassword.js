import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';



function Updatepassword(props) {

    //changing the page state based on api request
    const [page, setpage] = useState("")

    //  using useparams hook to get the parameter from url 
    const { token } = useParams()
    // passing token parameter to API FOR VERIFICATION    
    useEffect(() => {
        axios.post(`https://password-reset-0m2v.onrender.com/user/verifyuser/${token}`)
            .then((res) => {
                setpage(true)
                return res

            })

            .catch((error) => {
                setpage(false)
                return error
            })
    }
        ,)
    const pass = {
        password: "",
        confirmpassword: "",
    }
    const [users, setuser] = useState(pass)
    const [successMsg, setsuccess] = useState("")
    const [errorMsg, seterror] = useState("")


    const handler = (e) => {
        const { name, value } = e.target;
        setuser({ ...users, [name]: value })

    }
    const submit = (e) => {
        e.preventDefault()
        axios.post(`https://password-reset-0m2v.onrender.com/user/resetpassword/${token}`, users)
            .then((res) => {
                seterror("")
                setsuccess(res.data)
            })
            .catch((error) => {

                const { data } = error.response
                if (data.hasOwnProperty('details')) {
                    setsuccess("")
                    const { details } = data
                    const { message } = details[0]
                    seterror(message)
                }
                else {

                    setsuccess("")
                    seterror("Already password updated")
                }
            })
    }
    return (
        <div className='container'>
            <div className="row justify-content-center">

                {page ? <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">

                            <div className="row">

                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Reset Password</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user" id='password' onChange={handler} name='password' placeholder="Enter New Password"></input>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user" id='confirmpass' onChange={handler} name='confirmpassword' placeholder="Re-enter Password"></input>
                                            </div>
                                            <div className='m-2'>
                                                {successMsg !== null ? <span className='text-success'>{successMsg}</span> : null}
                                                {errorMsg !== null ? <span className='text-danger'>{errorMsg}</span> : null}
                                            </div>
                                            <button onClick={submit} className="btn btn-primary btn-user btn-block">
                                                Reset Password
                                            </button>

                                        </form>
                                        <hr></hr>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-none d-lg-block">
                                    <img src='forgetpass.jpg' width={"500px"} height={"500px"} alt='updatepass'></img>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> : (<h3>Sorry! The token is invalid or link is Expired </h3>)}

            </div>

        </div>
    );
}

export default Updatepassword;