import { PropsWithChildren } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import {
  BsFillBookmarksFill,
  BsFillInboxFill,
  BsPencilSquare,
  BsSearch,
} from "react-icons/bs";
import { data } from "./_data";
import { MobileMenuButton } from "./MobileMenuButton";
import { NavBreadcrumb } from "./NavBreadcrumb";
import { NavSectionTitle } from "./NavSectionTitle";
import { ScrollArea } from "./ScrollArea";
import { SearchInput } from "./SearchInput";
import { SidebarLink } from "./SidebarLink";
import { useMobileMenuState } from "./useMobileMenuState";
import { UserInfo } from "./UserInfo";

export const Shell = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const { isOpen, toggle } = useMobileMenuState();
  return (
    <Flex
      height="100vh"
      bg={mode("blue.800", "gray.800")}
      overflow="hidden"
      sx={{
        "--sidebar-width": "16rem",
      }}
    >
      <Box
        as="nav"
        display="block"
        flex="1"
        width="var(--sidebar-width)"
        left="0"
        py="5"
        px="3"
        color="gray.200"
        position="fixed"
      >
        <Box fontSize="sm" lineHeight="tall">
          <Box
            as="a"
            href="#"
            p="3"
            display="block"
            transition="background 0.1s"
            rounded="xl"
            _hover={{
              bg: "whiteAlpha.200",
            }}
            whiteSpace="nowrap"
          >
            <UserInfo name="Esther Collins" email="esther-colls@chakra.com" />
          </Box>
          <ScrollArea pt="5" pb="6">
            <SidebarLink
              display={{
                base: "block",
                lg: "none",
              }}
              mb="2"
              icon={<BsSearch />}
            >
              Search
            </SidebarLink>
            <Stack pb="6">
              <SidebarLink icon={<BsFillInboxFill />}>Inbox</SidebarLink>
              <SidebarLink icon={<BsFillBookmarksFill />}>
                Bookmarks
              </SidebarLink>
              <SidebarLink icon={<BsPencilSquare />}>Drafts</SidebarLink>
            </Stack>
            <Stack pb="6">
              <NavSectionTitle>Pages</NavSectionTitle>

              <SidebarLink>
                <Link href="/">
                  <span>???? Home</span>
                </Link>
              </SidebarLink>

              <SidebarLink>
                <Link href="/result">
                  <span>???? Result</span>
                </Link>
              </SidebarLink>

              <SidebarLink>???? Not Working yet</SidebarLink>
            </Stack>
            <Stack>
              <NavSectionTitle>Fake Members</NavSectionTitle>
              {data.users.map((user, index) => (
                <SidebarLink
                  key={index}
                  avatar={
                    <Avatar size="xs" name={user.name} src={user.image} />
                  }
                >
                  {user.name}
                </SidebarLink>
              ))}
            </Stack>
          </ScrollArea>
        </Box>
      </Box>
      <Box
        flex="1"
        p={{
          base: "0",
          md: "6",
        }}
        marginStart={{
          md: "var(--sidebar-width)",
        }}
        position="relative"
        left={isOpen ? "var(--sidebar-width)" : "0"}
        transition="left 0.2s"
      >
        <Box
          maxW="2560px"
          bg={mode("white", "gray.700")}
          height="100%"
          pb="6"
          rounded={{
            md: "lg",
          }}
        >
          <Flex direction="column" height="full">
            <Flex
              w="full"
              py="4"
              justify="space-between"
              align="center"
              px="10"
            >
              <Flex align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                <NavBreadcrumb />
              </Flex>
              <SearchInput />
            </Flex>
            <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
              <Heading size="md" fontWeight="extrabold" mb="6">
                Questionnaire
              </Heading>
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                flex="1 1 auto"
                borderWidth="3px"
                borderStyle="dashed"
                rounded="xl"
              >
                {children}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
