import React from "react";
import Homecard from "./Homecard";
import Loader from "./Loader";

const Login = (props) => {
    return (
        <div className=" gradient-bg-services">
            <div>
                <h1 className=" sm:text-3xl text-slate-300  py-6 "> DECENTRALIZED VOTING APPLICATION</h1>

                {props.loading ? (
                    <Loader/>

                ): (<button className="login-button" onClick={props.connectWallet}> Connect Metamask

                </button>)}
            
             
            </div>
            <div >
                <Homecard/>
            </div>
        
        </div>
    )
}

export default Login;