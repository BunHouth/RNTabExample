import React, {useState, useMemo, useCallback} from "react";
import {Dimensions, StyleSheet, SafeAreaView, Text, View} from "react-native";
import {TabView, SceneMap, TabBar} from "react-native-tab-view";
import _ from "lodash";
const AuditRecord = ({title}) => (
  <View style={styles.tabContainer}>
    <Text>{title}</Text>
  </View>
);

const MyProfile = ({title}) => (
  <View style={styles.tabContainer}>
    <Text>{title}</Text>
    <Text>你好，世界。</Text>
  </View>
);

export const Home = () => {
  const [index, setIndex] = useState(0);
  const routes = [
    {key: "auditRecord", title: "审核记录 "},
    {key: "performance", title: "我的业绩 "},
    {key: "calendar", title: "业务日历 "},
    {key: "information", title: "我的信息"}
  ];

  const renderScene = ({route}) => {
    switch (route.key) {
      case "information":
        return <MyProfile title={route.title} />;
      default:
        return <AuditRecord title={route.title} />;
    }
  };

  const renderIndicator = useCallback(
    ({getTabWidth}) => {
      const tabWidth = _.sum([...Array(index).keys()].map(i => getTabWidth(i)));
      return (
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            flex: 1,
            width: getTabWidth(index),
            marginLeft: tabWidth
          }}
        >
          <View
            style={{
              backgroundColor: "red",
              height: 2,
              width: 20
            }}
          />
        </View>
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
