export interface Event {
  id: number;
  title: string;
  image: string;
  description: string;
  eventDate: string;
  createdAt: string;
  status: 'upcoming' | 'past' | 'notice';
}