import * as React from 'react';
import Main from '../components/main';
import Register from '../components/register';
const StackNavigator = StackNavigator({
	Login: { screen: Main },
	Register: { screen: Register },
  },{ swipeEnabled: false })
  export default StackNavigator;