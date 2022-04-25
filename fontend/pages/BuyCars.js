import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Carlist.module.css'
import styles2 from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'


const URL2 = "http://localhost/api/BuyCars"


export default function BuyCars({ token }) {

    const [status, setStatus] = useState('')
    const [Cars, setCars] = useState( {
        list:
            [
                { id: "001", band: 'Tesla', model: '3', price: "3,090,000" },
            ]
    })

    useEffect(() => {
        BuyCars()
    }, [])

    const BuyCars = async () => {
        let result = await axios.get(URL2)
        setCars(result.data)
    }

    const deleteCar = async (id) => {
        const result = await axios.delete(`${URL2}/${id}`)
        setCars(result.data)
    }

    const printCars = () => {
        console.log('Cars:', Cars)
        if (Cars.list && Cars.list.length)
            return (Cars.list.map((Car, index) =>
            (<li key={index} className={styles.listItem3}>
               <b>Band : {(Car) ? Car.band : '-'}</b> 
               <b>Model : {(Car) ? Car.model : '-'}</b>   
               <b>Price : {(Car) ? Car.price : '-'}</b>
               
               <button onClick={() => deleteCar(Car.id)} className={`${styles.button} ${styles.btnDelete}`}> Delete </button>
            </li>)
            ))
        else {
            return (
            <div className={styles.container}>
            <h2>No Cars</h2>
            </div>
            )
        }
      }
 
    return (
        <Layout>
            <Head>
                <title>User profile</title> 
            </Head>
            <Navbar />
            <div className={styles.container}>
                <br></br><br></br><br></br>
                <h1>Add Cart Tang Car Shop</h1>
                <br></br><br></br><br></br>
                <ul className={styles.list}>
                    {printCars()}
                </ul>                
                <a href="/BuyCars2" className={`${styles.button2} ${styles.btnEdit}`}><button className={`${styles.button2} ${styles.btnEdit}`}>Buy Car</button></a>
                <br></br><br></br><br></br>  
            </div>
        </Layout>
    )
}