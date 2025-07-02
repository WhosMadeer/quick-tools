import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen name="coin" />
            <Tabs.Screen name="spin-the-bottle" />
        </Tabs>
    );
}
