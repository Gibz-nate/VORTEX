import React from "react";
import Homecard from "./Homecard";
import Loader from "./Loader";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Login = (props) => {
    return (
        
        <div className=" gradient-bg-services">
            <SignedIn>
            <div>
                <h1 className=" sm:text-3xl text-slate-300  py-6 "> DECENTRALIZED VOTING APPLICATION</h1>

                {props.loading ? (
                    <Loader/>

                ): (<button className="login-button" onClick={props.connectWallet}> Connect Metamask

                </button>)}
            
             
            </div>
            </SignedIn>
            <div >
                <Homecard/>
            </div>
        
        </div>
        
    )
}

export default Login;