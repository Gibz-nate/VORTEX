import React, { useState } from 'react';
import { FaHome, FaVoteYea, FaCog, FaUserCircle, FaMoneyCheck, FaExclamationTriangle  } from 'react-icons/fa';
import { Dashboard, Transactions, VotingSession, Settings } from './';
import { MdMenu } from 'react-icons/md';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="container mx-auto flex flex-row">
      {/* Menu button */}
      

      {/* Side panel */}
      <div className="w-64 bg-gray-800 text-white fixed top-0 left-0 bottom-0 z-40 rounded-lg">
      <div className="flex flex-col items-center h-16 px-4">
          <div className="mb-2">
            <Link to="/">
             <img src={logo} alt="logo" className="w-32 pr-5 cursor-pointer" />
            </Link>
          </div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <ul className="flex flex-col  justify-center text-xl py-4 space-y-4">
          <li
            className="cursor-pointer hover:bg-gray-700 rounded-lg p-4 flex items-center"
            onClick={() => setCurrentPage('dashboard')}
          >
            <FaHome className="w-6 h-6 mr-4" />
            <span className="inline-block">Dashboard</span>
          </li>
          <li
            className="cursor-pointer hover:bg-gray-700 rounded-lg p-4 flex items-center"
            onClick={() => setCurrentPage('votingSession')}
          >
            <FaVoteYea className="w-6 h-6 mr-4" />
            <span className="inline-block">Voting Sessions</span>
          </li>
          <li
            className="cursor-pointer hover:bg-gray-700 rounded-lg p-4 flex items-center"
            onClick={() => setCurrentPage('Transactions')}
          >
            <FaMoneyCheck  className="w-6 h-6 mr-4" />
            <span className="inline-block">Transactions</span>
          </li>
          <li
            className="cursor-pointer hover:bg-gray-700 rounded-lg p-4 flex items-center"
            onClick={() => setCurrentPage('Settings')}
          >
            <FaCog className="w-6 h-6 mr-4" />
            <span className="inline-block">Settings</span>
          </li>
          <li
            className="cursor-pointer hover:bg-gray-700 rounded-lg p-4 flex items-center"
          >
            <div className="w-6 h-8 mr-4">
              <SignedOut>
                <SignInButton />
              </SignedOut>
               <SignedIn >
                  <UserButton />
                </SignedIn>
            </div>
            <span className="inline-block">Profile</span>
          </li>
        </ul>
        {/*  Warning Card */}
              <div className="flex-grow bg-gradient-to-br bg-neutral-800 rounded-lg shadow-lg p-2 pr-5 hover:bg-neutral-950">
                  <div className="flex items-center justify-center mb-4">
                      <FaExclamationTriangle className="text-orange-500 text-2xl mr-3" />
                      <h2 className="text-2xl font-bold text-teal-800"></h2>
                  </div>
                  <p className="text-orange-700 text-sm font-medium text-justify">
                      The application may experience delays while retrieving data from the blockchain, Refresh the page if necessary.
                  </p>
              </div>
              <p class="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-orange-200  ">gibsonate123@gmail.com</p>



      </div>

      {/* Main content */}
      <div className="w-full ml-64 p-4 overflow-y-auto">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'votingSession' && <VotingSession />}
        {currentPage === 'Transactions' && <Transactions />}
        {currentPage === 'Settings' && <Settings />}
      </div>
    </div>
  );
}

export default App;
