import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  type BreadcrumbProps,
} from "@chakra-ui/react";
import { HiChevronRight } from "react-icons/hi";

export const NavBreadcrumb = (props: BreadcrumbProps) => (
  <Breadcrumb
    fontSize="sm"
    {...props}
    separator={
      <Box
        as={HiChevronRight}
        color="gray.400"
        fontSize="md"
        top="2px"
        pos="relative"
      />
    }
  >
    <BreadcrumbItem color="inherit">
      <BreadcrumbLink>Welcome</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem color="inherit" isCurrentPage>
      <BreadcrumbLink>Personality Test</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);
