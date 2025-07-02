import { CircleDollarSign, CircleUserRound } from "lucide-react-native";
import { useState } from "react";
import { Button, View } from "react-native";
import {
    Directions,
    Gesture,
    GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const HeadsCoinFlipper = Animated.createAnimatedComponent(CircleUserRound);
const TailsCoinFlipper = Animated.createAnimatedComponent(CircleDollarSign);

const TIME = 1000;

export default function FlipACoin() {
    const rotation = useSharedValue(0); // x rotation value
    const travelDistance = useSharedValue(0); // z travel distance

    //   const side = useSharedValue(0); // 0 is head, 1 is tails
    const [side, setSide] = useState(0);

    const animatedCoinStyle = useAnimatedStyle(() => {
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

    const handleFlip = () => {
        setSide(Math.floor(Math.random() * 2));

        const numOfRotation = Math.floor(Math.random() * 4 + 2); // maximum 5 flips, minimum 2 flips
        rotation.value = withTiming(rotation.value + 360 * numOfRotation, {
            duration: TIME + 200,
        });
        travelDistance.value = withSequence(
            withTiming(-50 * numOfRotation, { duration: TIME / 2 }),
            withDelay(200, withTiming(0, { duration: TIME / 2 }))
        );
    };

    const gesture = Gesture.Fling()
        .direction(Directions.UP)
        .onStart(() => {
            runOnJS(handleFlip)();
        });

    const CoinFlipper = Animated.createAnimatedComponent(
        side === 0 ? CircleDollarSign : CircleUserRound
    );

    return (
        <View className="flex h-full w-full items-center justify-end p-4 gap-2 perspective-[1000]">
            <GestureDetector gesture={gesture}>
                <Animated.View style={animatedContainerStyle}>
                    <CoinFlipper size={128} style={animatedCoinStyle} />
                </Animated.View>
            </GestureDetector>
            <Button title="Flip" onPress={handleFlip} />
        </View>
    );
}
