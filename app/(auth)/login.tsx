import React, { useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  useTheme,
  HelperText,
} from 'react-native-paper';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const handleSendOTP = async () => {
    if (!phone || phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);
    try {
      // TODO: Implement Firebase phone authentication
      setOtpSent(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid OTP');
      return;
    }
    setLoading(true);
    try {
      // TODO: Implement Firebase OTP verification

      // Check if user exists in database
      // TODO: Replace with actual Firebase user check
      const userExists = false; // This will be replaced with actual database check

      if (userExists) {
        router.push('/(app)/(tabs)');
      } else {
        setOtpVerified(true);
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
    setLoading(false);
  };

  const handleComplete = async () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    setLoading(true);
    try {
      // TODO: Create or update user profile in Firebase
      router.push('/(app)/(tabs)');
    } catch (err) {
      setError('Failed to complete registration');
    }
    setLoading(false);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            variant="displaySmall"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            CabTrails
          </Text>
          <Text
            variant="titleMedium"
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Connect with fellow commuters
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            label="Phone Number"
            value={phone}
            onChangeText={(text) => {
              setPhone(text.replace(/[^0-9]/g, ''));
              setError('');
            }}
            keyboardType="phone-pad"
            maxLength={10}
            style={[styles.input, { width: '100%' }]}
            error={!!error}
            disabled={otpSent}
            left={<TextInput.Affix text="+91" />}
          />

          {otpSent && !otpVerified && (
            <Animated.View
              style={[
                { width: '100%' },
                {
                  opacity: slideAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TextInput
                mode="outlined"
                label="Enter OTP"
                value={otp}
                onChangeText={(text) => {
                  setOtp(text.replace(/[^0-9]/g, ''));
                  setError('');
                }}
                keyboardType="number-pad"
                maxLength={6}
                style={[styles.input, { width: '100%' }]}
                error={!!error}
              />
            </Animated.View>
          )}

          {otpVerified && (
            <Animated.View
              style={[
                { width: '100%' },
                {
                  opacity: slideAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TextInput
                mode="outlined"
                label="Full Name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setError('');
                }}
                style={[styles.input, { width: '100%' }]}
                error={!!error}
              />
            </Animated.View>
          )}

          {error ? <HelperText type="error">{error}</HelperText> : null}

          <Button
            mode="contained"
            onPress={
              otpVerified
                ? handleComplete
                : otpSent
                ? handleVerifyOTP
                : handleSendOTP
            }
            loading={loading}
            disabled={loading}
            style={[styles.button, { width: '100%' }]}
            contentStyle={styles.buttonContent}
          >
            {otpVerified
              ? 'Complete Registration'
              : otpSent
              ? 'Verify OTP'
              : 'Get OTP'}
          </Button>

          <View style={styles.linkContainer}>
            <Text variant="bodyMedium">Don't have an account? </Text>
            <Button
              mode="text"
              compact
              onPress={() => router.push('/register')}
            >
              Sign Up
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
    marginTop: 16,
  },
});
