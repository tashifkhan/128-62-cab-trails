import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

interface SignupForm {
	name: string;
	mobile: string;
}

export function SignupScreen() {
	const router = useRouter();
	const [formData, setFormData] = useState<SignupForm>({
		name: "",
		mobile: "",
	});

	function handleSignup() {
		if (!formData.name.trim() || !formData.mobile.trim()) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		if (!/^\d{10}$/.test(formData.mobile)) {
			Alert.alert("Error", "Please enter a valid 10-digit mobile number");
			return;
		}

		// TODO: Implement actual signup logic here
		console.log("Signup data:", formData);
	}

	return (
		<View className="flex-1 bg-white p-6 justify-center">
			<Text className="text-3xl font-bold mb-8 text-center">Sign Up</Text>

			<View className="space-y-4">
				<View>
					<Text className="text-gray-600 mb-2">Name</Text>
					<TextInput
						className="border border-gray-300 rounded-lg p-3"
						placeholder="Enter your name"
						value={formData.name}
						onChangeText={(text) => setFormData({ ...formData, name: text })}
					/>
				</View>

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
					onPress={handleSignup}
				>
					<Text className="text-white text-center font-semibold text-lg">
						Sign Up
					</Text>
				</TouchableOpacity>
			</View>

			<Link href="/signin" asChild>
				<TouchableOpacity className="mt-4">
					<Text className="text-blue-500 text-center">
						Already have an account? Sign In
					</Text>
				</TouchableOpacity>
			</Link>
		</View>
	);
}
