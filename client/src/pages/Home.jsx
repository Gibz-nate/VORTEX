import React from 'react';
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { shortenAddress } from '../utils/shortenAddress';

const Home = (props) => {
    return (
        
            <div className="connected-container w-full text-white bg-slate-900 ">
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 bg-slate-900">
            <h1 className="connected-header text-white">You are Connected to Metamask</h1>
            <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                <div className="flex justify-between flex-col w-full h-full" >
                    <div className="flex justify-between items-start" >
                        <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                            <SiEthereum fontSize={21} color="#fff" />
                            
                        </div>
                           <BsInfoCircle fontSize={17} color="#fff" />

                    </div>
                    <b>METAMASK WALLET  </b>
                    <div>
                        <p className="text-white font-semibold text-sm italic">
                            Address: <b className='text-indigo-800'>{shortenAddress(props.account)}</b>
                            

                        </p>
                        <p className="text-white font-semibold text-lg mt-1">
                            Ethereum

                        </p>


                    </div>

                </div>

            </div>
            
            
            <div>
            <p className="connected-account">
                {props.remainingTime === 0 ? 'Voting session expired ' : `Remaining Time: `}
                <b className='text-orange-600'>{props.remainingTime}</b> mins
            </p>
            {props.showButton ? (
                <p className="connected-account">You have already voted</p>
            ) : (
                <div>
                    {props.remainingTime !== 0 && (
                        <>
                            <input className='text-black' type="number" placeholder="Enter Candidate Index" value={props.number} onChange={props.handleNumberChange} />
                            <br />
                            <button className="login-button" onClick={props.voteFunction}>Vote</button>
                        </>
                    )}
                </div>
            )}
            </div>

            <h1>Description: <b className='text-orange-600'>{props.description}</b> </h1>
            <table id="myTable" className="candidates-table mt-3">
                <thead>
                <tr className='text-black'>
                    <th>Index</th>
                    <th>Candidate name</th>
                    <th>Candidate votes</th>
                </tr>
                </thead>
                <tbody>
                {props.candidates.map((candidate, index) => (
                    <tr key={index}>
                    <td>{candidate.index}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.voteCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            
        </div>
            
        </div>

    );
}

export default Home;