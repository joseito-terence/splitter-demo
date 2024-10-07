import axios from './axios';

interface Event {
  id?: string;
  name: string;
}

const eventService = {
  get: async () => {
    const response = await axios.get<Event[]>('/events');
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await axios.get<Event>(`/events/${id}`);
    return response.data;
  },

  create: async (event: Omit<Event, 'id'>) => {
    const response = await axios.post<Event>('/events', event);
    return response.data;
  },

  update: async (id: string, event: Partial<Event>) => {
    const response = await axios.put<Event>(`/events/${id}`, event);
    return response.data;
  },

  delete: async (id: string) => {
    await axios.delete(`/events/${id}`);
  },
};

export default eventService;
