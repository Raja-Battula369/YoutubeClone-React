import { Badge, HStack, Image, Text, VStack,Icon, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import {VideoLength} from '../utils/Constant'
import { abbreviateNumber } from 'js-abbreviation-number'
import { Link } from 'react-router-dom'


const VideoCard = ({video}) => {
    // sx={{border:"1px solid yellow"}}
    const {colorMode} =useColorMode();

  return (
    <Link to={`/video/${video?.videoId}`}>
        <VStack  minH={"10rem"} maxW={"16rem"} my="0.5rem" alignItems={"start"} borderRadius={"xl"}   transform={"all 0.4s"}
        sx={{"&:hover":{transform:"scale(1.2)"}}}>
            
            <div>
                <Image src={video.thumbnails[0].url} borderRadius={"xl"}
                maxW="16rem" maxH="10rem" alt='Video' objectFit={"contain"} />
                
                {video?.lengthSeconds &&
                (<Badge  color={colorMode==="light"?"black":"white"}  pos={"relative"} top="-2rem" left="12rem">
                    
                    {<VideoLength time={video.lengthSeconds}/>}</Badge>)}
            </div>
            
            <HStack fontSize={"smaller"} minW={"full"} gap="0.3rem"  alignItems={"flex-start"} color={colorMode==="light"?"black":"white"}>
                
                <Image  src={video?.author?.avatar[0]?.url} borderRadius="full" maxW="2.3rem" alt="img" objectFit={"contain"} />
                
                <VStack alignItems={"flex-start"}>
                    
                    <Text as="b"  noOfLines={2}>{video?.title}</Text>
                    
                    <HStack opacity={"0.8"}>
                    
                    <Text  >{video?.author?.title}</Text>
                    
                    {video?.author?.badges[0]?.type ==="VERIFIED_CHANNEL" &&
                    (<Icon as= {BsFillCheckCircleFill} /> )}

                    </HStack>
                    <HStack opacity={"0.8"}>
                        <Text>{abbreviateNumber( video?.stats?.views,2)} views </Text>
                        <Text as="b">.</Text>
                        <Text> {video?.publishedTimeText} </Text>
                    </HStack>

                </VStack>
            </HStack>
        </VStack>
    </Link>
  )
}

export default VideoCard
