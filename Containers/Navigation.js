import { StackNavigator ,DrawerNavigator } from 'react-navigation';

import Home from './Home';
import SideMenu from '../Components/SideMenu';
import Track from './Track';
import Playlist from './Playlist';
import TopMusic from './TopMusic';
import Login from './Login';
import Signup from './Signup';


const Drawer = DrawerNavigator ({
  Home:{screen: Home},
  Track:{screen:Track},
  Playlist:{screen:Playlist},
  TopMusic:{screen:TopMusic}

},
{
  contentComponent: SideMenu,
  drawerWidth: 300
}
);
// Manifest of possible screens
const Navigator = StackNavigator({
  Home:{screen:Drawer},
  Track:{screen:Drawer},
  Playlist:{screen:Drawer},
  TopMusic:{screen:Drawer},
  Login:{screen:Login},
  Signup:{screen:Signup}

 
}, {
    
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home',
  
})


export default Navigator
