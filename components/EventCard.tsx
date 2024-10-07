import { Link } from 'expo-router';
import React from 'react';
import { Text, Pressable } from 'react-native';

interface EventCardProps {
  id: string;
  name: string;
}

export function EventCard({ id, name }: EventCardProps) {
  return (
    <Link href={`/events/${id}`} asChild>
      <Pressable className="mb-4 rounded-lg bg-white p-4 shadow-md">
        <Text className="text-lg font-semibold">{name}</Text>
      </Pressable>
    </Link>
  );
}
