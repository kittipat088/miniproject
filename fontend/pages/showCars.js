import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Carlist.module.css'
import axios from 'axios'
import carAuth from '../components/carAuth'
import config from '../config/config'

const URL = `${config.URL}/Cars`
const URL2 = "http://localhost/api/BuyCars"

const showCars = ({ token }) => {

    const [Cars, setCars] = useState( {
        list:
            [
                { id: "001", band: 'Tesla', model: '3', hp: 450, price: "3,090,000" },
            ]
    })

    useEffect(() => {
        getCars()
    }, [])

    const getCars = async () => {
        let Car = await axios.get(URL)
        setCars(Car.data)
    }

    const addCar = async (band, model, hp, price) => {
        let result = await axios.post(URL, { band, model, hp, price })
        console.log(result.data)
        setCars(result.data)
    }

    const addCart = async (band, model, hp, price) => {
        let result = await axios.post(URL2, { band, model, hp, price })
        console.log(result.data)
        setCart(result.data)
    }
    const [Cart, setCart] = useState({})
    const printCars = () => {
        console.log('Cars:', Cars)
        if (Cars.list && Cars.list.length)
            return (Cars.list.map((Car, index) =>
            (<li key={index} className={styles.listItem4}>
               <b>Band : {(Car) ? Car.band : '-'}</b> 
               <b>Model : {(Car) ? Car.model : '-'}</b>   
               <b>HP : {(Car) ? Car.hp : '-'}</b>  
               <b>Price : {(Car) ? Car.price : '-'}</b> 
               <a href="/BuyCars"><button onClick={() => addCart(Car.band, Car.model, Car.hp, Car.price)} className={`${styles.button} ${styles.btnEdit}`}>Add  Cart</button></a>
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
            <Navbar />
            <div className={styles.container}>
                {JSON.stringify(Cars.Cars)}
                <br></br><br></br><br></br>
                <h1>Cars List</h1>
                <ul className={styles.list}>
                    {printCars()}
                </ul>  
            </div>
        </Layout>
    )
}

export default carAuth(showCars)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
