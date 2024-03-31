// AdminPanel.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../utils/constants';
import {  Home } from "../pages"; 


function VotingSession() {
  const [description, setDescription] = useState('');
  const [candidateNames, setCandidateNames] = useState('');
  const [duration, setDuration] = useState('');
  const [provider, setProvider] = useState(null);
  const [votingContract, setVotingContract] = useState(null);
  const [CanVote, setCanVote] = useState(true);
  const [candidates, setCandidates] = useState([]);

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
      setCandidateNames(''); // Reset candidate names state
      setCanVote(true); // Reset voting state
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
      setCandidateNames(''); // Reset candidate names state
      setCanVote(true); // Reset voting state
      // Optionally, fetch transactions after cancelling a session
      // fetchTransactions();
    } catch (error) {
      alert('Error cancelling voting session:', error);
      console.error('Error cancelling voting session:', error);
    }
  }
  async function canVote() {
    
    setIsLoading(false);      
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );
    const voteStatus = await contractInstance.voters(await signer.getAddress());
    setCanVote(voteStatus);

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

  

  // Implement UI using Tailwind CSS
  return (
    <div className="container mx-auto flex flex-row justify-between">
      {/* Side panel */}
      <div className=" bg-gray-200 p-6 flex-grow-0">
        <h1 className="text-xl font-bold mb-4">Create Voting Sessions</h1>
        {/* Form for adding multiple candidates */}
        <div className="mb-4 bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Add Multiple Candidates</h2>
          <input className="w-full border rounded-md px-3 py-2 mb-2" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          <input className="w-full border rounded-md px-3 py-2 mb-2" type="text" value={candidateNames} onChange={(e) => setCandidateNames(e.target.value)} placeholder="Candidate Names (comma-separated)" />
          <input className="w-full border rounded-md px-3 py-2 mb-2" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (minutes)" />

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={createVotingSession}>Add Candidates</button>
        </div>

        {/* Form for adding a single candidate */}
        <div className="mb-4 bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Add Single Candidate</h2>
          <input className="w-full border rounded-md px-3 py-2 mb-2" type="text" value={candidateNames} onChange={(e) => setCandidateNames(e.target.value)} placeholder="Candidate Name" />
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={createVotingSession}>Add Candidate</button>
        </div>

        {/* Form for deleting a candidate */}
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Delete Candidate</h2>
          <input
            className="w-full border rounded-md px-3 py-2 mb-2"
            type="number"
            value={candidates}
            onChange={(e) => setCandidateNames(e.target.value)}
            placeholder="Candidate Index"
          />
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={cancelVotingSession}>Delete Candidate</button>
        </div>
      </div>

      
    </div>
  );
}

export default VotingSession;
