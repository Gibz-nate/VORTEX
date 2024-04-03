import React from 'react';

const Settings = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-slate-400 rounded-lg">
            <div className="bg-white shadow-md rounded-lg w-96 p-6">
                <h1 className="text-center text-3xl font-semibold mb-6">Ethereum</h1>

                {/* Blockchain Network */}
                <div className="mb-6">
                    <label htmlFor="blockchain-network" className="block text-gray-700 font-medium mb-2">Blockchain Network:</label>
                    <select id="blockchain-network" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                        <option value="mainnet">Mainnet</option>
                        <option value="testnet">Testnet</option>
                    </select>
                </div>

                {/* Wallet Address */}
                <div className="mb-6">
                    <label htmlFor="wallet-address" className="block text-gray-700 font-medium mb-2">Wallet Address:</label>
                    <input type="text" id="wallet-address" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>

                {/* Language */}
                <div className="mb-6">
                    <label htmlFor="language" className="block text-gray-700 font-medium mb-2">Language:</label>
                    <select id="language" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                    </select>
                </div>

                {/* Save Button */}
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Save Settings</button>
            </div>
        </div>
    );
}

export default Settings;
