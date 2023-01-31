
import React,{useEffect,useState,createContext} from "react";

import {fetchDataApi} from "../utils/api";


export const DataContext=createContext();

export const AppContext=({children})=> {

    const [isLoading,isSetLoading]=useState(true);
    const [searchResults,setSearchResults]=useState([]);
    const [selectCatagory,setSelectCatagory]=useState("New");
    const [mobileMenu,setMobileMenu]=useState(false);
    

    useEffect(()=>{
        const fetchSelectedCatagoryData=()=> {
            isSetLoading(true);
            fetchDataApi(`search/?q=${selectCatagory}`).then((res)=>{
                setSearchResults(res.contents);
                isSetLoading(false);
                
            })
            
            
            
            
        }
        fetchSelectedCatagoryData();
    },[selectCatagory]);

    const state={
        isLoading,isSetLoading,
        searchResults,
        selectCatagory,setSelectCatagory,
        mobileMenu,setMobileMenu,
        }

    return (
        <DataContext.Provider value={state}>
                {children}
        </DataContext.Provider>
    );

    
};