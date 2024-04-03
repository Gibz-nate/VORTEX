import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../utils/constants';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [votingContract, setVotingContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [votingSessionDetails, setVotingSessionDetails] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    initializeContract();
  }, []);

  // Initialize provider and contract instance
  async function initializeContract() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
      setVotingContract(contract);
      fetchTransactions();
      getCandidates(); // Call fetchTransactions after setting the contract
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
  async function getCandidates() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );
    const candidatesList = await contractInstance.getAllCandidates();
    const formattedCandidates = candidatesList.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber()
      }
    });
    setCandidates(formattedCandidates);
}

  return (
    <div>
      <h1 className='text-justify text-2xl font-bold'>Transactions</h1>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search candidate name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 my-4 border-2 rounded-md focus:outline-none focus:border-blue-500"
      />
      {/* Main content */}
      <div className="bg-gray-400 p-6 rounded-lg">
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
          <h1>voteStatus</h1>
          <table id="myTable" className="candidates-table mt-3 w-full border-2 rounded-md bg-cyan-500">
            <thead>
              <tr className='text-black'>
                <th>Index</th>
                <th>Candidate name</th>
                <th>Candidate votes</th>
              </tr>
            </thead>
            <tbody>
              {candidates.filter(candidate => candidate.name.toLowerCase().includes(searchTerm.toLowerCase())).map((candidate, index) => (
                <tr key={index}>
                  <td>{candidate.index}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.voteCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transactions;

