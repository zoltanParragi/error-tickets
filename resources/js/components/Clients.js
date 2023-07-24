import React, { useEffect, useState } from 'react'

export default function Clients() {
    const [clients, setClients] = useState(null)

    useEffect(()=> {
        fetch('/sanctum/csrf-cookie')

        fetch('/api/getclients')
        .then(res => res.json())
        .then(res => setClients(res.clients))
    }, [])

  return (
    <div>
      <h1>Ügyfelek</h1>
      <div>
        {clients && clients.map((client, index) => 
          <div>
            <span>{client.name} </span>, <span>{client.email} </span>
          </div>
        )}
      </div>
    </div>
  )
}
