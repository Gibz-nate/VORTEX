
const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
const Homecard = () => {
    return (
        <div className="flex w-full justify-center items-center gradient-bg-services">
          
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-1 px-4" >
                <div className="flex">
                    <div className="flex flex-1 justify-start items-start flex-col mf:mr-10 " >
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Vote Securely <br /> Through the Blockchain.
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the WEB3 world. Vote through the Ethereum networks.
                    </p>



                </div>
                
                
        <div>
            <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10" >
                <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                Reliability
                </div>
                <div className={companyCommonStyles}>Security</div>
                <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
                </div>
                <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
                </div>
                <div className={companyCommonStyles}>Low Fees</div>
                <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
                </div>
            </div>

        </div>
            
        </div>
        
    </div> 
 </div>
        

    );
}

export default Homecard;