import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "홈" }} />
      <Tabs.Screen name="timetable" options={{ title: "시간표" }} />
      <Tabs.Screen name="recommendation" options={{ title: "추천" }} />
      <Tabs.Screen name="chat" options={{ title: "채팅" }} />
      <Tabs.Screen name="mypage" options={{ title: "마이페이지" }} />
    </Tabs>
  );
}
