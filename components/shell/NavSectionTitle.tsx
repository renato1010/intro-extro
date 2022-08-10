import { Text, type TextProps } from "@chakra-ui/react";
import * as React from "react";

export const NavSectionTitle = (props: Partial<TextProps>) => (
  <Text
    casing="uppercase"
    fontSize="xs"
    fontWeight="semibold"
    letterSpacing="wide"
    paddingStart="3"
    color="gray.400"
    {...props}
  />
);
