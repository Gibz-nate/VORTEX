import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../utils/constants';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [votingContract, setVotingContract] = useState(null);
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        initializeContract();
      }, []);
    
      // Initialize provider and contract instance
      async function initializeContract() {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
          setProvider(provider);
          setVotingContract(contract);
        } catch (error) {
          console.error('Error initializing contract:', error);
        }
      }

      // Fetch transactions
  async function fetchTransactions() {
    try {
      // Implement fetching transactions from events VoteCasted, VotingSessionEnded, and VotingSessionCancelled
      // const fetchedTransactions = await votingContract.fetchTransactions();
      // setTransactions(fetchedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }


    
    return (

        <div>
            <h1 className='text-justify text-2xl ' >Transactions</h1>
                    {/* Main content */}
            <div className="w-3/4 bg-gray-300 p-6">
                {/* Display voting session details, transactions, etc. */}
                {/* Example of displaying transactions */}
                <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Transactions</h2>
                <ul>
                    {transactions.map((transaction, index) => (
                    <li key={index} className="mb-1">{transaction}</li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
        

    );
}

export default Transactions;