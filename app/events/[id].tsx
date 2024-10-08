import { AntDesign } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TextInput, ScrollView, Alert } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import Participants, { Participant } from '~/components/Participants';
import Recurring from '~/components/Recurring';
import eventService from '~/services/event.service';

export default function Event() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [totalAmount, setTotalAmount] = useState<string>();
  const [participants, setParticipants] = useState<Participant[]>([
    { name: 'You', percentage: 100 },
  ]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [interval, setInterval] = useState('');

  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await eventService.getOne(id);
      setTotalAmount(res.totalAmount?.toString() ?? '');
      if (res?.participants) {
        setParticipants(res.participants);
      }
      if (res.isRecurring) {
        setIsRecurring(res.isRecurring);
        setInterval(res.recurringInterval!);
      }
      return res;
    },
    enabled: !!id,
  });

  const updateEventMutation = useMutation({
    mutationFn: (updatedEvent: any) => eventService.update(id, updatedEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', id] });
      Alert.alert('Success', 'Event updated successfully');
      router.back();
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to update event. Please try again.');
      console.error('Update event error:', error);
    },
  });

  const handleSave = () => {
    if (!totalAmount || parseFloat(totalAmount) <= 0) {
      Alert.alert('Error!', 'Please enter a valid total amount');
      return;
    }

    updateEventMutation.mutate({
      ...event,
      totalAmount: parseFloat(totalAmount),
      participants,
      isRecurring,
      recurringInterval: interval,
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: event ? event.name : 'Event Details',
        }}
      />
      <Container>
        <ScrollView className="p-4" keyboardDismissMode="on-drag">
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : error ? (
            <Text>Error loading event details. Please try again.</Text>
          ) : event ? (
            <View>
              <Text className="mb-4 text-2xl font-bold capitalize">Add Expense</Text>

              <View className="rounded-lg bg-white p-4 shadow">
                <Text className="text-lg font-semibold opacity-70 ">How much?</Text>
                <TextInput
                  className="h-12 rounded border-gray-300 text-xl font-semibold"
                  keyboardType="numeric"
                  placeholder="Enter amount"
                  value={totalAmount}
                  onChangeText={setTotalAmount}
                />
              </View>

              <Participants
                total={totalAmount ? parseFloat(totalAmount) : 0}
                participants={participants}
                setParticipants={setParticipants}
              />

              <Recurring
                isRecurring={isRecurring}
                setIsRecurring={setIsRecurring}
                interval={interval}
                setInterval={setInterval}
              />
            </View>
          ) : (
            <Text>Event not found.</Text>
          )}
        </ScrollView>
        <View className="px-4">
          <Button
            onPress={handleSave}
            disabled={updateEventMutation.isPending}
            icon={<AntDesign name="save" size={24} color="white" className="mr-2" />}>
            {updateEventMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </View>
      </Container>
    </>
  );
}
