import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";

const Analysis = () => {
    // Using refs to access the canvas elements
    const pieChartRef = useRef(null);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        getCandidates();
        async function getCandidates() {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
                const candidatesList = await contractInstance.getAllCandidates();
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
    }, []); // Depend on props.candidates

    useEffect(() => {
        // Create Pie Chart
        if (candidates.length > 0 && pieChartRef.current) {
            const pieData = {
                labels: candidates.map(candidate => candidate.name),
                datasets: [{
                    data: candidates.map(candidate => candidate.voteCount),
                    backgroundColor: [
                        'rgba(0, 0, 139, 1)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 165, 0, 1)',
                        'rgba(255, 165, 5, 1)'
                        // Add more colors as needed
                    ],
                    borderColor: 'transparent',
                    borderWidth: 0
                }]
            };
            const ctx = pieChartRef.current.getContext('2d');
            if (ctx) {
                if (pieChartRef.current.chart) {
                    pieChartRef.current.chart.destroy();
                }
                pieChartRef.current.chart = new Chart(ctx, {
                    type: 'pie',
                    data: pieData,
                });
            } else {
                console.error("Failed to acquire context from the canvas element");
            }
        }
    }, [candidates]); // Depend on candidates

    return (
        <div className='bg-gray-900'>
            <h1 className='text-justify text-2xl'>Analysis</h1>
            {/* Canvas elements for charts */}
            <div className="w-64 h-34">
                <canvas ref={pieChartRef} ></canvas>
                {/* Add other canvas elements for other charts */}
            </div>
        </div>
    );
}

export default Analysis;
