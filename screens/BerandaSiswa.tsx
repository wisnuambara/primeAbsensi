// components/BerandaSiswa.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Alert, Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export default function BerandaSiswa() {
  const scrollRef = useRef<ScrollView>(null);
  const navigation = useNavigation();
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

  return (
    <ScrollView ref={scrollRef} contentContainerStyle={{ padding: 20 }}>
      {/* Section Hero */}
      <View style={{ marginBottom: 40, flex: 1 ,justifyContent: 'center'}}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Selamat Datang </Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{userData?.namaLengkap} </Text>
      </View>
    </ScrollView>
  );
}
