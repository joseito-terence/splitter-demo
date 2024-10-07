import { Stack } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Button onPress={() => console.log('hey')} title="Hey" />
      </Container>
    </>
  );
}
