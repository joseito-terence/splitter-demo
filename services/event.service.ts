import axios from './axios';

interface Event {
  id?: number;
  name: string;
}

const eventService = {
  get: async () => {
    const response = await axios.get<Event[]>('/events');
    return response.data;
  },

  create: async (event: Omit<Event, 'id'>) => {
    const response = await axios.post<Event>('/events', event);
    return response.data;
  },

  update: async (id: number, event: Partial<Event>) => {
    const response = await axios.put<Event>(`/events/${id}`, event);
    return response.data;
  },

  delete: async (id: number) => {
    await axios.delete(`/events/${id}`);
  },
};

export default eventService;
