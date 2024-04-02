import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";


const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start  white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => (
  <div className="flex w-full justify-center items-center gradient-bg-transactions">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
          Technologies Utilized
          <br />
          in the Blockchain.
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
        Built on blockchain technology that enables secure, transparent, and tamper-proof voting processes.
        </p>
      </div>

      <div className="flex-1 flex flex-col ">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Security gurantee"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Through smart contracts, each vote is recorded on the blockchain, ensuring transparency and preventing any fraudulent activities."
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Accessibility"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="Enables voters to participate in the voting process from anywhere in the world using a computer or mobile device connected to the internet"
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Decentralization"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Operates on a decentralized network, eliminating the need for a central authority to oversee the voting process."
        />
      </div>
    </div>
  </div>
);

export default Services;