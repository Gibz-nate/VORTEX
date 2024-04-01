import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../utils/constants';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [votingContract, setVotingContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [votingSessionDetails, setVotingSessionDetails] = useState([]);

  useEffect(() => {
    initializeContract();
  }, []);

  // Initialize provider and contract instance
  async function initializeContract() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
      setVotingContract(contract);
      fetchTransactions(); // Call fetchTransactions after setting the contract
    } catch (error) {
      console.error('Error initializing contract:', error);
    }
  }

  // Fetch transactions and voting session details
  async function fetchTransactions() {
    try {
      if (votingContract) {
        // Fetch the total number of voting sessions
        const sessionCount = await votingContract.getTotalVotingSessions();
  
        // Fetch details for each voting session
        const votingSessionDetails = [];
        for (let i = 0; i < sessionCount; i++) {
          const sessionDetails = await votingContract.getVotingSession(i);
          votingSessionDetails.push(sessionDetails);
        }
        // Update the state with the fetched voting session details
        setVotingSessionDetails(votingSessionDetails);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }
  

  return (
    <div>
      <h1 className='text-justify text-2xl font-bold'>Transactions</h1>
      {/* Main content */}
      <div className="bg-gray-300 p-6 rounded-lg">
        {/* Display voting session details */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Voting Session Transactions</h2>
          <ul>
            {votingSessionDetails.map((session, index) => (
              <li key={index}>
                <p>Description: {session[0]}</p>
                <p>Candidate Names: {session[1].join(', ')}</p>
                <p>Duration (Minutes): {session[2]}</p>
                <p>Start Time: {new Date(session[3] * 1000).toLocaleString()}</p>
                <p>Is Active: {session[4] ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Transactions;

