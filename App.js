import * as React from "react";
import {SafeAreaView, View, StyleSheet, Dimensions} from "react-native";
import {TabView, SceneMap} from "react-native-tab-view";

const FirstRoute = () => (
  <View style={[styles.scene, {backgroundColor: "#ff4081"}]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: "#673ab7"}]} />
);

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [{key: "first", title: "First"}, {key: "second", title: "Second"}]
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute
          })}
          onIndexChange={index => this.setState({index})}
          initialLayout={{width: Dimensions.get("window").width}}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scene: {
    flex: 1
  }
});
