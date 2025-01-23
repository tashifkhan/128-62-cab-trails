import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

export function SignInScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ phone: '', password: '' });

  const validateForm = () => {
    const newErrors = { phone: '', password: '' };
    let isValid = true;

    // Phone validation
    if (!phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      console.log('Sign in:', { phone, password });
    }
  };

  return (
    <View className="flex-1 justify-center bg-gradient-to-b from-blue-50 to-white px-6">
      <View className="space-y-10">
        {/* Header */}
        <View className="space-y-2">
          <Text className="text-center text-4xl font-bold text-gray-800">Welcome Back</Text>
          <Text className="text-center text-base text-gray-500">
            Sign in to continue your journey
          </Text>
        </View>

        {/* Form Fields */}
        <View className="space-y-6">
          <View>
            <TextInput
              className={`rounded-xl border-2 bg-white p-4 shadow-sm ${
                errors.phone ? 'border-red-400' : 'border-gray-100'
              }`}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />
            {errors.phone ? (
              <Text className="mt-2 text-sm text-red-500">{errors.phone}</Text>
            ) : null}
          </View>

          <View>
            <TextInput
              className={`rounded-xl border-2 bg-white p-4 shadow-sm ${
                errors.password ? 'border-red-400' : 'border-gray-100'
              }`}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#9CA3AF"
            />
            {errors.password ? (
              <Text className="mt-2 text-sm text-red-500">{errors.password}</Text>
            ) : null}
          </View>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={handleSignIn}
          className="rounded-xl bg-blue-600 p-4 shadow-lg"
          activeOpacity={0.8}>
          <Text className="text-center text-lg font-semibold text-white">Sign In</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row justify-center space-x-1">
          <Text className="text-gray-600">Don't have an account?</Text>
          <Link href="/auth/signup" className="font-semibold text-blue-600">
            Sign Up
          </Link>
        </View>
      </View>
    </View>
  );
}
