import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../ContextProvider';

function Login() {
    const [input, setInput] = useState({})
    const [result, setResult] = useState(null)
    const { user, setUser } = useStateContext()

    const navigate = useNavigate()

    const handleChange = e => {
        setInput({...input, [e.target.id]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-Token': Cookie.get('XSRF-TOKEN')
            },
            body: JSON.stringify(input)
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            if(res.status === "success") {
                setUser(res.user)
                navigate('/')
            } else {
                setResult(res)
            }
        })
        .catch(e => {
            console.log(e)
        })
    }

    useEffect(()=> {
        fetch('/sanctum/csrf-cookie')
    }, [])

    return (
        <div className="container">
            {user 
                ? <div className='col-md-8 mx-auto'><h2 className='text-center'>A megtekintéshez ki kell lépned.</h2></div>
                : <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                    {(result !== null && result.status === "error") && <div className="alert alert-danger">{result.message}</div>}
                        <div className="card">
                            <div className="card-header">
                                Belépés
                            </div>
                            <form className="card-body" onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className='col-12'>
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" id="email" className="form-control" onChange={handleChange} value={input.email}/> 
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="password" className="form-label">Jelszó</label>
                                        <input type="password" id="password" className="form-control" onChange={handleChange} />
                                    </div>
                                    <div className='col-12 text-center'>
                                        <button className="btn btn-success">Belépés</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Login;