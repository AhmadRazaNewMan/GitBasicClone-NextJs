import { Box, Button, Center, Flex, useDisclosure } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import React from 'react';
import HistoryModel from './HistoryModel';


const Navbar = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <Flex justifyContent={'space-between'} py={6} alignItems={'center'}>
      <Box position={'relative'} aspectRatio={5 / 3} minHeight={10}>
        <Image
          src={"/logo.png"}
          fill
          alt='github-logo'
          sx={{
            filter: "invert(1)",
            width: "200px", // Set the width to a smaller value
            height: "auto", // Maintain aspect ratio
          }}
        />
      </Box>
      <Box>
        <Button size="md" colorScheme="whatsapp" onClick={onOpen}>Search History </Button>
      </Box>

      {isOpen &&<HistoryModel isOpen={isOpen} onClose={onClose}/>}
      
    </Flex>
  );
};

export default Navbar;
