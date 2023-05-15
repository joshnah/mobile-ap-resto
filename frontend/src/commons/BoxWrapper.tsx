import { Box } from 'native-base';

export default function BoxWrapper(props: any) {
  return (
    <Box
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
    >
      {props.children}
    </Box>
  );
}
