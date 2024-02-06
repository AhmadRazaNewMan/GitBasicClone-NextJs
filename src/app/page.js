"use client"

import { Button, Center, Container, Text } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import Search from "./Components/Search";
import UserProfile from "./Components/UserProfile";
import { useState } from "react";
  export default function Home() {
    const [userData,setUserData] = useState(null)
    const [loading,setLoading] =useState(false)
    console.log(userData);   
    return (
      <Container maxW="container.lg">
     <Navbar/>
      <Text textAlign={"center"} fontSize={"3xl"} my={4}> Search User On GitHub</Text>
       {/* lefting up of the data */}
      <Search setUserData = {(res)=>setUserData(res)} setLoading = {setLoading}/>
     
     {/* displaying user information if there is any*/}  
     {userData &&  <UserProfile userData = {userData}/>}
      </Container>
    );
  }
