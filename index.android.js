import React from "react-native";
import DrawerManager from "./views/drawer-manager";
import NavigationBarRouteMapper from "./views/navigation-bar-route-mapper";
import routes from "./views/routes";

const {
    AppRegistry,
    StyleSheet,
    Navigator,
    BackAndroid
} = React;

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "#673ab7"
    },
    scene: {
        flex: 1,
        marginTop: 56,
        backgroundColor: "#eee"
    }
});

let _navigator;

BackAndroid.addEventListener("hardwareBackPress", () => {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();

        return true;
    }

    return false;
});

class HeyNeighbor extends React.Component {
    render() {
        return (
            <DrawerManager.DrawerWrapper>
                <Navigator
                    initialRoute={routes.home()}
                    renderScene={(route, navigator) => {
                        _navigator = navigator;

                        return (
                            <route.component
                                {...route.passProps}
                                navigator={navigator}
                                style={styles.scene}
                            />
                        );
                    }}
                    navigationBar={
                        <Navigator.NavigationBar
                            routeMapper={NavigationBarRouteMapper}
                            style={styles.navbar}
                        />
                    }
                />
            </DrawerManager.DrawerWrapper>
        );
    }
}

AppRegistry.registerComponent("HeyNeighbor", () => HeyNeighbor);
