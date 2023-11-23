import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ActivityIndicator } from 'react-native';
import { buscarPrevisaoDoTempo } from '../services/API';

const PrevisaoTempo = () => {
    const [cidade, setCidade] = useState('');
    const [previsao, setPrevisao] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const buscarPrevisao = async () => {
        setCarregando(true);
        try {
            const previsaoData = await buscarPrevisaoDoTempo(cidade); // Use o serviço de API
            setPrevisao(previsaoData);
        } catch (error) {
            console.error('Erro ao buscar a previsão do tempo', error);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Previsão do Tempo</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="Digite o nome da cidade"
                value={cidade}
                onChangeText={(text) => setCidade(text)}
            />
            <Button title="Buscar Previsão" onPress={buscarPrevisao} />
            {carregando && <ActivityIndicator size="large" color="#0000ff" />}
            {previsao && (
                <View>
                    <Text>Cidade: {previsao.name}</Text>
                    <Text>Temperatura: {previsao.main.temp}°C</Text>
                    <Image
                        source={{
                            uri: `https://openweathermap.org/img/w/${previsao.weather[0].icon}.png`,
                        }}
                        style={{ width: 50, height: 50 }}
                    />
                </View>
            )}
        </View>
    );
};

export default PrevisaoTempo;
