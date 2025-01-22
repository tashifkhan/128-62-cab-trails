import {
	ThemeProvider,
	DarkTheme,
	DefaultTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useSegments, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const segments: Array<string> = useSegments();
	const router = useRouter();

	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		const inAuthGroup = segments[0] === "(auth)";

		if (!isAuthenticated && !inAuthGroup) {
			router.replace("../signin");
		} else if (isAuthenticated && inAuthGroup) {
			router.replace("/(tabs)");
		}
	}, [isAuthenticated, segments]);

	if (!loaded) return null;

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Slot />
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
