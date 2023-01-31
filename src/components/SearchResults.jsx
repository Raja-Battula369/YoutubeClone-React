import { Container, HStack, useMediaQuery, VStack } from '@chakra-ui/react';
import { DataContext } from '../context/contextApi';

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LeftMenu from './LeftMenu';
import { fetchDataApi } from '../utils/api';
import SearchResultsCard from './SearchResultsCard';
import Loader from './Loader';
const SearchResults = () => {
  const [isnonMobile]=useMediaQuery('(min-width: 800px)');
  const [result,setResult]=useState();
  const {isSetLoading,isLoading}=useContext(DataContext);


  const {searchQuery}=useParams();

  
  
useEffect(()=> {
  fetchSearchResultData();
},[searchQuery]);

const fetchSearchResultData=()=>{
  isSetLoading(true);
  fetchDataApi(`search/?q=${searchQuery}`).then((res)=>{
    isSetLoading(false)
    setResult(res?.contents);
    
  });
};

  return (
    <HStack >
    {isnonMobile?<LeftMenu  />:null}
    
    <Container maxW={"100vw"}>
      {isLoading?<Loader/>:
      (<VStack overflowY={"scroll"} maxH="90vh" alignItems={"flex-start"} justifyContent={"space-between"}
      sx={{"&::-webkit-scrollbar":{display:"none",}}}>
        {result?.map((items,i)=> {
          if(items?.type!=="video") return false;
          let video=items.video;
          return (
          <SearchResultsCard key={video.videoId+i} video={video} /> 
          )
        })}
        
      </VStack>

      )}
    </Container>
    </HStack>
  )
}

export default SearchResults
