import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, View, Text, RefreshControl } from 'react-native';

import AddEvent from '~/components/AddEvent';
import { Container } from '~/components/Container';
import { EventCard } from '~/components/EventCard';
import eventService from '~/services/event.service';

export default function Home() {
  const {
    data: events,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['events'],
    queryFn: eventService.get,
  });

  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <Container>
        <ScrollView
          className="mt-4 px-4"
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}>
          {isLoading ? (
            <Text>Loading events...</Text>
          ) : error ? (
            <Text>Error loading events. Please try again.</Text>
          ) : events && events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} id={event.id!} name={event.name} />)
          ) : (
            <Text>No events found. Create one to get started!</Text>
          )}
        </ScrollView>
        <View className="px-4">
          <AddEvent />
        </View>
      </Container>
    </>
  );
}
