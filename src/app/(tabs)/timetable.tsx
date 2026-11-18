import { StyleSheet, Text, View } from "react-native";

export default function TimetableScreen() {
  return (
    <View style={styles.container}>
      <Text>시간표 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
