import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Button } from '~/components/Button';

export default function AddEvent() {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');

  const handleAddEvent = () => {
    if (eventName.trim()) {
      console.log('Event added:', eventName);
      setEventName('');
      setModalVisible(false);
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
                className="mb-4 h-14 w-64 rounded border border-gray-300 px-3 text-xl text-black"
                onChangeText={setEventName}
                value={eventName}
                placeholder="Enter event name"
                placeholderTextColor="#9CA3AF"
                autoFocus
              />
              <View className="flex-row gap-2">
                <Button
                  onPress={() => setModalVisible(false)}
                  className="border bg-white px-8"
                  textClassName="text-black text-md">
                  Cancel
                </Button>
                <Button onPress={handleAddEvent} className="px-8" textClassName="text-md">
                  Create
                </Button>
              </View>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
