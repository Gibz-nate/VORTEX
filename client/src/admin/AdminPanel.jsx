import React, { useState } from 'react';
import { FaHome, FaVoteYea, FaCog, FaUserCircle, FaMoneyCheck  } from 'react-icons/fa';
import { Dashboard, VotingSession } from './';
import { MdMenu } from 'react-icons/md';

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
        <div className="flex items-center justify-between h-16 px-4">
          <h1 className="text-2xl font-bold pl-7">Admin Panel</h1>
        </div>
        <ul className="flex flex-col items-center justify-center text-xl py-4 space-y-4">
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
            onClick={() => setCurrentPage('settings')}
          >
            <FaCog className="w-6 h-6 mr-4" />
            <span className="inline-block">Settings</span>
          </li>
          <li
            className="cursor-pointer hover:bg-gray-700 rounded-lg p-4 flex items-center"
            onClick={() => setCurrentPage('profile')}
          >
            <FaUserCircle className="w-6 h-6 mr-4" />
            <span className="inline-block">Profile</span>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="w-full ml-64 p-4 overflow-y-auto">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'votingSession' && <VotingSession />}
        {/* Render other pages */}
      </div>
    </div>
  );
}

export default App;
