import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const createPerson = newPerson => 
	axios
		.post(baseURL, newPerson)
		.then(response => response.data)

const getAll = () => 
	axios
		.get(baseURL)
		.then(response => response.data)	

const remove = (id) =>
	axios
		.delete(`${baseURL}/${id}`)
		.then(response => response.data)
		

const update = (id, newData) =>
	axios
		.put(`${baseURL}/${id}`, newData)
		.then(response => response.data)

export default {createPerson, getAll, remove, update}