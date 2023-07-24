import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function AddTicket() {
    const [input, setInput] = useState({})
    const [result, setResult] = useState(null)

    const navigate = useNavigate()

    const handleChange = e => {
        setInput({...input, [e.target.id]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(input)
        fetch('/api/addticket', {
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
                console.log(res.status)
                setInput({})
                setResult(res)
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
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                {(result !== null && result.status === "error") && <div className="alert alert-danger">{result.message}</div>}
                {(result !== null && result.status === "success") && <div className="alert alert-success">Sikeres mentés</div>}
                    <div className="card">
                        <div className="card-header">
                            Új hibajegy rögzítése
                        </div>
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="row g-4">
                                <div className='col-12'>
                                    <label htmlFor="name" className="form-label">Név</label>
                                    <input type="text" id="name" className="form-control" onChange={handleChange} value={input.name}/>
                                    
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" id="email" className="form-control" onChange={handleChange} value={input.email}/>
                                    
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="subject" className="form-label">Tárgy</label>
                                    <input type="text" id="subject" className="form-control" onChange={handleChange} value={input.subject}/>
                                    
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="content" className="form-label">Hiba leírása</label>
                                    <textarea type="text" id="content" className="form-control" onChange={handleChange} rpw="3" value={input.content}/>
                                </div>
                                <div className='col-12 text-center'>
                                    <button className="btn btn-success">Küldés</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTicket;