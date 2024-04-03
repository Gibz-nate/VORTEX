import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";

const Analysis = () => {
    // Using refs to access the canvas elements
    const donutChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);
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
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(144, 238, 144, 1)'
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
            // Create donut Chart
            const donutChart = {
                labels: candidates.map(candidate => candidate.name),
                datasets: [{
                    data: candidates.map(candidate => candidate.voteCount),
                    backgroundColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(144, 238, 144, 1)'
                        // Add more colors as needed
                    ],
                    borderColor: 'transparent',
                    borderWidth: 0
                }]
            };
            const dc = donutChartRef.current.getContext('2d');
            if (dc) {
                if (donutChartRef.current.chart) {
                    donutChartRef.current.chart.destroy();
                }
                donutChartRef.current.chart = new Chart(dc, {
                    type: 'doughnut',
                    data: donutChart,
                });
            } else {
                console.error("Failed to acquire context from the canvas element");
            }
            // Create bar Chart
            const barChart = {
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
                    borderWidth: 2,
                }],
                options: {
                    indexAxis: 'y'
                }
            };
            const bc = barChartRef.current.getContext('2d');
            if (bc) {
                if (barChartRef.current.chart) {
                    barChartRef.current.chart.destroy();
                }
                barChartRef.current.chart = new Chart(bc, {
                    type: 'bar',
                    data: barChart,
                });
            } else {
                console.error("Failed to acquire context from the canvas element");
            }
            // Create line Chart
            const lineChart = {
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
            const lc = lineChartRef.current.getContext('2d');
            if (lc) {
                if (lineChartRef.current.chart) {
                    lineChartRef.current.chart.destroy();
                }
                lineChartRef.current.chart = new Chart(lc, {
                    type: 'line',
                    data: lineChart,
                });
            } else {
                console.error("Failed to acquire context from the canvas element");
            }
        }
    }, [candidates]); // Depend on candidates

    return (
        <div className='bg-gray-400 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 mt-8 '>
            <h1 className='text-justify text-2xl col-span-2'>Analysis</h1>
            {/* Bar Chart */}
            <div className="bg-neutral-100 rounded-lg shadow-lg p-4 sm:p-6 sm:w-3/4 mx-14">
                <h2 className="text-xl font-bold mb-4">Bar Chart</h2>
                <canvas ref={barChartRef}  className="w-full h-auto"></canvas>
            </div>
            {/* Line Chart */}
            <div className="bg-neutral-100 rounded-lg shadow-lg p-4 sm:p-6 sm:w-3/4 mx-4">
                <h2 className="text-xl font-bold mb-4">Line Chart</h2>
                <canvas ref={lineChartRef}  className="w-full h-auto"></canvas>
            </div>
            {/* pie Chart */}
            <div className="bg-neutral-100 rounded-lg shadow-lg p-4 sm:p-6 sm:w-3/4 mx-14">
                <h2 className="text-xl font-bold mb-4">Full Pie Chart</h2>
                <canvas ref={pieChartRef}  className="w-full h-auto"></canvas>
            </div>
            {/* Donut Chart */}
            <div className="bg-neutral-100 rounded-lg shadow-lg p-4 sm:p-6 sm:w-3/4 mx-4 ">
                <h2 className="text-xl font-bold mb-4">Donut Pie Chart</h2>
                <canvas ref={donutChartRef}  className="w-full h-auto"></canvas>
            </div>
        </div>



    );
}

export default Analysis;
