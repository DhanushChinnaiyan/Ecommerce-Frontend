import { enqueueSnackbar } from "notistack";
import React, { createContext, useContext } from "react";
import CryptoJS from "crypto-js";
import { Base64 } from "js-base64";



const CommonContext = createContext()

export const useCommonContext = () => useContext(CommonContext)

export const CommonContextProvider = ({children}) => {
    
    // handle snakebar
    const handleSnackbar = (message,variant)=>{
        enqueueSnackbar(message,{variant})
    }

    // generate random token for path security

    //   create secure url
    const secureURL = (value) => {
        const Token = "NTA0M2YwNzYxYTQ0OGRjYjljM2VkZGZlYmQ0ZWI2NTgzMThjMDc1ODgxYjZmYTRjYmEwMTQ2ODNmMmNmYWEyMg";
        const timeStamp = Date.now() + 60 * 1000 * 60; // 60 minute in milliseconds
      
        // combine token and timestamp with a colon (':')
        const combinedString = `${Token}:${timeStamp}`;
      
        // Hash the combined string
        const hashedString = CryptoJS.SHA256(combinedString).toString();
      
        // URL-safe Base64 encode the hash
        const encodeHash = Base64.encodeURI(hashedString);
      
        const securedURL = `/?token=${encodeHash}&value=${value}&timestamp=${timeStamp}`;
      
        return securedURL;
      };
    
    const values = {
        handleSnackbar,
        secureURL
    }

    return(
        <CommonContext.Provider value={values}>
            {children}
        </CommonContext.Provider>
    )
}