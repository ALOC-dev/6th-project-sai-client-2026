import { StyleSheet, Text, View } from "react-native";

export default function RecommendationScreen() {
  return (
    <View style={styles.container}>
      <Text>활동 및 장소 추천 화면</Text>
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
