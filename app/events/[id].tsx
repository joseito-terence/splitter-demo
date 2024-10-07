import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { Container } from '~/components/Container';
import eventService from '~/services/event.service';

export default function Event() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventService.getOne(id),
    enabled: !!id,
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: event ? event.name : 'Event Details',
        }}
      />
      <Container>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>Error loading event details. Please try again.</Text>
        ) : event ? (
          <View>
            <Text className="mb-4 text-2xl font-bold">{event.name}</Text>
            {/* Add more event details here */}
          </View>
        ) : (
          <Text>Event not found.</Text>
        )}
      </Container>
    </>
  );
}
