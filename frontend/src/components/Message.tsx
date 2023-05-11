import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { CLEAR_MESSAGE } from '../store/message/message.reducer';
import { RootState, useAppDispatch } from '../store/store';
export default function Message() {
  const dispatch = useAppDispatch();
  const message = useSelector((state: RootState) => state.message);
  if (message.message?.length == 0) {
    return null;
  }

  if (message.autoClose) {
    setTimeout(() => {
      dispatch(CLEAR_MESSAGE());
    }, 3000);
  }

  return (
    <Alert status={message.status} style={styles.container}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          justifyContent="space-between"
          alignItems={'center'}
        >
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {message.message}
            </Text>
          </HStack>
          {message.closable && (
            <IconButton
              onPress={() => dispatch(CLEAR_MESSAGE())}
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: 'coolGray.600',
              }}
            />
          )}
        </HStack>
      </VStack>
    </Alert>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    width: '50%',
    right: 0,
  },
});
