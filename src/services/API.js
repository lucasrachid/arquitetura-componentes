import axios from 'axios';

const apiKey = '694b079e4a61424269d8cce0ca544868';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const buscarPrevisaoDoTempo = async (cidade) => {
    try {
        const response = await axios.get(`${baseUrl}?q=${cidade}&appid=${apiKey}&units=metric`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar a previsão do tempo', error);
        throw error;
    }
};

export { buscarPrevisaoDoTempo };
