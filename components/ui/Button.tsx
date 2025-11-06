import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3369bd',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
