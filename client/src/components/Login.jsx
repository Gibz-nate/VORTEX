import React from "react";
import Homecard from "./Homecard";
import Loader from "./Loader";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Login = (props) => {
    return (
        
        <div className=" gradient-bg-services h-screen mt-auto">
            <SignedIn>
            <div>
                <h1 className=" text-3xl sm:text-4xl  text-gradient py-8 "> DECENTRALIZED VOTING APPLICATION</h1>

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