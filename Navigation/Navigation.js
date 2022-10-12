import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import News from '../Components/News'
import Profile from '../Components/Profile'
import ProfileEdit from '../Components/ProfileEdit'
import WatchList from '../Components/WatchList'
import PeopleDetails from '../Components/PeopleDetails'
import About from '../Components/About'

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Search"
    }
  },
  FilmDetail: {
    screen: FilmDetail
  },
  PeopleDetails: {
    screen: PeopleDetails
  }
})

const NewsStackNavigator = createStackNavigator({
  News: {
    screen: News,
    navigationOptions: {
      title: "News"
    }
  },
  FilmDetail: {
    screen: FilmDetail
  },
  PeopleDetails: {
    screen: PeopleDetails
  }
})

const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: "Favorites"
    }
  },
  FilmDetail: {
    screen: FilmDetail
  },
  PeopleDetails: {
    screen: PeopleDetails
  }
})

const ProfileStackNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "Profile"
    }
  },
  ProfileEdit: {
    screen: ProfileEdit
  },
  About: {
    screen: About,
    navigationOptions: {
      title: "About"
    }
  }
})

const WatchListStackNavigator = createStackNavigator({
  WatchList: {
    screen: WatchList,
    navigationOptions: {
      title: "WatchList"
    }
  },
  FilmDetail: {
    screen: FilmDetail
  },
  PeopleDetails: {
    screen: PeopleDetails
  }
})

const MoviesTabNavigator = createBottomTabNavigator({
  News: {
    screen: NewsStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image source={require('../Images/ic_fiber_new.png')} style={styles.icon}/>
      }
    }
  },
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image source={require('../Images/ic_search.png')} style={styles.icon}/>
      }
    }
  },
  Favorites: {
    screen: FavoritesStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image source={require('../Images/ic_favorite.png')} style={styles.icon}/>
      }
    }
  },
  WatchList: {
    screen: WatchListStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image source={require('../Images/baseline_list_white_48dp.png')} style={styles.icon}/>
      }
    }
  },
  Profile: {
    screen: ProfileStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image source={require('../Images/ic_tag_faces.png')} style={styles.icon}/>
      }
    }
  }
}, {
    tabBarOptions: {
      showLabel: true,
      showIcon: true,
      activeBackgroundColor: 'black',
      inactiveBackgroundColor: 'black',
      activeTintColor: '#2F72E5'
    }
})

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    tintColor: '#2F72E5'
  }
})

export default createAppContainer(MoviesTabNavigator)
