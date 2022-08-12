import { HStack, StackProps, useRadioGroup } from "@chakra-ui/react";
import { RadioOption } from "./RadioOption";

type RadioGroupProps = {
  name: string;
  options: string[];
  onChange: (value: string) => void;
} & Omit<StackProps, "onChange">;

export const RadioGroup = (props: RadioGroupProps) => {
  const { name, options, onChange, ...rest } = props;
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    onChange,
  });
  return (
    <HStack spacing={{ base: 2, md: 4 }} {...getRootProps(rest)}>
      {options.map((value) => {
        const { isChecked, ...rest } = getRadioProps({ value });
        return (
          <RadioOption key={value} {...rest}>
            {value}
          </RadioOption>
        );
      })}
    </HStack>
  );
};
