import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { TextInput } from '../components/Form';
import { Button } from '../components/Button';
import colors from '../constants/colors';
import { validateCredentials } from '../util/auth';
import { useSignIn } from '../util/api';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 20,
  },
});

export const SignIn = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const signin = useSignIn();

  const submit = async () => {
    setErrors({});
    try {
      await validateCredentials({ email, password }, false);

      signin.mutate(
        { email, password },
        {
          onSuccess: () => {
            navigation.popToTop();
          },
        },
      );
    } catch (error) {
      const nextErrors = {};
      error.inner.forEach(e => {
        nextErrors[e.path] = e.message;
      });
      setErrors(nextErrors);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
        errorText={errors.email}
      />
      <TextInput
        label="Password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
        errorText={errors.password || signin?.error?.message}
      />
      <Button onPress={submit}>Sign In</Button>
    </ScrollView>
  );
};
