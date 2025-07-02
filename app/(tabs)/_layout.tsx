import { Tabs } from "expo-router";
import { BottleWine, CircleDollarSign, WalletCards } from "lucide-react-native";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="coin"
                options={{
                    title: "Coin",
                    tabBarIcon: ({ color }) => (
                        <CircleDollarSign color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="spin-the-bottle"
                options={{
                    title: "Spin the Bottle",
                    tabBarIcon: ({ color }) => <BottleWine color={color} />,
                }}
            />
            <Tabs.Screen
                name="cards"
                options={{
                    title: "Cards",
                    tabBarIcon: ({ color }) => <WalletCards color={color} />,
                }}
            />
        </Tabs>
    );
}
