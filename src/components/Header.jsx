import {  HStack, Image, Input, InputGroup, InputRightElement,  useMediaQuery,Icon,  InputLeftAddon, Menu, MenuButton, IconButton, MenuList, useColorMode,} from '@chakra-ui/react'
import React, {  useState } from 'react'
import {motion} from 'framer-motion'
import {BsSearch,BsBell, BsCameraVideo, BsArrowLeft, BsList} from 'react-icons/bs'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import MenuIconList from './MenuIconList'

import ytMobileLogo from '../img/YouTube-Icon-Full-Color-Logo.wine.png';
import ytLogo1 from '../img/YouTube-White-Full-Color-Logo.wine.png';
import ytLogo2 from '../img/YouTube-Logo.wine.png';


const Header = () => {
  const [isnonMobile]=useMediaQuery("(min-width: 800px)");
  const [isSearchIcon,setIsSearchIcon]=useState(false);
  const [searchQuery,setSearchQuery]=useState("");
  const {colorMode,toggleColorMode} =useColorMode();
  const navigate=useNavigate();
  

  const searchQueryHandler=(event)=> {
    if ((event?.key==="Enter"|| event==="searchButton" ) && searchQuery?.length>0){
      navigate(`/searchResult/${searchQuery}`);
    }
  }
  
  return (
// sx={{border:"1px solid red"}}
    <HStack  justifyContent={"space-evenly"}   px="3"    shadow="lg">
        {!isnonMobile && !isSearchIcon? (
                <Menu  >
                    <MenuButton  position={"relative"} left="-3%" boxSize={"2rem"} aria-label='Options'
                     as={IconButton} icon={<BsList/>} m="0" variant="outline"
                     color={colorMode==="light"?"black":"white"}/>
                    
                    <MenuList color={colorMode==="light"?"black":"white"}>
                      
                      <HStack maxW="100vw" overflowX={"scroll"} sx={{"&::-webkit-scrollbar":{display:"none"}}}>
                      
                        <MenuIconList  />
                      
                      </HStack>
                    </MenuList>
                </Menu>):null}

        <motion.div  animate={{translateX:"-15px"}}
        transition={{duration:2,repeat:Infinity,repeatType:"reverse"}}>

        
            <Image 
             w="20" alt='Youtude' 
             src={ isnonMobile ?(colorMode==="light"?ytLogo2:ytLogo1): (ytMobileLogo)} objectFit={"contain"}
            onClick={()=>navigate("/")} sx={{"&:hover":{cursor:"pointer"}}}/>
        </motion.div>

        {
          isnonMobile || isSearchIcon ? (
            <InputGroup  w="40rem" size={"md"}   color={colorMode==="light"?"black":"white"} >

              {isSearchIcon && !isnonMobile ?
              (<InputLeftAddon borderRadius={"full"} bgColor={"blackAlpha.400"} color={colorMode==="light"?"black":"white"}
               children={<BsArrowLeft  sx={{"&:hover":{cursor:"pointer"}}}
               onClick={()=>setIsSearchIcon(false)}/>}/>):null}
            
            <Input borderRadius={"full"} type={"text"} appearance="textfield" placeholder="Search" value={searchQuery}
             onChange={(e)=>setSearchQuery(e.target.value)} 
             onKeyUp={searchQueryHandler} />
            
            <InputRightElement w="4rem" borderEndRadius={"full"}
              sx={{"&:hover":{cursor:"pointer"}}} children={< Icon as={BsSearch}  />}
             onClick={()=>searchQueryHandler("searchButton")} />
        
        </InputGroup>
          ):null
        }
        
        {
          isSearchIcon && !isnonMobile  ? null:
          (
            <HStack  gap="1.5rem" w="20rem" position={"relative"} right="-1%" justifyContent={["center","flex-end"]}>
              
          {isnonMobile ? null: (<Icon as={BsSearch} color={colorMode==="light"?"black":"white"} maxW={5} maxH={5} onClick={()=>setIsSearchIcon(true)} />)}
          <IconButton isRound="true" maxW={5} maxH={5} icon={colorMode==="light"?<FaSun/>:<FaMoon/>}
          onClick={toggleColorMode}/>

          
          
          <Icon as={BsCameraVideo} color={colorMode==="light"?"black":"white"} maxW={5} maxH={5}  />
          
          <Icon as={BsBell} color={colorMode==="light"?"black":"white"} maxW={5} maxH={5} />
          
          
          <Image   maxW={5} maxH={5} alt='Avatar' src="https://www.giantbomb.com/a/uploads/scale_small/1/14242/322895-might_guy.jpg" objectFit={"contain"} borderRadius={"full"}/>
        
        </HStack>
          ) 
        }
        
    </HStack>

    )
}

export default Header
