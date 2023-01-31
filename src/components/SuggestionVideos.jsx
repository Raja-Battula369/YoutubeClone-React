import React from 'react'
import { useMediaQuery, VStack } from '@chakra-ui/react'
import SuggestionVideoCard from './SuggestionVideoCard'

const SuggestionVideos = ({ videoData }) => {
  const [isnonMobile] = useMediaQuery('(min-width: 800px)')

  return (
    <VStack
      maxH="100vh"
      maxW={'100vw'}
      overflow={!isnonMobile && 'scroll'}
      sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
    >
      {videoData?.contents?.map((items, i) => {
        if (items?.type !== 'video') return false
        return <SuggestionVideoCard key={i} video={items?.video} />
      })}
    </VStack>
  )
}

export default SuggestionVideos
