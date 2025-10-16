// App.tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface FoodTruck {
  id: number;
  name: string;
  location: string;
  menu: string[];
}

export default function App() {
  const [data, setData] = useState<FoodTruck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // kalau emulator Android Studio
    // gunakan 10.0.2.2
    // kalau HP fisik gunakan http://<IP_LAPTOP>:3000
    const base = 'http://172.18.79.138:3000/api/foodtrucks';
    axios.get(base)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🚚 FoodTruck (Mobile)</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>📍 {item.location}</Text>
            <Text>🍽️ {item.menu.join(', ')}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: '#f3f3f3', padding: 12, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: '600' },
});
