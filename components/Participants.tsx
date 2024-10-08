import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeOutLeft, LinearTransition } from 'react-native-reanimated';

import { Button } from '~/components/Button';

export interface Participant {
  name: string;
  percentage: number;
}

export default function Participants({
  total = 0,
  participants,
  setParticipants,
}: {
  total: number;
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
}) {
  useEffect(() => {
    // Ensure percentages add up to 100% when participants are added or removed
    const totalPercentage = participants.reduce((sum, person) => sum + person.percentage, 0);
    if (totalPercentage !== 100) {
      const lastPerson = participants[participants.length - 1];
      updatePercentage(participants.length - 1, lastPerson.percentage + (100 - totalPercentage));
    }
  }, [participants.length]);

  const addParticipant = () => {
    setParticipants([...participants, { name: '', percentage: 0 }]);
  };

  const updateName = (index: number, newName: string) => {
    if (index === 0) return;
    const updatedParticipants = [...participants];
    updatedParticipants[index].name = newName;
    setParticipants(updatedParticipants);
  };

  const updatePercentage = (index: number, newPercentage: number) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].percentage = newPercentage;

    // Adjust the last person's percentage to make sure the total is 100%
    const totalPercentage = updatedParticipants.reduce((sum, person) => sum + person.percentage, 0);
    const lastPerson = updatedParticipants[updatedParticipants.length - 1];
    lastPerson.percentage += 100 - totalPercentage;

    setParticipants(updatedParticipants);
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const calculateAmount = (percentage: number): string => {
    return ((total * percentage) / 100).toFixed(2);
  };

  return (
    <View className="mt-8">
      <Text className="mb-4 text-2xl font-bold capitalize">Participants</Text>

      <View className="rounded-lg bg-white p-4 shadow">
        {participants.map((participant, index) => (
          <Animated.View
            key={index}
            entering={FadeInDown}
            exiting={FadeOutLeft}
            layout={LinearTransition}
            className="mb-4">
            <View className="flex-row items-center">
              <View className="mr-2 h-10 w-10 items-center justify-center rounded-full bg-indigo-500">
                <Text className="text-lg font-bold text-white">
                  {participant.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <TextInput
                className="mr-2 flex-1 border-b border-gray-300 p-2"
                placeholder="Name"
                value={participant.name}
                onChangeText={(text) => updateName(index, text)}
              />
              <TextInput
                className="w-19 mr-2 border-b border-gray-300 p-2"
                placeholder="%"
                keyboardType="numeric"
                value={participant.percentage.toString()}
                onChangeText={(text) => updatePercentage(index, Number(text))}
              />
              <Text>%</Text>
              <Text className="w-24 text-right font-bold">
                £{calculateAmount(participant.percentage)}
              </Text>
              <TouchableOpacity
                onPress={() => removeParticipant(index)}
                disabled={index === 0}
                className={`ml-2 h-8 w-8 items-center justify-center rounded-full border-2 ${
                  index === 0 ? 'border-gray-300' : 'border-red-500'
                }`}>
                <AntDesign name="minus" size={16} color={index === 0 ? 'gray' : 'red'} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
        <Button
          onPress={addParticipant}
          className="mt-4 border bg-white"
          icon={<AntDesign name="plus" size={24} color="black" className="mr-2" />}>
          <Text className="text-black">Add Participant</Text>
        </Button>
      </View>
    </View>
  );
}
