import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add Interceptor for Auth
api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

export const getSections = async (pageName: string = 'Home') => {
    try {
        const response = await api.get(`/sections/${pageName}/resolve`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch sections for ${pageName}:`, error);
        return [];
    }
};

export const getPosts = async (params?: any) => {
    try {
        const response = await api.get('/posts', { params });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return [];
    }
};

export const getPost = async (slug: string) => {
    try {
        const response = await api.get(`/posts/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch post ${slug}:`, error);
        return null;
    }
};
