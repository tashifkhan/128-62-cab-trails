import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { SigninScreen } from "@/components/Signin";

export default function SigninPage() {
	return (
		<>
			{/* <ScreenContent title="Home" path="App.tsx" /> */}
			<StatusBar style="light" />
			<SafeAreaView className="bg- flex-1 bg-[#DFD3C3] dark:bg-[#1A1A1A]">
				<View className="flex-1 justify-center">
					<Text className="mx-auto text-3xl font-normal leading-[normal] text-[#131B1D]">
						Cab Tails
					</Text>
				</View>
				<SigninScreen />
			</SafeAreaView>
		</>
	);
}
