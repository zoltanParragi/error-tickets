import React, { useEffect, useState } from 'react'

export default function Tickets() {
    const [tickets, setTickets] = useState(null)
    const [sortedOrFilteredTickets, setSortedOrFilteredTickets] = useState(null)
    const [selectedClient, setSelectedClient] = useState('');
    const [clients, setClients] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState('')

    const handleSortOrFilter = (event) => {
        if(event.target.value == 'default') {
            //setSelectedClient('')
            //setSelectedSortOption('')
            setSortedOrFilteredTickets(tickets)
        } else if (event.target.value == 'date-inc') {
            setSelectedClient('')
            setSelectedSortOption(event.target.value)
            sortedOrFilteredTickets 
            ? setSortedOrFilteredTickets(sortedOrFilteredTickets.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)))
            : setSortedOrFilteredTickets(tickets.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)))
        } else if (event.target.value == 'date-des') {
            setSelectedClient('')
            setSelectedSortOption(event.target.value)
            sortedOrFilteredTickets 
            ? setSortedOrFilteredTickets(sortedOrFilteredTickets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
            : setSortedOrFilteredTickets(tickets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
        } else if (event.target.value == 'due-date-inc') {
            setSelectedClient('')
            setSelectedSortOption(event.target.value)
            sortedOrFilteredTickets 
            ? setSortedOrFilteredTickets(sortedOrFilteredTickets.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)))
            : setSortedOrFilteredTickets(tickets.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)))
        } else if (event.target.value == 'due-date-des') {
            setSelectedClient('')
            setSelectedSortOption(event.target.value)
            sortedOrFilteredTickets 
            ? setSortedOrFilteredTickets(sortedOrFilteredTickets.sort((a, b) => new Date(b.due_date) - new Date(a.due_date)))
            : setSortedOrFilteredTickets(tickets.sort((a, b) => new Date(b.due_date) - new Date(a.due_date)))
        } else {
            setSelectedSortOption('')
            setSelectedClient(event.target.value)
            setSortedOrFilteredTickets(tickets.filter(ticket => ticket.name==event.target.value))
        }
    }

    useEffect(() => {
        fetch('/sanctum/csrf-cookie')

        fetch('/api/gettickets')
            .then(res => res.json())
            .then(res => {
                setTickets(res.tickets)
                setSortedOrFilteredTickets(res.tickets)
                let clientsArr = []
                res.tickets.forEach( ticket => {
                    if(!clientsArr.includes(ticket.name)) {
                        clientsArr.push(ticket.name)
                    }
                })
                setClients(clientsArr)
            })
    }, [])

    return (
        <div>
            <h1>Hibajegyek</h1>

            <div className='row justify-content-around mt-5 mb-5'>
                <div className='col-4'>
                    <label className='mb-2' htmlFor="selectFilterInput">Szűrés ügyfél szerint:</label>
                    <select class="form-select inline-block" aria-label="filter select" id="selectFilterInput" value={selectedClient} onChange={(e) => handleSortOrFilter(e)}>
                        <option selected value="default">Válassz egy ügyfelet</option>
                        {clients && clients.map((client, i) => (
                            <option key={client + i} value={client}>
                                {client}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className='col-4'>
                    {/* <label htmlFor="selectSortInput">Rendezés:</label>
                    <select id="selectsortInput" value={selectedClient} onChange={(e) => handleSortOrFilter(e)}>
                        <option value="">Válassz egy ügyfelet</option>
                        {clients && clients.map((client, i) => (
                            <option key={client + i} value={client}>
                                {client}
                            </option>
                        ))}
                    </select> */}
                    <label className='mb-2' htmlFor="selectSortInput">Rendezés:</label>
                    <select  class="form-select"aria-label="sort select" id="selectsortInput" value={selectedSortOption} onChange={(e) => handleSortOrFilter(e)}>
                        <option value="default">Válassz rendezési módot:</option>
                        <option value="date-inc">Létrehozás dátuma szerint növekvő</option>
                        <option value="date-des">Létrehozás dátuma szerint csökkenő</option>
                        <option value="due-date-inc">Határidő szerint növekvő</option>
                        <option value="due-date-des">Határidő szerint csökkenő</option>
                    </select>
                </div>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Név</th>
                        <th>Email</th>
                        <th>Tárgy</th>
                        <th>Létrehozva</th>
                        <th>Határidő</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedOrFilteredTickets && sortedOrFilteredTickets.map((ticket, index) =>
                        <>
                            <tr className='table-row' key={index+ticket.name}>
                                <td>{ticket.name} </td>
                                <td>{ticket.email} </td>
                                <td>{ticket.subject} </td>
                                <td>{ticket.created_at} </td>
                                <td>{ticket.due_date} </td>
                            </tr>
                            <tr className='table-row' key={index+ticket.subject}>
                                <td colSpan="5"><i className='me-4'>Hiba leírása: </i>{ticket.content} </td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}