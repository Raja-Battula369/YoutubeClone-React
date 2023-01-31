import React from 'react'
import {
  Button,
  Container,
  Divider,
  Icon,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { categories } from '../utils/Constant'
import { useContext } from 'react'

import { DataContext } from '../context/contextApi'
import { useNavigate } from 'react-router-dom'

const MenuList = () => {
  const navigate = useNavigate()
  const { selectCatagory, setSelectCatagory } = useContext(DataContext)
  const [isnonMobile] = useMediaQuery('(min-width: 800px)')

  const clickHandler = (type, name) => {
    if (type !== 'menu' && name !== 'Live') {
      setSelectCatagory(name)
      navigate('/')
    }
  }
  return (
    <>
      {categories.map((items, i) => (
        <Container
          key={i}
          py="3"
          borderRadius={'md'}
          sx={{ '&:hover': { backgroundColor: 'grey', opacity: '0.7' } }}
        >
          <Button
            minW={'8rem'}
            minH="2rem"
            isActive={selectCatagory === items.name}
            position="relative"
            onClick={() => {
              clickHandler(items.type, items.name)
            }}
            variant={'unstyled'}
            display="flex"
            justifyContent={'flex-start'}
            size={'2rem'}
            gap="1.5rem"
          >
            <Icon as={items.icon} />

            <Text>{items.name === 'New' ? 'Home' : items.name}</Text>
          </Button>
          {items.divider && isnonMobile ? (
            <Divider bgColor={'gray'} mt="1rem" orientation="horizontal" />
          ) : null}
        </Container>
      ))}
    </>
  )
}

export default MenuList
