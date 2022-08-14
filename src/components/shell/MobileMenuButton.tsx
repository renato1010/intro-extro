import { Box } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { HiMenu, HiX } from "react-icons/hi";

type MobileMenuButtonProps = {
  isOpen: boolean;
  onClick: MouseEventHandler<HTMLDivElement> &
    MouseEventHandler<HTMLButtonElement>;
};
export const MobileMenuButton = ({
  onClick,
  isOpen,
}: MobileMenuButtonProps) => {
  return (
    <Box
      display={{
        base: "block",
        md: "none",
      }}
      ml="-8"
      mr="2"
      as="button"
      type="button"
      rounded="md"
      p="1"
      fontSize="xl"
      color="gray.500"
      _hover={{
        bg: "gray.100",
      }}
      onClick={onClick}
    >
      <Box srOnly>{isOpen ? "Close Menu" : "Open Menu"}</Box>
      {isOpen ? <HiX /> : <HiMenu />}
    </Box>
  );
};
