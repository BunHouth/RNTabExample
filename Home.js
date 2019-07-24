import React, {useEffect, useState, useCallback, useRef} from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Easing
} from "react-native";
import {TabView, SceneMap, TabBar} from "react-native-tab-view";
import _ from "lodash";

const AuditRecord = ({title}) => (
  <View style={styles.tabContainer}>
    <Text>{title}</Text>
  </View>
);

const TabIndicator = ({width, tabWidth, index}) => {
  const marginLeftRef = useRef(new Animated.Value(index ? tabWidth : 0))
    .current;
  useEffect(() => {
    Animated.timing(marginLeftRef, {
      toValue: tabWidth,
      duration: 400
    }).start();
  }, [tabWidth]);

  return (
    <Animated.View
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
        width: width,
        marginLeft: marginLeftRef
      }}
    >
      <View
        style={{
          backgroundColor: "red",
          height: 2,
          width: 20
        }}
      />
    </Animated.View>
  );
};

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
    ({getTabWidth}) => {
      const tabWidth = _.sum([...Array(index).keys()].map(i => getTabWidth(i)));

      return (
        <TabIndicator
          width={getTabWidth(index)}
          tabWidth={tabWidth}
          index={index}
        />
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
  indicator: {
    backgroundColor: "#ccc"
  },
  tabBarContainer: {backgroundColor: "#fff"},
  labelStyle: {
    color: "#032"
  }
});
