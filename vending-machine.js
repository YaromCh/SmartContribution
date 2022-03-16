import Head from 'next/head'
import { useState, useEffect } from 'react'
import 'bulma/css/bulma.css'
import styles from '../styles/VendingMachine.module.css'
import Web3 from 'web3'
import vmContract from '../blockchain/vending'

const VendingMachine = () => {
    const [error, setError] = useState('')
    const [balance, setBalance] = useState('')
    const [title, setTitle] = useState('')
    const [detail, setDetail] = useState('')
    const [etherRequired, setEtherRequired] = useState('')
    const [percentageConsent, setPercentageConsent] = useState('')
    const [addressToPay, setAddressToPay] = useState('')
    const [notDoneYet, setNotDoneYet] = useState('')

    let web3
    useEffect( () => {
        getBalanceHandler()
    })
    const getBalanceHandler = async () => {
        const status = await vmContract.methods.getContributionsStatus().call()
        setBalance(status[0])
        setTitle(status[1])
        setDetail(status[2])
        setEtherRequired(status[3])
        setPercentageConsent(status[4])
        setAddressToPay(status[5])
        setNotDoneYet(status[6])
    }
    //window.ethereum
    const connectWalletHandler = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            try {
                await window.ethereum.request({method: "eth_requestAccounts"})
                web3 = new Web3(window.ethereum)
            } catch(err) {
                setError(err.message)
            }
        } else {
            // MateMask is NOT installed
            console.log("Please install MetaMask")
        }
    }
    return(
        <><div className={styles.main}>
            <Head>
                <title>Smart Contribution App</title>
                <meta name="description" content="Blockchain" />
            </Head>
            <nav className="navbar mt-4 mb-4">
                <div className="container">
                    <div className="navbar-brand">
                        <h1>Smart Contribution</h1>
                    </div>
                    <div className="navbar-end">
                        <button onClick={connectWalletHandler} className="button is-primary">
                            Connect wallet
                        </button>
                    </div>
                </div>
            </nav>
            <section>
                <div className="container">
                    <h2>Total balance: {balance}</h2>
                    <h2>Title: {title}</h2>
                    <h2>Detail: {detail}</h2>
                    <h2>EtherRequired: {etherRequired}</h2>
                    <h2>PercentageConsent: {percentageConsent}</h2>
                    <h2>AddressToPay: {addressToPay}</h2>
                    <h2>NotDoneYet: {notDoneYet}</h2>
                </div>
            </section>
            <section>
                <div className="container has-test-danger">
                    <p>{error}</p>
                </div>
            </section>
        </div>
        </>
    )
}

export default VendingMachine