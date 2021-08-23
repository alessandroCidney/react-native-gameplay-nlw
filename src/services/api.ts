import axios from 'axios';

const api = axios.create({
	baseURL: 'https://discord.com/api'
});

export { api };

// https://auth.expo.io/@anonymous/gameplay-b42f9145-060d-4024-aec9-88c3773d1e8c