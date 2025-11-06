import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth, db } from '../firebase/config';

export default function RegisterSiswa({ navigation }: any) {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [nisn, setNISN] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Gagal', 'Password dan konfirmasi password tidak sama');
      return;
    }

    try {
      // Cek NISN unik
      const nisnQuery = query(collection(db, 'siswa'), where('nisn', '==', nisn));
      const nisnSnap = await getDocs(nisnQuery);
      if (!nisnSnap.empty) {
        Alert.alert('Gagal', 'NISN sudah terdaftar');
        return;
      }

      // Cek Username unik
      const usernameQuery = query(collection(db, 'siswa'), where('username', '==', username));
      const usernameSnap = await getDocs(usernameQuery);
      if (!usernameSnap.empty) {
        Alert.alert('Gagal', 'Username sudah digunakan');
        return;
      }

      // Buat akun baru
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'siswa', uid), {
        namaLengkap,
        email,
        nisn,
        username,
        role: 'siswa'
      });

      Alert.alert('Berhasil', 'Akun Berhasil Didaftarkan');
      navigation.replace('LoginSiswa');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Gagal', 'Akun Gagal Didaftarkan, cek kembali form anda');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nama Lengkap</Text>
      <TextInput style={styles.input} value={namaLengkap} onChangeText={setNamaLengkap} />

      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text>NISN</Text>
      <TextInput style={styles.input} value={nisn} onChangeText={setNISN} />

      <Text>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />

      <Text>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

      <Text>Confirm Password</Text>
      <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      <View style={{ height: 10 }} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10
  }
});
