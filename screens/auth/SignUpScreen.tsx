import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

export function SignUpScreen() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', number: '', password: '' });

  const validateForm = () => {
    const newErrors = { name: '', number: '', password: '' };
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Phone number validation
    if (!number) {
      newErrors.number = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(number)) {
      newErrors.number = 'Please enter a valid 10-digit phone number';
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

  const handleSignUp = () => {
    if (validateForm()) {
      console.log('Sign up:', { name, number, password });
    }
  };

  return (
    <View className="flex-1 justify-center bg-white px-4">
      <View className="space-y-8">
        <View>
          <Text className="text-center text-3xl font-bold">Create Account</Text>
          <Text className="mt-2 text-center text-gray-500">Sign up to get started</Text>
        </View>

        <View className="space-y-4">
          <View>
            <TextInput
              className={`rounded-lg border p-4 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
            {errors.name ? <Text className="mt-1 text-sm text-red-500">{errors.name}</Text> : null}
          </View>

          <View>
            <TextInput
              className={`rounded-lg border p-4 ${errors.number ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="Phone Number"
              value={number}
              onChangeText={setNumber}
              keyboardType="phone-pad"
            />
            {errors.number ? (
              <Text className="mt-1 text-sm text-red-500">{errors.number}</Text>
            ) : null}
          </View>

          <View>
            <TextInput
              className={`rounded-lg border p-4 ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errors.password ? (
              <Text className="mt-1 text-sm text-red-500">{errors.password}</Text>
            ) : null}
          </View>
        </View>

        <TouchableOpacity onPress={handleSignUp} className="rounded-lg bg-blue-500 p-4">
          <Text className="bg-red-300 text-center font-semibold text-white">Sign Up</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-500">Already have an account? </Text>
          <Link href="/auth/signin" className="text-blue-500">
            Sign In
          </Link>
        </View>
      </View>
    </View>
  );
}
