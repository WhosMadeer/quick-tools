import { DeviceMotion } from "expo-sensors";
import { BottleWine } from "lucide-react-native";
import { useEffect } from "react";
import { Button, View } from "react-native";
import { Slider } from "react-native-awesome-slider";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const BottleSpinner = Animated.createAnimatedComponent(BottleWine);

export default function SpinTheBottle() {
    // starting rotation
    const rotation = useSharedValue(0);

    // slider code
    const progress = useSharedValue(1800);
    const min = useSharedValue(100);
    const max = useSharedValue(3600); // assign max value

    // rotate randomly on press
    const handleRotate = () => {
        const angle = Math.floor(Math.random() * progress.value);
        rotation.value = withTiming(rotation.value + angle, {
            duration: 1000 + (angle / 360) * 50,
            easing: Easing.inOut(Easing.quad),
        });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotateZ: `${rotation.value}deg` }],
    }));

    useEffect(() => {
        DeviceMotion.addListener((device) => {
            /*
                alpha is around Z axis
                beta for X axis
                gamma for Y axis. 
            */

            if (device.acceleration) {
                const magnitude =
                    device.acceleration.x ^
                    (2 + device.acceleration.y) ^
                    (2 + device.acceleration.z) ^
                    2 ^
                    (1 / 2);

                // console.log(magnitude);
                if (Math.abs(magnitude) > 50) {
                    handleRotate();
                }
            }

            return () => DeviceMotion.removeAllListeners();
        });
    }, []);

    return (
        <View className="flex h-full w-full items-center justify-center p-4 gap-2">
            <BottleSpinner size={128} style={animatedStyle} />
            <Button title="Spin" onPress={handleRotate} />
            <View className="w-full">
                <Slider
                    progress={progress}
                    minimumValue={min}
                    maximumValue={max}
                    bubble={(value) =>
                        `${(Math.round(value * 100) / max.value).toFixed(0)}`
                    }
                />
            </View>
        </View>
    );
}
