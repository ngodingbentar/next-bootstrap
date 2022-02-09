import React, {useState, useEffect} from 'react';
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { Button, Table, Form, Pagination } from 'react-bootstrap';
import data from './mock-data.json'
import axios from 'axios'

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(1);
  const [search, setSearch] = useState('');

  const load = async () => {
    try {
      const products = await axios.get(`https://ngodingbentar-be.herokuapp.com/api/products?pageNumber=${active}&name=${search}&category=&min=0&max=0&order=newest`)
      console.log('products', products)
      setContacts(products.data.products)
      setPages(products.data.pages)
    }catch(err){
      console.log(err)
    }
  }

  const doSearch = async () => {
    try {
      const products = await axios.get(`https://ngodingbentar-be.herokuapp.com/api/products?pageNumber=1&name=${search}&category=&min=0&max=0&order=newest`)
      // console.log('products', products)
      setContacts(products.data.products)
      setPages(products.data.pages)
      setActive(1)
    }catch(err){
      console.log(err)
      setContacts([])
    }
  }

  const doPagination = async (number) => {
    setActive(number)
    console.log('number', number)
    try {
      const products = await axios.get(`https://ngodingbentar-be.herokuapp.com/api/products?pageNumber=${number}&name=${search}&category=&min=0&max=0&order=newest`)
      // console.log('products', products)
      setContacts(products.data.products)
    }catch(err){
      console.log(err)
      setContacts([])
    }
  }

  // const doSearch = () => {
  //   const hasil = data.filter((x) => {
  //     return x.fullName === search
  //   })
  //   setContacts(hasil)
  // }

  useEffect(() => {
    load()
  }, [])

  // let active = 1;
  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => doPagination(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className="container">
      <div className='app'>
        <Form.Control
          onKeyUp={(e) => setSearch(e.target.value)}
          type="text"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
        />
        <Button onClick={doSearch}>Search</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>price</th>
              <th>Stock</th>
              <th>publisher</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.price}</td>
                <td>{c.countInStock}</td>
                <td>{c.publisher}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>{items}</Pagination>
      </div>
    </div>
  )
}
