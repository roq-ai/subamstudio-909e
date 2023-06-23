import axios from 'axios';
import queryString from 'query-string';
import { StudioInterface, StudioGetQueryInterface } from 'interfaces/studio';
import { GetQueryInterface } from '../../interfaces';

export const getStudios = async (query?: StudioGetQueryInterface) => {
  const response = await axios.get(`/api/studios${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStudio = async (studio: StudioInterface) => {
  const response = await axios.post('/api/studios', studio);
  return response.data;
};

export const updateStudioById = async (id: string, studio: StudioInterface) => {
  const response = await axios.put(`/api/studios/${id}`, studio);
  return response.data;
};

export const getStudioById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/studios/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStudioById = async (id: string) => {
  const response = await axios.delete(`/api/studios/${id}`);
  return response.data;
};
