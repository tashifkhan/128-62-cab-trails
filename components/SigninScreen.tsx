import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

interface SigninForm {
	mobile: string;
}

export function SigninScreen() {
	const [formData, setFormData] = useState<SigninForm>({
		mobile: "",
	});

	function handleSignin() {
		if (!formData.mobile.trim()) {
			Alert.alert("Error", "Please enter your mobile number");
			return;
		}

		if (!/^\d{10}$/.test(formData.mobile)) {
			Alert.alert("Error", "Please enter a valid 10-digit mobile number");
			return;
		}

		// TODO: Implement actual signin logic here
		console.log("Signin data:", formData);
	}

	return (
		<View className="flex-1 bg-white p-6 justify-center">
			<Text className="text-3xl font-bold mb-8 text-center">Sign In</Text>

			<View className="space-y-4">
				<View>
					<Text className="text-gray-600 mb-2">Mobile Number</Text>
					<TextInput
						className="border border-gray-300 rounded-lg p-3"
						placeholder="Enter your mobile number"
						keyboardType="numeric"
						maxLength={10}
						value={formData.mobile}
						onChangeText={(text) => setFormData({ ...formData, mobile: text })}
					/>
				</View>

				<TouchableOpacity
					className="bg-blue-500 p-4 rounded-lg mt-6"
					onPress={handleSignin}
				>
					<Text className="text-white text-center font-semibold text-lg">
						Sign In
					</Text>
				</TouchableOpacity>

				<Link href="../signup" asChild>
					<TouchableOpacity className="mt-4">
						<Text className="text-blue-500 text-center">
							Don't have an account? Sign Up
						</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</View>
	);
}
