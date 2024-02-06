"use client";
import { Badge, Button, Flex, Link, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Repos = ({ reposUrl }) => {
  const toast = useToast();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  console.log("Repos is Here ", repos);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const res = await fetch(reposUrl);
        const data = await res.json();
        if (data.message) throw new Error(data.message);
        setRepos(data);
      } catch (error) {
        return toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    // Call fetchRepos here
    fetchRepos();
  }, [reposUrl, toast]);

  return (
    <>
      <Text
        mt={4}
        color={"green.400"}
        fontWeight={"bold"}
        letterSpacing={1.5}
        fontSize="3xl"
        textAlign="center"
      >
        Repositories
      </Text>
      {loading && (
        <Flex justifyContent="center">
          <Spinner size={"xl"} my={4}></Spinner>
        </Flex>
      )}
 
      {repos && repos.sort((a,b)=>b.stargazers_count-a.stargazers_count).map((repo,idx) => {
    if(idx>4 && !showMore)return null;
    return(<Flex
        key={repo.id}
        padding={4}
        bg={"whiteAlpha.200"}
        _hover={{ bg: "whiteAlpha.400" }}
        my={4}
        px={10}
        gap={4}
        borderRadius={4}
        transition={"all 0.3s ease"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex flex={1} direction={"column"}>
          <Link href={repo.html_url} fontSize={"md"} fontWeight={"bold"}>
            {repo.name}
          </Link>
          <Badge
            fontWeight={"0.7em"}
            colorScheme={"whatsapp"}
            w={"min-content"}
            textAlign={"center"}
            px={1}
            mt={1}
          >
            Language: {repo.language || "None"}
          </Badge>
        </Flex>
        <Flex flex={1} gap={4} ml={6}>
          <Badge fontSize={"0.9em"} colorScheme={"twitter"} textAlign={"center"}>Stars: {repo.stargazers_count}</Badge>
          <Badge fontSize={"0.9em"} colorScheme={"twitter"} textAlign={"center"}>Forks: {repo.forks_count}</Badge>
          <Badge fontSize={"0.9em"} colorScheme={"twitter"} textAlign={"center"}>Watchers: {repo.watchers_count}</Badge>
        </Flex>
      </Flex>)
     
      }
       
     )}
     {
        showMore &&(
            <Flex justifyContent={"center"}my={4}>
                <Button size={"md"} colorScheme={"whatsapp"} onClick={()=>setShowMore(false)}>
                    Show Less
                </Button>
            </Flex>

        )
     }
      {
        !showMore && repos.length>5 && (    
            <Flex justifyContent={"center"}my={4}>
                <Button size={"md"} colorScheme={"whatsapp"} onClick={()=>setShowMore(true)}>
                    Show More
                </Button>
            </Flex>

        )
     }
    </>
  );
};

export default Repos;
