import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeOutDown, LinearTransition } from 'react-native-reanimated';

interface RecurringProps {
  isRecurring: boolean;
  setIsRecurring: (value: boolean) => void;
  interval: string;
  setInterval: (value: string) => void;
}

export default function Recurring({
  isRecurring,
  setIsRecurring,
  interval,
  setInterval,
}: RecurringProps) {
  return (
    <View className="my-8">
      <TouchableOpacity
        onPress={() => setIsRecurring(!isRecurring)}
        className="mb-4 flex-row items-center"
        activeOpacity={0.7}>
        <Checkbox
          value={isRecurring}
          onValueChange={setIsRecurring}
          color={isRecurring ? 'rgb(99 102 241)' : undefined}
          className="mr-2"
        />
        <Text className="text-base">Recurring Payment</Text>
      </TouchableOpacity>

      {isRecurring && (
        <Animated.View
          className="rounded-lg bg-white p-4 shadow"
          entering={FadeInDown}
          exiting={FadeOutDown}
          layout={LinearTransition}>
          <Text className="mb-2 text-base">Repeat every:</Text>
          <View className="">
            <Picker selectedValue={interval} onValueChange={(itemValue) => setInterval(itemValue)}>
              <Picker.Item label="Month" value="monthly" />
              <Picker.Item label="Year" value="annually" />
            </Picker>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
