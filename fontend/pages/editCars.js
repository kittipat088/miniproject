import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Carlist.module.css'
import axios from 'axios'
import carAuth from '../components/carAuth'
import config from '../config/config'

const URL = `${config.URL}/Cars`
const editCars = ({ token }) => {

    const [Cars, setCars] = useState({
        list:
            [
                { id: "001", band: 'Tesla', model: '3', hp: 450, price: "3,090,000" },
            ]
    })
    const [band, setBand] = useState('')
    const [model, setModel] = useState('')
    const [hp, setHP] = useState('')
    const [price, setPrice] = useState(0)

    useEffect(() => {
        getCars()
    }, [])

    const getCars = async () => {
        let Car = await axios.get(URL)
        setCars(Car.data)
    }
    const printCars = () => {
        console.log('Cars:', Cars)
        if (Cars.list && Cars.list.length)
            return (Cars.list.map((Car, index) =>
            (<li key={index} className={styles.listItem2}>
                <b>Band : {(Car) ? Car.band : '-'} </b>
                <b>Model : {(Car) ? Car.model : '-'}</b> 
                <b>HP : {(Car) ? Car.hp : '-'} </b> 
                <b>Price : {(Car) ? Car.price : '-'} </b>
                <button onClick={() => updateCar(Car.id)} className={`${styles.button} ${styles.btnEdit}`}>Update</button>
                <button onClick={() => deleteCar(Car.id)} className={`${styles.button} ${styles.btnDelete}`}> Delete </button>
            </li>)
            ))
        else {
            return (<h2>No Cars</h2>)
        }
    }

    const addCar = async (band, model, hp, price) => {
        let result = await axios.post(URL, { band, model, hp, price })
        console.log(result.data)
        setCars(result.data)
    }

    const deleteCar = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        setCars(result.data)
    }
    const updateCar = async (id) => {
        const result = await axios.put(`${URL}/${id}`, {
            band,
            model,
            hp,
            price
        })
        console.log('Car id update: ', result.data)
        setCars(result.data)
    }

    return (
        <Layout>
            <Head>
                <title>Cars</title>
            </Head>
            <Navbar />
            <div className={styles.container}>
                <br></br>
                {JSON.stringify(Cars.Cars)}
                <br></br><br></br><br></br>
                <h1>Cars List</h1>
                <ul  className={styles.list}> {printCars()}</ul>
                <div className={styles.form}>
                    <h1>Add New Car</h1>
                    <br></br>
                    Band : <input type="text" onChange={(e) => setBand(e.target.value)} className={styles.textInput} />
                    Model : <input type="text" onChange={(e) => setModel(e.target.value)} className={styles.textInput}/>
                    HP : <input type="text" onChange={(e) => setHP(e.target.value)}className={styles.textInput} />
                    Price : <input type="text" onChange={(e) => setPrice(e.target.value)} className={styles.textInput}/>
                    <br></br><br></br>
                    <button onClick={() => addCar(band, model, hp, price)}>Add New Car</button>
                </div>

            </div>
        </Layout>
    )
}

export default carAuth(editCars)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
