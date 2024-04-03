import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

const Docs = () => {
    const [readmeContent, setReadmeContent] = useState('');

    const handleInputChange = (event) => {
        setReadmeContent(event.target.value);
    };

    return (
        <div className="bg-gray-900 min-h-screen p-8">
            <div class="flex items-center justify-center">
                <h1 class="text-3xl font-extrabold text-white mt-14">Docs</h1>
                <a href="https://github.com/your-repo" class="ml-6 mt-14 text-white">
                    <FaGithub size={30} />
                </a>
            </div>


            <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="gradient-bg-services white-glassmorphism rounded-lg p-4  text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
                <h2 className='text-orange-600'>Immutable Record</h2>
                <p className='font-medium'>Blockchain provides an immutable record of votes, ensuring that once a vote is cast, it cannot be altered or tampered with.</p>
                </div>
                <div className="gradient-bg-services white-glassmorphism rounded-lg p-4  text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
                <h2 className='text-orange-600'>Transparency:</h2>
                <p className='font-medium'>Blockchain technology allows for transparent and auditable voting processes, where anyone can verify the integrity of the voting results without relying on a central authority.</p>
                </div>
                <div className="gradient-bg-services white-glassmorphism rounded-lg p-4  text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
                <h2 className='text-orange-600'>Decentralization</h2>
                <p className='font-medium'>By distributing the voting process across a network of nodes, blockchain eliminates the need for a central authority to oversee the election.</p>
                </div>
                <div className="gradient-bg-services white-glassmorphism rounded-lg p-4  text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
                <h2 className='text-orange-600'>Security</h2>
                <p className='font-medium'>Blockchain uses cryptographic techniques to secure transactions, making it extremely difficult for malicious actors to tamper with the voting data.</p>
                </div>
                <div className="gradient-bg-services white-glassmorphism rounded-lg p-4  text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
                <h2 className='text-orange-600'>Smart Contracts</h2>
                <p className='font-medium'>Smart contracts can be utilized to automate various aspects of the voting process, such as voter registration, ballot counting, and result verification.</p>
                </div>
                <div className="gradient-bg-services white-glassmorphism rounded-lg p-4  text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
                <h2 className='text-orange-600'>Web 3.0</h2>
                <p className='font-medium'>Web 3.0 refers to the next generation of the internet, characterized by decentralized, peer-to-peer networks and applications built on blockchain technology.</p>
                </div>
            </div>
            
    </div>
  );
};

export default Docs;