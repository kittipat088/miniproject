
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/register.module.css'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'

export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
        }
        catch (e) {
            console.log(e)
        }

    }

    const copyText = () => {
        navigator.clipboard.writeText(token)
    }


    const registerForm = () => (
        <div className={styles.form}>
            <h1>Register</h1>
            <br/>
            
            <div>
                    Status: {status}
                    <br /><br />
            </div>

            <div>
                <input type="text"
                 class="border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-400 w-full pl-1"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <input type="email"
                 class="border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-400 w-full pl-1"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
                <input type="password"
                 class="border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-400 w-full pl-1"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
                    <br /><br />
            </div>

            <div>
                    <button onClick={register} className={styles.btn}>Register</button>
            </div>
        </div>
    )

    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>
            <Navbar />
            <div className={styles.body}>
                
                <div className={styles.registerpage}>
                    {registerForm()}
                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
