import { Stack, useRouter } from "expo-router";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { COLORS, SIZES, icons, images } from "../constants";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isWaiting, setIsWaiting] = useState(true);

  // Prevent multi-request in the same time, which causes FREE JSearchAPI to throw 429 error code :))
  setTimeout(() => {
    setIsWaiting(false);
  }, 1000);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          <Popularjobs />
          {isWaiting ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <Nearbyjobs />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
