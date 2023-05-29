import { Alert, Platform } from 'react-native';

export const convertDate = (date: string) => {
  const dateObj = new Date(date);
  return (
    dateObj.getHours() +
    ':' +
    dateObj.getMinutes() +
    ' ' +
    dateObj.getUTCDate() +
    '/' +
    dateObj.getUTCMonth() +
    '/' +
    dateObj.getUTCFullYear()
  );
};

export const fkhAlert = (title: string, description: string, callback: any) => {
  // Distinction sur web : usage de window
  if (Platform.OS == 'web') {
    const result = window.confirm(
      [title, description].filter(Boolean).join('\n')
    );
    if (result) {
      callback();
    }
  } else {
    // Sur smartphone : usage du component Alert
    Alert.alert(title, description, [
      {
        text: 'Non',
        style: 'cancel',
      },
      { text: 'Oui', onPress: () => callback() },
    ]);
  }
};
