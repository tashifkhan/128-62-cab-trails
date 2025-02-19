import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  useTheme,
  HelperText,
} from 'react-native-paper';
import { Link, router } from 'expo-router';
// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
// import { auth, firebaseConfig } from '../../firebase/config';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const theme = useTheme();
  const recaptchaVerifier = React.useRef(null);

  const handleSendVerificationCode = async () => {
    if (!phoneNumber || !name) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // TODO: Implement Firebase phone authentication
      // 1. Format phone number to E.164 standard
      // 2. Set up reCAPTCHA verification
      // 3. Send verification code via Firebase
      // const phoneProvider = new PhoneAuthProvider(auth);
      // const verificationId = await phoneProvider.verifyPhoneNumber(
      //   phoneNumber,
      //   recaptchaVerifier.current
      // );
      setVerificationId(verificationId);
      setShowVerification(true);
      setError('');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError('Error sending code: ' + errorMessage);
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError('Please enter verification code');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // TODO: Implement Firebase OTP verification and user creation
      // 1. Verify the OTP code
      // 2. Create user document in Firestore with:
      //    - User ID (from auth)
      //    - Full name
      //    - Phone number
      //    - Created at timestamp
      //    - Profile completion status
      // 3. Set up user session/state
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      // await signInWithCredential(auth, credential);
      router.push('/(app)/(tabs)');
    } catch (err) {
      setError('Invalid verification code');
    }
    setLoading(false);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      /> */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            variant="displaySmall"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Join CabTrails
          </Text>
          <Text
            variant="titleMedium"
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Create your account
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            label="Full Name"
            value={name}
            onChangeText={setName}
            style={[styles.input, { width: '100%' }]}
            error={!!error}
          />

          <TextInput
            mode="outlined"
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            placeholder="+1234567890"
            style={[styles.input, { width: '100%' }]}
            error={!!error}
          />

          {showVerification && (
            <TextInput
              mode="outlined"
              label="Verification Code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
              style={[styles.input, { width: '100%' }]}
              error={!!error}
            />
          )}

          {error ? <HelperText type="error">{error}</HelperText> : null}

          {!showVerification ? (
            <Button
              mode="contained"
              onPress={handleSendVerificationCode}
              loading={loading}
              disabled={loading}
              style={[styles.button, { width: '100%' }]}
              contentStyle={styles.buttonContent}
            >
              Send Verification Code
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={handleVerifyCode}
              loading={loading}
              disabled={loading}
              style={[styles.button, { width: '100%' }]}
              contentStyle={styles.buttonContent}
            >
              Verify & Create Account
            </Button>
          )}

          <View style={styles.linkContainer}>
            <Text variant="bodyMedium">Already have an account? </Text>
            <Button mode="text" compact onPress={() => router.push('/login')}>
              Login
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});
