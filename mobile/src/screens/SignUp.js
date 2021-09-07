import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { TextInput } from '../components/Form';
import { Button } from '../components/Button';
import colors from '../constants/colors';
import { validateCredentials } from '../util/auth';
import { useSignUp } from '../util/api';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 20,
  },
});

export const SignUp = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const signup = useSignUp();

  const submit = async () => {
    setErrors({});
    try {
      await validateCredentials({ email, password, confirmPassword });

      signup.mutate(
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
        errorText={errors.password}
      />
      <TextInput
        label="Confirm Password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={text => setConfirmPassword(text)}
        errorText={errors.confirmPassword || signup?.error?.message}
      />
      <Button onPress={submit}>Sign Up</Button>
    </ScrollView>
  );
};
