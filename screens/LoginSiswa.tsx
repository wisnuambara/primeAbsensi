// screens/LoginSiswa.tsx
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebase/config';

WebBrowser.maybeCompleteAuthSession();

export default function LoginSiswa({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig?.extra?.ClientId || '',
  });

  // ====== LOGIN DENGAN EMAIL FIREBASE BERDASARKAN USERNAME ======
  const handleLogin = async () => {
    try {
      // Cari user berdasarkan username
      const q = query(collection(db, 'siswa'), where('username', '==', username));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        Alert.alert('Login Gagal', 'Username tidak ditemukan');
        return;
      }

      const userData = snapshot.docs[0].data();
      const email = userData.email;

      // Login dengan email & password
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Berhasil', `Selamat datang, ${userData.namaLengkap}`);
      navigation.replace('TabSiswa');

    } catch (error: any) {
      Alert.alert('Login Gagal', 'Kredensial tidak valid');
    }
  };

  // ====== LOGIN DENGAN GOOGLE ======
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const uid = userCredential.user.uid;
          const userRef = doc(db, 'siswa', uid);
          const snapshot = await getDocs(query(collection(db, 'siswa'), where('email', '==', userCredential.user.email)));

          // Jika belum ada di koleksi siswa, tambahkan
          if (snapshot.empty) {
            await setDoc(userRef, {
              namaLengkap: userCredential.user.displayName,
              email: userCredential.user.email,
              fotoProfile: userCredential.user.photoURL,
              role: 'siswa',
              username: userCredential.user.email?.split('@')[0] || 'googleuser'
            });
          }

          Alert.alert('Login Berhasil', `Selamat datang, ${userCredential.user.displayName}`);
          navigation.replace('TabSiswa');
        })
        .catch((err) => {
          Alert.alert('Login Gagal', err.message);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Masukkan username"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Masukkan password"
        secureTextEntry
        style={styles.input}
      />

      <Button title="Login" onPress={handleLogin} />

      <View style={{ marginVertical: 10 }} />

      <Button
        title="Login dengan Google"
        onPress={() => promptAsync()}
        disabled={!request}
        color="#4285F4"
      />
      <TouchableOpacity onPress={() => navigation.navigate('RegisterSiswa')}>
        <Text style={styles.link}>Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderRadius: 6
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#3369bd',
    fontWeight: 'bold'
  }
});
