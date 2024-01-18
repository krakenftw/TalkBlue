import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "./login/Login";
import Singup from "./Singup";

const Homepage = () => {
  return (
    <div>
      <Container maxW="4xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          border-width="2"
          border-radius="xl"
          m="2rem 0"
        >
          <Text className="text-4xl" size="xl" color={"white"}>
            CHATTIS
          </Text>
        </Box>
        <Box width={{ base: "90%", md: "75%" }}>
          <Tabs size="md" defaultIndex={0} variant="soft-rounded">
            <TabList p="1rem">
              <Tab
                width="100%"
                border={"1px solid gray"}
                color={"grey"}
                _selected={{
                  color: "white",
                  border: "1px solid white",
                }}
                borderTopEndRadius={"0px"}
                borderBottomEndRadius={"0px"}
              >
                Login
              </Tab>
              <Tab
                width="100%"
                border={"1px solid gray"}
                color={"grey"}
                _selected={{
                  color: "white",
                  border: "1px solid white",
                }}
                borderTopLeftRadius={"0px"}
                borderBottomLeftRadius={"0px"}
              >
                Register
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Singup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default Homepage;
