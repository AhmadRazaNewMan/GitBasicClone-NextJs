import { DeleteIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const HistoryModel = ({ isOpen, onClose }) => {
    const toast = useToast();
    const handleDeleteUsers = (userId) => {
        const users = JSON.parse(localStorage.getItem('github-users')) || [] ;
        const userToDelete = users.find((user)=>user.id ===userId);
        if(userToDelete)users.splice(users.indexOf(userToDelete),1)
        localStorage.setItem("github-users",JSON.stringify(users))
    setSearchHistory(users)
     toast({
        title:"success",
        description:"User deleted successfully",
        status:"success",
        duration:3000,
        isClosable:true

    })
    }
  const [searchHistory, setSearchHistory] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("github-users")) || [];
    setSearchHistory(user);
  }, []);


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
    
      <ModalContent bg={"gray.900"}>
        <ModalHeader>Search History</ModalHeader>
        <ModalBody>
          <Text>Users You Searched For :</Text>
          <VStack gap={4} maxHeight={300} overflow={"auto"} my={4}>
            {searchHistory.length === 0 && (
              <Text color={"gray.400"} fontSize={"sm"} fontWeight={"bold"}>
                No users searched yet
              </Text>
            )}
            {searchHistory.map((user) => (
              <Flex
                key={user.id}
                alignItems={"center"}
                bg={"whiteAlpha.200"}
                width={"full"}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={4}
                p={2}
                cursor={"pointer"}
                justifyContent={"space-between"}
              >
                <Flex gap={2} alignItems={"center"}>
                  <Avatar
                    display={"block"}
                    size={"lg"}
                    src={user.avatar_url}
                    name={user.name || "User"}
                  />
                  <Box>
                    <Text fontWeight={"bold"}>{user.name || "User"}</Text>
                    <Text fontSize={"sm"} color={"gray.400"}>
                      {user.id}
                    </Text>
                  </Box>
                </Flex>
                <Flex alignItems={"center"} gap={4}>
                  <Link href={user.url}
                  size={"sm"}
                  color={"black"}
                  bg={"whatsapp.200"}
                  px={2}
                  borderRadius={4}
                  _hover={{textDecoration:"none",bg:"whatsapp.300"}}
                  >
                
                    
                      Visit
                    
                  </Link>
                  <DeleteIcon color={"red.400"}
                  onClick={()=>handleDeleteUsers(user.id)}/>
                </Flex>
              </Flex>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HistoryModel;
