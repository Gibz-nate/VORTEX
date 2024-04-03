import React from 'react';
import { FaEthereum, FaBitcoin, FaCoins, FaBtc } from 'react-icons/fa'; // Importing icons from react-icons

const Wallets = () => {
    return (
        <div className='bg-gray-700 min-h-screen py-8 px-4 sm:px-6 lg:px-8'>
            <h1 className='text-white text-3xl font-bold my-14'>Supported Wallets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Ethereum Wallet Card */}
                <div className="gradient-bg-services white-glassmorphism rounded-lg p-4 flex flex-col justify-center items-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer hover:bg-slate-900">
                    <FaEthereum className="text-5xl text-violet-600 mb-4" />
                    <h2 className="text-xl font-semibold mb-2 text-white">Ethereum Wallet</h2>
                    {/* Additional Ethereum wallet information can be added here */}
                </div>
                {/* Bitcoin Wallet Card */}
                <div className="gradient-bg-services white-glassmorphism rounded-lg p-4 flex flex-col justify-center items-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer hover:bg-slate-900">
                    <FaBitcoin className="text-5xl text-orange-600 mb-4" />
                    <h2 className="text-xl font-semibold mb-2 text-white">Bitcoin Wallet</h2>
                    {/* Additional Bitcoin wallet information can be added here */}
                </div>
                {/* XRP Wallet Card */}
                <div className="gradient-bg-services white-glassmorphism rounded-lg p-4 flex flex-col justify-center items-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer hover:bg-slate-900">
                    <FaCoins className="text-5xl text-blue-600 mb-4" />
                    <h2 className="text-xl font-semibold mb-2 text-white">XRP Wallet</h2>
                    {/* Additional XRP wallet information can be added here */}
                </div>
                {/* Binance Wallet Card */}
                <div className="gradient-bg-services white-glassmorphism rounded-lg p-4 flex flex-col justify-center items-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer hover:bg-slate-900">
                    <FaBtc className="text-5xl text-yellow-500 mb-4 " />
                    <h2 className="text-xl font-semibold mb-2 text-white">Binance Wallet</h2>
                    {/* Additional Binance wallet information can be added here */}
                </div>
                {/* Add more cards for additional wallets as needed */}
            </div>
        </div>
    );
}

export default Wallets;
