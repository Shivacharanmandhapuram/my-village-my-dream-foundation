export interface Program {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface GalleryEvent {
  id: number;
  title: string;
  images: { url: string; caption: string }[];
}

export interface EventItem {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}