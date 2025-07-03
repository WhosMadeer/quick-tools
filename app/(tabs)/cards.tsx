import { Card, CardIcon, CardIconList, suite } from "@/components/card";
import { AlignJustify } from "lucide-react-native";
import { useRef, useState } from "react";
import { Button, View } from "react-native";
import {
    Directions,
    Gesture,
    GestureDetector,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

/* 
    Mount a new card, and then animate it

*/

export default function DrawACard() {
    const [cardComponent, setCardComponent] =
        useState<React.JSX.Element | null>(null);

    const cardListRef = useRef<{ value: string; suite: suite }[]>([]);

    const handleDraw = () => {
        try {
            const number = Math.floor(Math.random() * (13 - 1) + 1);

            let key = Date.now().toString();
            let value = number.toString();
            if (number === 11) value = "J";
            else if (number === 12) value = "Q";
            else if (number === 13) value = "K";
            else if (number === 1) value = "A";

            const suite =
                CardIconList[Math.floor(Math.random() * CardIconList.length)];

            const card = (
                <Card
                    key={key}
                    number={value}
                    icon={<CardIcon suite={suite} />}
                />
            );

            // restart deck
            if (cardListRef.current.length >= 45) {
                cardListRef.current = [];
            }
            if (
                !cardListRef.current.some(
                    (card) => card.value === value && card.suite === suite
                )
            ) {
                cardListRef.current.push({ value, suite });
                console.log(cardListRef.current);
                setCardComponent(card);
            } else {
                handleDraw();
            }
        } catch (error) {
            console.error("Error drawing card:", error);
        }
    };

    const gesture = Gesture.Fling()
        .direction(Directions.DOWN)
        .onStart(() => {
            console.log("Fling started");
            runOnJS(handleDraw)();
        });

    return (
        <View className="flex h-full w-full items-center justify-start p-4 gap-2 perspective-[1000]">
            <GestureDetector gesture={gesture}>
                <AlignJustify size={128} />
            </GestureDetector>
            <Button title="Draw" onPress={handleDraw} />
            {cardComponent && cardComponent}
        </View>
    );
}
