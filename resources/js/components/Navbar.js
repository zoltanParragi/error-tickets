import React from 'react'
import { Link } from 'react-router-dom';
import { useStateContext } from '../ContextProvider'


export default function Navbar() {
    const { user, setUser } = useStateContext()

    const onLogout = (e) => {
        e.preventDefault()
        fetch('/api/logout')
        .then(() => {
            setUser(null)
        })
      }

    return (
        <nav className='bg-dark text-white d-flex justify-content-between p-3 h4'>
            <div>
                <Link className="navbar-brand fw-bolder me-5" to="/">ErrorTicketApp</Link>
                <Link className='text-decoration-none text-white me-4' to="/">Főoldal</Link>
                <Link className='text-decoration-none text-white me-4' to="/add-ticket">Hibajegy rögzítés</Link>
                {user && <Link className='text-decoration-none text-white me-4' to="/tickets">Hibajegyek</Link>}
                {user && <Link className='text-decoration-none text-white me-4' to="/clients">Ügyfelek</Link>}
            </div>
            <div>
                {user==null &&<Link  className='text-decoration-none text-white' to="/login">Belépés</Link>}
                {user && <span className="me-4 text-success">Üdv {user.name}!</span>}
                {user && <a href='/' className='text-decoration-none text-white' onClick={onLogout}>Kilépés</a>}
            </div>
            {console.log(user)}
        </nav>
    )
}
