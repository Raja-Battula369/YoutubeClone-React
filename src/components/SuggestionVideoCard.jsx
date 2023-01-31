import {
  Badge,
  HStack,
  Image,
  Text,
  VStack,
  Icon,
  useColorMode,
} from '@chakra-ui/react'
import { abbreviateNumber } from 'js-abbreviation-number'
import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { VideoLength } from '../utils/Constant'

const SuggestionVideoCard = ({ video }) => {
  const { colorMode } = useColorMode()

  return (
    <Link to={`/video/${video?.videoId}`}>
      <HStack
        fontSize={['xx-small', 'small', 'md']}
        alignItems="flex-start"
        maxW={'80vw'}
        gap="0.1rem"
        color={colorMode === 'light' ? 'black' : 'white'}
      >
        <div>
          <Image
            src={video.thumbnails[0].url}
            borderRadius={'xl'}
            maxW={'10rem'}
            alt="Video"
            objectFit={'contain'}
          />

          {video?.lengthSeconds && (
            <Badge
              fontSize={['xx-small', 'small', 'md']}
              color={colorMode === 'light' ? 'black' : 'white'}
              pos={'relative'}
              top={['-1rem', '-2rem']}
              left={'5.5rem'}
            >
              {<VideoLength time={video.lengthSeconds} />}
            </Badge>
          )}
        </div>

        <VStack w="15rem" alignItems={'flex-start'}>
          <Text as="b" noOfLines={2}>
            {video?.title}
          </Text>

          <HStack opacity={'0.8'}>
            <Text>{video?.author?.title}</Text>

            {video?.author?.badges[0]?.type === 'VERIFIED_CHANNEL' && (
              <Icon as={BsFillCheckCircleFill} />
            )}
          </HStack>
          <HStack opacity={'0.8'}>
            <Text>{abbreviateNumber(video?.stats?.views, 2)} views </Text>
            <Text as="b">.</Text>
            <Text> {video?.publishedTimeText} </Text>
          </HStack>
        </VStack>
      </HStack>
    </Link>
  )
}

export default SuggestionVideoCard
