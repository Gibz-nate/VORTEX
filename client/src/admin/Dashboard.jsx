import React, { useRef, useEffect } from 'react';
import { FaUsers, FaVoteYea, FaUserAlt, FaHome } from 'react-icons/fa';
import Chart from 'chart.js/auto';


const Dashboard = () => {
    const donutChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);

    useEffect(() => {
        // Donut Chart
        const donutChart = new Chart(donutChartRef.current, {
            type: 'doughnut',
            data: {
                labels: ['Yes Votes', 'No Votes'],
                datasets: [{
                    label: 'Vote Counts',
                    data: [13, 7], // Replace with your actual vote counts
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
                labels: ['Yes Votes', 'No Votes'],
                datasets: [{
                    label: 'Vote Counts',
                    data: [13, 7], // Replace with your actual vote counts
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
                labels: ['Alice', 'Bob', 'Charlie', 'David'], // Replace with actual voter names
                datasets: [{
                    label: 'Vote Count',
                    data: [5, 3, 4, 1], // Replace with actual vote counts
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
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Replace with actual time periods
                datasets: [{
                    label: 'Vote Count Over Time',
                    data: [3, 5, 7, 9, 6], // Replace with actual vote counts over time
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
                <div className="flex-grow bg-red-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105">
                    <div className="flex items-center mb-4">
                        <FaUsers className="text-4xl text-blue-500 mr-4" />
                        <h2 className="text-xl font-bold">Total Voters</h2>
                    </div>
                    <p className="text-white text-2xl font-semibold">20</p>
                </div>

                {/* Second Card */}
                <div className="flex-grow bg-cyan-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105">
                    <div className="flex items-center mb-4">
                        <FaVoteYea className="text-4xl text-green-500 mr-4" />
                        <h2 className="text-xl font-bold">Total Votes</h2>
                    </div>
                    <p className="text-white text-2xl font-semibold">13</p>
                </div>

                {/* Third Card */}
                <div className="flex-grow bg-green-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105">
                    <div className="flex items-center mb-4">
                        <FaUserAlt className="text-4xl text-purple-500 mr-4" />
                        <h2 className="text-xl font-bold">Total Candidates</h2>
                    </div>
                    <p className="text-white text-2xl font-semibold">4</p>
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
