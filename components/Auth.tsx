import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { auth_instance } from '~/lib/authentication';

export default function Auth() {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const handleSendCode = async () => {
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      const vid = await auth_instance.signInWithPhone(formattedPhone);
      setVerificationId(vid);
      setIsVerifying(true);
      Alert.alert('Success', 'Verification code sent to your phone');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send verification code');
    }
  };

  const handleVerifyCode = async () => {
    try {
      await auth_instance.verifyPhoneNumber(verificationCode);
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to verify code');
    }
  };
  return (
    <>
      <SafeAreaView className="bg- flex-1 bg-[#DFD3C3] dark:bg-[#1A1A1A]">
        <View className="flex-1 justify-center">
          <Text className="mx-auto text-3xl font-normal leading-[normal] text-[#131B1D]">
            Cab Trails
          </Text>
        </View>
        <View className="flex-1 justify-start">
          <TextInput
            className="mx-auto mb-5 h-[50px] w-[351px] shrink-0 rounded-[11px] border-[0.5px] border-solid border-[rgba(19,27,29,0.77)] p-5 text-base font-normal leading-[normal] text-[#494D4B] [background:rgba(217,217,217,0.00)]"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Phone No."></TextInput>
          {isVerifying ? (
            <TextInput
              className="mx-auto mb-5 h-[50px] w-[351px] shrink-0 rounded-[11px] border-[0.5px] border-solid border-[rgba(19,27,29,0.77)] p-5 text-base font-normal leading-[normal] text-[#494D4B] [background:rgba(217,217,217,0.00)]"
              value={verificationCode}
              onChangeText={(text) => setVerificationCode(text)}
              placeholder="Enter verification code"
              keyboardType="number-pad"></TextInput>
          ) : null}
          <View className="mx-auto w-[90%] flex-row justify-end">
            <TouchableOpacity
              className="h-[39px] w-[125px] justify-center rounded-[11px] bg-[#9db4cf]"
              onPress={isVerifying ? handleVerifyCode : handleSendCode}>
              <Text style={{ fontSize: 16, textAlign: 'center', color: 'black' }}>
                {isVerifying ? 'Verify Code' : 'Send Code'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
