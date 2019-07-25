import React, {useEffect, useState, useCallback} from "react";
import {Dimensions, StyleSheet, SafeAreaView, Text, View} from "react-native";
import {TabView, SceneMap, TabBar} from "react-native-tab-view";
import Animated from "react-native-reanimated";
import _ from "lodash";

const AuditRecord = ({title}) => (
  <View style={styles.tabContainer}>
    <Text>{title}</Text>
  </View>
);

const MyProfile = ({title}) => (
  <View style={styles.tabContainer}>
    <Text>{title}</Text>
    <Text>ពត៌មានរបស់ខ្ញុំ</Text>
  </View>
);

export const Home = () => {
  const [index, setIndex] = useState(0);
  const routes = [
    {key: "feed", title: "មតិព័ត៌មាន"},
    {key: "search", title: "ស្វែងរក "},
    {key: "account", title: "គណនី "}
  ];

  const renderScene = ({route}) => {
    switch (route.key) {
      case "account":
        return <MyProfile title={route.title} />;
      default:
        return <AuditRecord title={route.title} />;
    }
  };

  const renderIndicator = useCallback(
    ({position, getTabWidth, navigationState}) => {
      const inputRange = [0, 1];
      const translateX = Animated.interpolate(position, {
        inputRange: inputRange,
        outputRange: inputRange.map(x => {
          const i = Math.round(x);
          return i * getTabWidth(i) * 1;
        })
      });

      return (
        <Animated.View
          style={[
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end"
            },
            {
              width: getTabWidth(index),
              transform: [{translateX}]
            }
          ]}
        >
          <View style={styles.indicator} />
        </Animated.View>
      );
    },
    [index]
  );

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{
          index,
          routes
        }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get("window").width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            scrollEnabled
            tabStyle={styles.tabBar}
            indicatorStyle={styles.indicator}
            style={styles.tabBarContainer}
            labelStyle={styles.labelStyle}
            renderIndicator={renderIndicator}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tabBar: {},
  tabBarContainer: {backgroundColor: "#33313f"},
  labelStyle: {
    color: "#fff"
  },
  indicator: {
    width: 20,
    height: 2,
    backgroundColor: "#eee"
  }
});
