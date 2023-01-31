import { AspectRatio, Container, HStack, Image, Text, VStack,Icon,  useMediaQuery, Grid, Collapse, Button, Box, useColorMode } from '@chakra-ui/react';
import { abbreviateNumber } from 'js-abbreviation-number';
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/contextApi';
import {fetchDataApi} from '../utils/api';
import Loader from './Loader';
import SuggestionVideos from './SuggestionVideos';

const VideoDetails = () => {

  const [video,setVideo]=useState();
  const [relatedVideos,setRelatedVideos]=useState();
  const [show,setShow]=useState(false);
  
  const [isnonMobile]=useMediaQuery("(min-width: 800px)");
  const {isSetLoading,isLoading}=useContext(DataContext);
  const {colorMode} =useColorMode();

  
  const {id}=useParams();


  const handleToggle = () => setShow(!show)

  useEffect(()=> {

    fetchVideoDetails();
    fetchRelatedVideoDetails();

  },[id]);

  const fetchVideoDetails=()=> {
    isSetLoading(true);
    fetchDataApi(`video/details/?id=${id}`).then((res)=>{
      setVideo(res,"ds")
      isSetLoading(false)
      })
      

  };

  const fetchRelatedVideoDetails=()=> {

    isSetLoading(true);

    fetchDataApi(`video/related-contents/?id=${id}`).then((res)=>{
      setRelatedVideos(res)
      isSetLoading(false)
    });
    
  };
  return (
    

    <Container    maxW={"100vw"} >
      {isLoading ? <Loader/>:(
      <Grid templateColumns={"repeat(2,1fr)"} justifyContent={"space-evenly"} overflow="scroll" sx={{"&::-webkit-scrollbar":{display:"none"}}}>    
        <VStack  alignItems={"flex-start"} mb="0.6rem" ml={["","1rem"]} pb={["2rem","1rem"]} >
          <AspectRatio borderRadius={"md"} minW={isnonMobile?"55vw":"90vw"} ratio={5/3}>
              <ReactPlayer url= {`https://www.youtube.com/embed/${id}`} width="100%" height="100%"
                   style={{ backgroundColor: "black" }} controls playing={true}/>
          </AspectRatio>    
              <Text noOfLines={1} fontSize={["x-small","small"]} color={colorMode==="light"?"black":"white"} as="b">{video?.title}</Text>
                  <Grid fontSize={["x-small","small"]} templateColumns={["","repeat(4,1fr)"]} gap={["0.4rem",""]}>
                <HStack color={colorMode==="light"?"black":"white"}  gap="0.4rem">
                  <Image borderRadius={"full"} src={video?.author?.avatar[0]?.url} w={["2rem","3rem"]} objectFit="contain"/>
                    <VStack  alignItems={"flex-start"}  >
                        <HStack >
                          <Text  as="b" >{video?.author?.title}</Text>
                        
                          {video?.author?.badges[0]?.type ==="VERIFIED_CHANNEL" &&
                          (<Icon as= {BsFillCheckCircleFill} /> )}
                         </HStack>
                          
                          <Text  color={colorMode==="light"?"black":"white"} opacity={"0.8"} >
                          {video?.author?.stats?.subscribersText}</Text>
                    </VStack>
                </HStack>
                <HStack color={colorMode==="light"?"black":"white"} gridColumnStart={4}>
                        <Icon boxSize={"2rem"} borderRadius="full" as={AiOutlineLike} sx={{"&:hover":{backgroundColor:"white",color:"black",cursor:"pointer"}}}  />
                        <Text> {`${abbreviateNumber(video?.stats?.likes,2)} Likes`}</Text>
                </HStack>
              </Grid>
          
          <Box color={colorMode==="light"?"black":"white"} fontSize={["x-small","small"]} alignItems="center" maxW={["15rem","30rem",""]}>
          <Collapse  startingHeight={50} in={show}>
              <HStack color={colorMode==="light"?"black":"white"}>
                <Text as={"b"} >{`${abbreviateNumber(video?.stats?.views,2)} views`} </Text>
                <Text as={"b"}>{new Date(video?.publishedDate).toDateString().slice(4,)} ago </Text>
                <Text as={"b"}>{`${abbreviateNumber(video?.stats?.comments,2)} Comments`} </Text>
              </HStack>
              {video?.description}
      </Collapse>
      <Button fontSize={["x-small","small"]} size='sm' variant={"unstyled"} color={colorMode==="light"?"black":"white"}
       onClick={handleToggle} mt='1rem'>
        Show {show ? 'Less' : 'More'}
      </Button>
          </Box>
      </VStack>
          
          {isnonMobile && (
            <SuggestionVideos videoData={relatedVideos} />

          )}
    </Grid>)}
    {!isnonMobile && !isLoading &&(
    <Container  >
        <SuggestionVideos videoData={relatedVideos} />
    </Container>
    )}
    
    </Container>
  )
}

export default VideoDetails
