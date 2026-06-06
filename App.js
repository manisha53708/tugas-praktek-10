import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  ActivityIndicator, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';

export default function App() {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // 1. Mekanisme Debounce yang sudah diperbaiki (Bebas Error 500ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchInput);
    }, 500); // Angka murni di dalam parameter setTimeout

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  // 2. Simulasi/Fungsi Fetch Data Cuaca Lengkap berdasarkan Kota
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setWeatherData(null);
      setErrorMsg(null);
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        // Simulasi hit API selama 1.5 detik agar indikator loading terlihat jelas
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Contoh dummy response data cuaca lengkap (Silakan ganti URL API asli di sini jika ada)
        const dummyDatabase = {
          medan: { name: 'Medan', temp: 29, status: 'Berawan', emoji: '☁️', humidity: '80%', wind: '12 km/h' },
          jakarta: { name: 'Jakarta', temp: 32, status: 'Cerah Berawan', emoji: '⛅', humidity: '70%', wind: '15 km/h' },
          bali: { name: 'Bali', temp: 30, status: 'Cerah', emoji: '☀️', humidity: '65%', wind: '18 km/h' },
        };

        const cityKey = debouncedQuery.toLowerCase().trim();
        
        if (dummyDatabase[cityKey]) {
          setWeatherData(dummyDatabase[cityKey]);
        } else {
          // Jika kota tidak ada di dummy, buat data dinamis sederhana agar tetap muncul
          setWeatherData({
            name: debouncedQuery,
            temp: Math.floor(Math.random() * (34 - 22 + 1)) + 22, // Temp acak 22-34
            status: 'Hujan Ringan',
            emoji: '🌧️',
            humidity: '85%',
            wind: '10 km/h'
          });
        }
      } catch (err) {
        setErrorMsg('Gagal mengambil data cuaca.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [debouncedQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Input Pencarian */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Cari kota (Contoh: Medan, Jakarta)..."
            placeholderTextColor="#888"
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
          />
        </View>

        {/* Kondisi 1: Loading sedang berjalan */}
        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#00ffff" />
            <Text style={styles.loadingText}>Memuat data cuaca untuk "{searchInput}"...</Text>
          </View>
        )}

        {/* Kondisi 2: Terjadi Error */}
        {!loading && errorMsg && (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        )}

        {/* Kondisi 3: Data Cuaca Berhasil Ditampilkan */}
        {!loading && !errorMsg && weatherData && (
          <View style={styles.mainWeatherSection}>
            <Text style={styles.cityName}>{weatherData.name}</Text>
            <Text style={styles.weatherEmoji}>{weatherData.emoji}</Text>
            <Text style={styles.temperatureText}>{weatherData.temp}°C</Text>
            <Text style={styles.weatherDescription}>{weatherData.status}</Text>

            {/* Detail Informasi Cuaca Tambahan */}
            <View style={styles.detailCard}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Kelembapan</Text>
                <Text style={styles.detailValue}>{weatherData.humidity}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Kecepatan Angin</Text>
                <Text style={styles.detailValue}>{weatherData.wind}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Kondisi 4: State Awal (Kosong) */}
        {!loading && !weatherData && !errorMsg && (
          <View style={styles.centerContainer}>
            <Text style={styles.infoText}>Silakan ketik nama kota untuk melihat cuaca.</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Menggunakan tema gelap (dark-themed aesthetic)
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  searchSection: {
    marginTop: 40,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  loadingText: {
    color: '#aaa',
    marginTop: 15,
    fontSize: 14,
  },
  errorText: {
    color: '#ff5252',
    fontSize: 16,
  },
  infoText: {
    color: '#666',
    fontSize: 15,
    textAlign: 'center',
  },
  mainWeatherSection: {
    alignItems: 'center',
    marginVertical: 25,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  weatherEmoji: {
    fontSize: 85,
    marginVertical: 10,
  },
  temperatureText: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#fff',
  },
  weatherDescription: {
    fontSize: 20,
    color: '#aaa',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  detailCard: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 20,
    marginTop: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    color: '#777',
    fontSize: 13,
    marginBottom: 5,
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#333',
  },
});