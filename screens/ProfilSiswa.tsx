import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function ProfilSiswa({ navigation }: any) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const docRef = doc(db, 'siswa', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (err) {
        console.error(err);
        Alert.alert("Gagal memuat data profil");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Izin diperlukan', 'Berikan akses galeri untuk mengubah foto profil');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      updatePhoto(imageUri);
    }
  };

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Izin diperlukan', 'Berikan akses kamera untuk mengambil foto');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      updatePhoto(imageUri);
    }
  };

  const updatePhoto = async (uri: string) => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      await updateDoc(doc(db, 'siswa', uid), {
        fotoProfile: uri,
      });

      setUserData({ ...userData, fotoProfile: uri });
      Alert.alert('Berhasil', 'Foto profil diperbarui');
    } catch (err) {
      console.error(err);
      Alert.alert('Gagal', 'Tidak bisa memperbarui foto');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('LoginSiswa');
    } catch (err) {
      Alert.alert('Gagal Logout', err.message);
    }
  };

  if (loading) {
    return <Text>Memuat profil...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: userData?.fotoProfile || 'https://via.placeholder.com/150' }}
        style={styles.profileImage}
      />
      <View style={styles.buttonRow}>
        <Button title="Pilih dari Galeri" onPress={handlePickImage} />
        <Button title="Ambil Foto" onPress={handleTakePhoto} />
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Nama Lengkap:</Text>
        <Text style={styles.value}>{userData?.namaLengkap}</Text>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{userData?.username}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData?.email}</Text>
      </View>

      <Button title="Logout" color="red" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, alignItems: 'center' },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 10 },
  info: { marginTop: 20, width: '100%' },
  label: { fontWeight: 'bold', marginTop: 10 },
  value: { fontSize: 16 },
});
