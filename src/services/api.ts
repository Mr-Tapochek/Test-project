import axios from 'axios';
import {Painting, Author, Location, PaintingsParams, PaintingsResponse, PaintingsWithDetails} from '@/types/index';
const API_BASE_URL = 'https://test-front.framework.team';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getPaintings = async (params: PaintingsParams) => {
  const response = await api.get<Painting[]>('/paintings', { params });
  return {
    data: response.data,
    totalCount: parseInt(response.headers['x-total-count'] || '0', 10),
  };
};

export const getAuthors = async (): Promise<Author[]> => {
  const response = await api.get<Author[]>('/authors');
  return response.data;
};

export const getLocations = async (): Promise<Location[]> => {
  const response = await api.get<Location[]>('/locations');
  return response.data;
};

export const getPaintingsWithDetails = async (
  params: PaintingsParams
): Promise<PaintingsResponse> => {

  const { data: paintings, totalCount } = await getPaintings(params);
  
  
  const [authors, locations] = await Promise.all([
    getAuthors(),
    getLocations()
  ]);

  const authorsMap: Record<number, string> = {};
  authors.forEach(author => {
    authorsMap[author.id] = author.name;
  });

  const locationsMap: Record<string, string> = {};
  locations.forEach(location => {
    locationsMap[location.id] = location.location;
  });

  const paintingsWithDetails: PaintingsWithDetails[] = paintings.map(painting => ({
    ...painting,
    imageUrl: `${API_BASE_URL}${painting.imageUrl}`,
    authorName: authorsMap[painting.authorId] || 'Неизвестный автор',
    locationName: locationsMap[painting.locationId] || 'Неизвестное место'
  }));

  return {
    paintings: paintingsWithDetails,
    totalCount,
  };
};