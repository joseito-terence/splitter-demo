import { AntDesign } from '@expo/vector-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { Button } from '~/components/Button';
import eventService from '~/services/event.service';

export default function AddEvent() {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const queryClient = useQueryClient();

  const createEventMutation = useMutation({
    mutationFn: eventService.create,
    onSuccess: (res) => {
      queryClient.refetchQueries({ queryKey: ['events'] });
      setEventName('');
      setModalVisible(false);
      router.push(`/events/${res.id}`);
    },
    onError: (error) => {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event. Please try again.');
    },
  });

  const handleAddEvent = () => {
    if (eventName.trim()) {
      createEventMutation.mutate({ name: eventName.trim() });
    }
  };

  return (
    <View>
      <Button
        onPress={() => setModalVisible(true)}
        icon={<AntDesign name="plus" size={24} color="white" className="mr-2" />}>
        Add Event
      </Button>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <Pressable
            className="flex-1 items-center justify-center bg-black/50"
            onPress={() => setModalVisible(false)}>
            <View
              className="rounded-2xl bg-white p-8 shadow-lg"
              onStartShouldSetResponder={() => true}
              onTouchEnd={(e) => e.stopPropagation()}>
              <Text className="mb-6 text-left text-3xl font-bold">Create Event</Text>
              <TextInput
                className="mb-4 h-14 w-72 rounded border border-gray-300 px-3 text-xl text-black"
                onChangeText={setEventName}
                value={eventName}
                placeholder="Enter event name"
                placeholderTextColor="#9CA3AF"
                autoFocus
              />
              <View className="flex-row justify-center gap-2">
                <Button onPress={() => setModalVisible(false)} className="border bg-white px-8">
                  <Text className="text-black">Cancel</Text>
                </Button>
                <Button
                  onPress={handleAddEvent}
                  className="px-8"
                  textClassName="text-md"
                  disabled={createEventMutation.isPending}>
                  {createEventMutation.isPending ? (
                    <View className="flex-row items-center">
                      <ActivityIndicator size="small" color="white" />
                      <Text className="text-md ml-2 text-white">Creating...</Text>
                    </View>
                  ) : (
                    'Create'
                  )}
                </Button>
              </View>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
