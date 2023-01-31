import { Container, useColorMode, VStack } from '@chakra-ui/react'

import MenuIconList from './MenuIconList'

const LeftMenu = () => {
  const { colorMode } = useColorMode()

  return (
    // sx={{border:"1px solid red"}}
    <VStack
      maxW="15rem"
      maxH={'100vh'}
      color={colorMode === 'light' ? 'black' : 'white'}
    >
      <Container
        h="90vh"
        overflowY="scroll"
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <MenuIconList />
      </Container>
    </VStack>
  )
}

export default LeftMenu
