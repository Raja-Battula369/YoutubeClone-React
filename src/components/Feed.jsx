import React, { useContext } from 'react'
import { Container, HStack, useMediaQuery } from '@chakra-ui/react'
import LeftMenu from './LeftMenu'
import { DataContext } from '../context/contextApi'
import VideoCard from './VideoCard'
import Loader from './Loader'

const Feed = () => {
  const [isnonMobile] = useMediaQuery('(min-width: 800px)')
  const { searchResults, isLoading } = useContext(DataContext)

  return (
    <HStack>
      {isnonMobile ? <LeftMenu /> : null}

      <Container maxW={'100vw'}>
        {isLoading ? (
          <Loader />
        ) : (
          <HStack
            overflowY={'scroll'}
            maxH="90vh"
            wrap={'wrap'}
            justifyContent={'space-evenly'}
            sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
          >
            {searchResults.map((items, i) => (
              <VideoCard key={items?.video.videoId + i} video={items?.video} />
            ))}
          </HStack>
        )}
      </Container>
    </HStack>
  )
}

export default Feed
