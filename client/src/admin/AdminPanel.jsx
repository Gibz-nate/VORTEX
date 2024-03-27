// AdminPanel.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../utils/constants';

function AdminPanel() {
  const [description, setDescription] = useState('');
  const [candidateNames, setCandidateNames] = useState('');
  const [duration, setDuration] = useState('');
  const [provider, setProvider] = useState(null);
  const [votingContract, setVotingContract] = useState(null);
  const [transactions, setTransactions] = useState([]);

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

  // Create a new voting session
  async function createVotingSession() {
    try {
      await votingContract.createVotingSession(description, candidateNames.split(','), duration);
      alert('Voting session created successfully.');
      console.log('Voting session created successfully.');
      // Optionally, fetch transactions after creating a session
      // fetchTransactions();
    } catch (error) {
      alert('Error creating voting session: Unauthorized Address', error);
      console.error('Error creating voting session:', error);
    }
  }

  // Cancel a voting session
  async function cancelVotingSession() {
    try {
      await votingContract.cancelVotingSession();
      alert('Voting session cancelled successfully.');
      console.log('Voting session cancelled successfully.');
      // Optionally, fetch transactions after cancelling a session
      // fetchTransactions();
    } catch (error) {
      alert('Error cancelling voting session:', error);
      console.error('Error cancelling voting session:', error);
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

  // Implement UI using Tailwind CSS
  return (
    <div className="container mx-auto flex flex-row">
      {/* Side panel */}
      <div className="w-1/4 bg-gray-200 p-6">
        <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
        <div className="mb-4">
          <input className="w-full border rounded-md px-3 py-2 mb-2" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          <input className="w-full border rounded-md px-3 py-2 mb-2" type="text" value={candidateNames} onChange={(e) => setCandidateNames(e.target.value)} placeholder="Candidate Names (comma-separated)" />
          <input className="w-full border rounded-md px-3 py-2 mb-2" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (minutes)" />
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={createVotingSession}>Create Voting Session</button>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2" onClick={cancelVotingSession}>Cancel Voting Session</button>
          <button className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-2" onClick={fetchTransactions}>Fetch Transactions</button>
        </div>
      </div>
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

export default AdminPanel;
