import { Club, Diamond, Heart, Spade } from "lucide-react-native";
import { ReactNode, useEffect } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import Animated, {
    AnimatedStyle,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const TIME = 600;

interface CardProps {
    style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
    number: string;
    icon: ReactNode;
}

export function Card({ style, number, icon }: CardProps) {
    const rotation = useSharedValue(90); // x rotation value starts at 90
    const travelDistance = useSharedValue(0); // z travel distance

    const animatedCardStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateX: `${rotation.value}deg`,
                },
            ],
        };
    });

    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: travelDistance.value }],
        };
    });

    const animateDraw = () => {
        rotation.value = withTiming(0, {
            duration: TIME + 200,
        });
        travelDistance.value = withSequence(
            withTiming(150, { duration: TIME / 2 })
            // withDelay(200, withTiming(0, { duration: TIME / 2 }))
        );
    };

    useEffect(() => {
        animateDraw();
    }, []);

    return (
        <Animated.View style={animatedContainerStyle}>
            <Animated.View
                className="rounded-2xl border-4 w-32 h-48 bg-white p-2 justify-between"
                style={animatedCardStyle}>
                <View className="items-start">
                    <View className="items-center">
                        <Text className="font-semibold">{number}</Text>
                        {icon}
                    </View>
                </View>

                <View className="items-end">
                    <View className="items-center">
                        {icon}
                        <Text className="font-semibold">{number}</Text>
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    );
}

export const CardIconList = ["Heart", "Spades", "Diamond", "Clubs"] as const;
export type suite = (typeof CardIconList)[number];
interface CardIconProps {
    suite: suite;
}

export const CardIcon = ({ suite }: CardIconProps) => {
    switch (suite) {
        case "Heart":
            return <Heart size={16} />;
        case "Spades":
            return <Spade size={16} />;
        case "Diamond":
            return <Diamond size={16} />;
        case "Clubs":
            return <Club size={16} />;
        default:
            return null; // fallback if suite is somehow invalid
    }
};
