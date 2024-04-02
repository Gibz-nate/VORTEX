import React, { useEffect, useState, useRef } from 'react';
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { shortenAddress } from '../utils/shortenAddress';
import { useAuth } from '@clerk/clerk-react';
import "../App.css";
import {ethers} from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";
import { Homecard, Loader, Login } from "../components";
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import Chart from 'chart.js/auto';


const Home = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [votingSessionDescription, setVotingSessionDescription] = useState('');
  const [imageList, setImageList] = useState([])
  const imageListRef = ref(storage, "userImg/")
  


  useEffect( () => {
    
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    listenToEvents();

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
    
    
  });
    


  async function vote() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );

      const tx = await contractInstance.vote(number);
      await tx.wait();
      canVote();
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


  async function getCurrentStatus() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const status = await contractInstance.getVotingStatus();
      console.log(status);
      setVotingStatus(status);
  }

  async function getRemainingTime() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const time = await contractInstance.getRemainingTime();
      setremainingTime(parseInt(time)/60);
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      canVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        
        alert("Connect METAMASK to continue!!")
        setIsLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
        canVote();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
      
    }
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  async function listenToEvents() {
    if (!provider) return;
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, provider
    );

    // Listen for the NewVotingSession event
    contractInstance.on("NewVotingSession", (admin, description, candidateNames, durationInMinutes) => {
      // When the event is emitted, update the voting session description state
      setVotingSessionDescription(description);
    });
  }

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);

        });
      });
    });
  },[]);

 

    return (

        <>

        { isConnected ?(
 <div className="h-screen mt-64">
            <div className="connected-container w-full text-white bg-slate-900">
            <div className="flex flex-col flex-1 items-center justify-start w-full  bg-slate-900">
                <h1 className="text-3xl sm:text-5xl text-gradient py-8">Welcome, </h1>
                <h2 className="text-xl text-amber-600">You are Connected to Metamask</h2>
                <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism">
                    <div className="flex justify-between flex-col w-full h-full">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                <SiEthereum fontSize={21} color="#fff" />
                            </div>
                            <BsInfoCircle fontSize={17} color="#fff" />
                        </div>
                        <b>METAMASK WALLET </b>
                        <div>
                            <p className="text-white font-semibold text-sm italic">
                                Address: <b className='text-indigo-800'>{shortenAddress(account)}</b>
                            </p>
                            <p className="text-white font-semibold text-lg mt-1">
                                Ethereum
                            </p>
                        </div>
                    </div>
                </div>

               
                {/* Card for Candidates */}
                <div className="py-5 flex justify-start items-center flex-col rounded-xl w-3/4 my-5 bg-sky-900 ">
                    <h3 className="text-lg text-white font-semibold mb-2">Candidates</h3>
                    <div className="flex flex-wrap justify-start">
                        {/* Map through candidate images */}
                        {candidates.map((candidate, index) => (
                            <div key={index} className="flex flex-col items-center justify-center m-7">
                             
                                <p className="text-sm text-white">{candidate.name}</p>
                            </div>
                        ))}
                        {/* {imageList.map((url) => {
                                return <img src={url} alt="img" className="w-24 h-24 rounded-full" />
                              })} */}
                         
                    </div>
                </div>

                <div className=''>
                    <p className="connected-account">
                        {remainingTime === 0 ? 'Voting session expired, ' : `Remaining Time: `}
                        <b className='text-orange-600'>{remainingTime}</b> mins
                    </p>
                    
                </div>

                

                {/* Table (converted to card) */}
                <div className="p-8 flex justify-start items-center flex-col rounded-xl w-3/4 my-5 bg-sky-900">
                    <h3 className="text-lg text-white font-semibold mb-2">Voting Session</h3>
                    <h1>Description: <b className='text-orange-600'>{votingSessionDescription}</b> </h1>
                    <table id="myTable" className="candidates-table mt-3 w-full border-2 rounded-md ">
                        <thead>
                            <tr className='text-black'>
                                <th>Index</th>
                                <th>Candidate name</th>
                                <th>Candidate votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((candidate, index) => (
                                <tr key={index}>
                                    <td>{candidate.index}</td>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.voteCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='mt-4'>
                    {CanVote ? (
                        <p className="connected-account">You have already voted</p>
                    ) : (
                        <div className='flex '>
                            {remainingTime !== 0 && (
                                <>
                                    <input className='text-black' type="number" placeholder="Enter Candidate Index" value={number} onChange={handleNumberChange} />
                                    <br />
                                    <button className="px-6 py-1 ml-2 mb-2  rounded-lg  bg-gradient-to-r from-orange-500 to-blue-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200 ease-in-out " onClick={vote}>Vote</button>
                                </>
                            )}
                        </div>
                    )}
                    </div>
                    
                </div>
            </div>
        </div>
</div>

        ) : (
            <Login 
            connectWallet = {connectToMetamask}
            loading = {isLoading}/>
        )}

</>
        
    );
}

export default Home;
