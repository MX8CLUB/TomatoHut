/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Root from "./src/Root";

// /**
//  * 更改Text默认属性
//  */
// import React from 'react';
// import {StyleSheet, Text} from 'react-native';
// const styles = StyleSheet.create({
//     Text: {
//         fontSize: 14,
//         lineHeight: 20,
//     }
// });
//
// console.log(Text);
// const oldRender = Text.render;
// Text.render = function (...args) {
//     const origin = oldRender.call(this, ...args);
//     return React.cloneElement(origin, {
//         style: [origin.props.style, styles.Text]
//     });
// };

AppRegistry.registerComponent(appName, () => Root);
