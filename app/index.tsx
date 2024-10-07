import { Stack } from 'expo-router';

import AddEvent from '~/components/AddEvent';
import { Container } from '~/components/Container';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <Container>
        <AddEvent />
      </Container>
    </>
  );
}
