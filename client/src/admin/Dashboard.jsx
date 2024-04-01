import React, { useRef, useEffect, useState } from 'react';
import { FaUsers, FaVoteYea, FaUserAlt, FaHome, FaHourglassHalf } from 'react-icons/fa';
import Chart from 'chart.js/auto';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../utils/constants';

const Dashboard = () => {
    const donutChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);
    const [totalVotes, setTotalVotes] = useState(0);
    const [votingContract, setVotingContract] = useState(null);
    const [totalCandidates, setTotalCandidates] = useState(0);
    const [totalSessions, setTotalSessions] = useState(0);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        initializeContract();
      }, []);
    
      // Initialize provider and contract instance
      async function initializeContract() {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
          setVotingContract(contract);

          Votes();
          tcandidates();
          sessions();
          getCandidates();
        } catch (error) {
          console.error('Error initializing contract:', error);
        }
      }

      async function getCandidates() {
        try {
            const candidatesList = await votingContract.getAllCandidates();
            const formattedCandidates = candidatesList.map((candidate, index) => {
                return {
                    index: index,
                    name: candidate.name,
                    voteCount: candidate.voteCount.toNumber()
                }
            });
            setCandidates(formattedCandidates);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    }

      async function Votes(){
        try {
          const votes = await votingContract.getTotalVotes();
          setTotalVotes(votes.toNumber()); // Assuming the returned value is a BigNumber, you may need to convert it to a number
        } catch (error) {
          console.error('Error fetching votes:', error);
        }
      }

      async function tcandidates(){
        try {
            const tcandidates = await votingContract.getTotalCandidates();
            setTotalCandidates(tcandidates.toNumber()); // Assuming the returned value is a BigNumber, you may need to convert it to a number
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }

      }
      async function sessions(){
        try {
            const sessions = await votingContract.getTotalVotingSessions();
            setTotalSessions(sessions.toNumber()); // Assuming the returned value is a BigNumber, you may need to convert it to a number
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }

      }


    

    useEffect(() => {
        // Donut Chart
        const donutChart = new Chart(donutChartRef.current, {
            type: 'doughnut',
            data: {
                labels: candidates.map(candidate => candidate.name),
                datasets: [{
                    label: 'Vote Counts',
                    data: candidates.map(candidate => candidate.voteCount), // Replace with your actual vote counts
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                    ],
                }],
            },
        });

        // Pie Chart
        const pieChart = new Chart(pieChartRef.current, {
            type: 'pie',
            data: {
                labels: candidates.map(candidate => candidate.name),
                datasets: [{
                    label: 'Vote Counts',
                    data: candidates.map(candidate => candidate.voteCount), // Replace with your actual vote counts
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                    ],
                }],
            },
        });

        // Bar Chart
        const barChart = new Chart(barChartRef.current, {
            type: 'bar',
            data: {
                labels: candidates.map(candidate => candidate.name), // Replace with actual voter names
                datasets: [{
                    label: 'Vote Count',
                    data: candidates.map(candidate => candidate.voteCount), // Replace with actual vote counts
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderWidth: 1,
                }],
            },
            options: {
                indexAxis: 'y',
            },
        });

        // Line Chart
        const lineChart = new Chart(lineChartRef.current, {
            type: 'line',
            data: {
                labels: candidates.map(candidate => candidate.name), // Replace with actual time periods
                datasets: [{
                    label: 'Vote Count Over Time',
                    data: candidates.map(candidate => candidate.voteCount), // Replace with actual vote counts over time
                    borderColor: 'rgba(75, 192, 192, 0.5)',
                    borderWidth: 2,
                }],
            },
        });
        return () => {
            // Clean up the Charts when the component is unmounted
            donutChart.destroy();
            pieChart.destroy();
            barChart.destroy();
            lineChart.destroy();
        };
    }, []);


    return (
        <div>
            {/* Dashboard Title */}
            <div className="flex items-center mb-4">
                <FaHome className="text-2xl text-gray-600 mr-2" />
                <h1 className="text-3xl font-bold ">Dashboard</h1>
            </div>

            {/* Cards */}
            <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                {/* First Card */}
                <div className="flex-grow bg-red-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105">
                    <div className="flex items-center mb-4">
                        <FaHourglassHalf className="text-3xl text-blue-500 mr-3"/>
                        <h2 className="text-xl font-bold text-teal-200">Total Sessions</h2>
                    </div>
                    <p className="text-white text-2xl font-semibold">{totalSessions}</p>
                </div>

                {/* Second Card */}
                <div className="flex-grow bg-cyan-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105">
                    <div className="flex items-center mb-4">
                        <FaVoteYea className="text-4xl text-green-500 mr-4" />
                        <h2 className="text-xl font-bold text-teal-200">Total Votes</h2>
                    </div>
                    <p className="text-white text-2xl font-semibold">{totalVotes}</p>
                </div>

                {/* Third Card */}
                <div className="flex-grow bg-green-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105">
                    <div className="flex items-center mb-4">
                        <FaUserAlt className="text-3xl text-purple-500 mr-4" />
                        <h2 className="text-xl font-bold text-teal-200">Total Candidates</h2>
                    </div>
                    <p className="text-white text-2xl font-semibold">{totalCandidates}</p>
                </div>
            </div>
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {/* Donut Chart */}
                <div className="bg-neutral-100 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Donut Pie Chart</h2>
                    <canvas ref={donutChartRef} />
                </div>

                {/* Pie Chart */}
                <div className="bg-neutral-100 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Full Pie Chart</h2>
                    <canvas ref={pieChartRef} />
                </div>

                {/* Bar Chart */}
                <div className="bg-neutral-100 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Bar Chart</h2>
                    <canvas ref={barChartRef} />
                </div>

                {/* Line Chart */}
                <div className="bg-neutral-100 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Line Chart</h2>
                    <canvas ref={lineChartRef} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
