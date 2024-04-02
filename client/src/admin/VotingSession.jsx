// AdminPanel.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../utils/constants';
import {  Home } from "../pages"; 
import { storage } from '../firebaseConfig';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import  {v4} from 'uuid';


function VotingSession() {
  const [description, setDescription] = useState('');
  const [candidateNames, setCandidateNames] = useState('');
  const [duration, setDuration] = useState('');
  const [provider, setProvider] = useState(null);
  const [votingContract, setVotingContract] = useState(null);
  const [CanVote, setCanVote] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [candidateName, setCandidateName] = useState('');
  const [candidateIndex, setCandidateIndex] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([])

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
      setCandidateNames('');
      setDescription('');
      setDuration(''); // Reset candidate names state
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
      setCandidateNames('');
      setDescription('');
      setDuration('');// Reset candidate names state
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

 // Add candidate function
 async function addCandidate() {
  try {
      if (votingContract && candidateName) {
          // Call the addCandidate function on the smart contract
          await votingContract.addCandidate(candidateName);
          // Optionally, you can fetch updated transactions after adding a candidate
          alert('Candidate added successfully')
          //fetchTransactions();
          setCandidateName('');
      }
  } catch (error) {
      alert('Error adding candidate', error);
      console.error('Error adding candidate:', error);
  }
}

// Delete candidate function
async function deleteCandidate() {
  try {
      if (votingContract) {
          // Call the deleteCandidate function on the smart contract
          await votingContract.deleteCandidate(candidateIndex);
          // Optionally, you can fetch updated transactions after deleting a candidate
          alert('Candidate deleted successfully')
          //fetchTransactions();
          setCandidateIndex('');
      }
  } catch (error) {
      alert('Error deleting candidate: ' + error)
      console.error('Error deleting candidate:', error);
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

const uploadImage = () => {
  if (imageUpload == null) return;
  const imageRef = ref(storage, `userImg/${imageUpload.name + v4()}`);
  uploadBytes(imageRef, imageUpload).then((snapshot) =>{
    getDownloadURL(snapshot.ref).then((url) => {
      setImageList((prev) => [...prev, url]);
    });
    alert('Image uploaded successfully');
    
  });
};
  

  // Implement UI using Tailwind CSS
  return (
    <div className="container mx-auto flex flex-row justify-between">
      {/* Side panel */}
      <div className=" bg-gray-200 p-6 flex-grow-0 rounded-lg">
        <h1 className="text-xl font-bold mb-4">Create Voting Sessions</h1>
        {/* Form for adding multiple candidates */}
        <div className="mb-4 bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Add Multiple Candidates</h2>
          <input className="w-full border rounded-md px-3 py-2 mb-2" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          <input className="w-full border rounded-md px-3 py-2 mb-2" type="text" value={candidateNames} onChange={(e) => setCandidateNames(e.target.value)} placeholder="Candidate Names (comma-separated)" />
          <input className="w-full border rounded-md px-3 py-2 mb-2" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (minutes)" />

          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={createVotingSession}>Add Candidates</button>
        </div>

        {/* Form for adding a single candidate */}
        <div className="mb-4 bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Add Single Candidate</h2>
          <input className="w-full border rounded-md px-3 py-2 mb-2" type="text" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} placeholder="Candidate Name" />
          <div className='m-3'>
            <input type="file" onChange={(event) => {
              setImageUpload(event.target.files[0])
              }} />
            <button onClick={uploadImage} className='bg-blue-300 hover:bg-blue-600 py-2 px-4 rounded-md'>Upload image</button>

          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={addCandidate}>Add Candidate</button>
        </div>

        {/* Form for deleting a candidate */}
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Delete Candidate</h2>
          <input
            className="w-full border rounded-md px-3 py-2 mb-2"
            type="number"
            value={candidateIndex}
            onChange={(e) => setCandidateIndex(e.target.value)}
            placeholder="Candidate Index"
          />
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={deleteCandidate}>Delete Candidate</button>
        </div>
        <button className="w-full bg-red-600 hover:bg-red-950 text-white font-bold py-2 px-4 rounded mt-6" onClick={cancelVotingSession}>Cancel Current Voting Session</button>
      </div>

    </div>
  );
}

export default VotingSession;
