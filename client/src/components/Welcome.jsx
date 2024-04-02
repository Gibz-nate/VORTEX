import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Welcome = () => {
  return (
    <div className=" items-center justify-center h-auto gradient-bg-services mt-14">
      <h1 className=' flex flex-col text-4xl sm:text-4xl  text-gradient py-8'>Powered by Ethereum ♦</h1>
      <div className="max-w-md mx-auto  shadow-md  py-4 px-3 rounded-lg  font-semibold white-glassmorphism  hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out border-0 ">
        <p className="text-justify text-sm text-slate-400 ">
          Welcome to VORTEX, a decentralized blockchain-based voting system designed to provide secure and transparent voting processes. VORTEX leverages the power of blockchain technology to ensure the integrity and immutability of voting data, providing users with a trustworthy platform for conducting elections.
        </p>
      </div>

      <Link to="/home">
        <button
          className="px-6 py-3 rounded-lg mt-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Continue to Application
          <AiOutlineArrowRight className="ml-0" />
        </button>
      </Link>
    </div>
  );
};

export default Welcome;

