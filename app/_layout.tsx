import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <GestureHandlerRootView className="flex-1">
            <Stack>
                <Stack.Screen name="(tabs)" />
            </Stack>
        </GestureHandlerRootView>
    );
}
