import React, { useEffect, useState } from 'react'
import { useStateContext } from '../ContextProvider'

export default function Clients() {
	const [clients, setClients] = useState(null)
    const { user } = useStateContext()

	useEffect(() => {
		fetch('/sanctum/csrf-cookie')

		fetch('/api/getclients')
			.then(res => res.json())
			.then(res => setClients(res.clients))
	}, [])

	return (
		<div>
			<h1 className='text-center mb-5'>Ügyfelek</h1>

			{!user 
			? <div className='col-md-8 mx-auto'><h2 className='text-center'>A megtekintéshez be kell lépned.</h2></div>
			:<div className='col-md-8 mx-auto'>
				<table className='table client-table'>
					<thead>
						<tr>
							<th>Név</th>
							<th>Email</th>
						</tr>
					</thead>

					<tbody>
						{clients && clients.map((client, index) =>
							<tr>
								<td>{client.name} </td>
								<td>{client.email} </td>
							</tr>
						)}
					</tbody>

				</table>

			</div>}
		</div>
	)
}
