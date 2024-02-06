"use client";
import { Button, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

const Search = ({setUserData,setLoading}) => {
  const [query, setQuery] = useState("");
  const toast = useToast(); // Move useToast outside the handleSubmit function

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true) ;
    setUserData(null)

    try {
      const res = await fetch(`https://api.github.com/users/${query}`);
      const data = await res.json();
      if (data.message) {
        return toast({
          title: "Error",
          description: data.message === "Not Found" ? "User Not Found" : data.message,
          status: "error",
          duration: 3000, 
          isClosable: true, 
        });
      }
      setUserData(data)
      addUserToLocalStorage(data,query)

    } catch (error) {
        return toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 3000, 
            isClosable: true, 
          });
    }finally{
        setLoading(false)
    }
  };

  const addUserToLocalStorage = (data, username) => {
    const users = JSON.parse(localStorage.getItem('github-users')) || [];
    const userExistsIndex = users.findIndex(user => user.id === username);
  
    if (userExistsIndex !== -1) {
      // Remove the existing user if found
      users.splice(userExistsIndex, 1);
    }
  
    // Add the new user data to the beginning of the array
    users.unshift({
      id: username,
      avatar_url: data.avatar_url,
      name: data.name,
      url: data.html_url
    });
  
    // Update localStorage with the modified users array
    localStorage.setItem('github-users', JSON.stringify(users));
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Input
        onSubmit={handleSubmit}
        variant={"outline"}
        placeholder={"Type a username here (i.e. AhmadRaza)"}
        focusBorderColor={"green.500"} // Corrected spelling
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        size="md"
        type="submit"
        colorScheme="whatsapp"
        mt={4}
        disabled={!query}
        opacity={!query ? 0.5 : 1}
      >
        Search
      </Button>
    </form>
  );
};

export default Search;
