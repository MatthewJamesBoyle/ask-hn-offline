import React from 'react';
import axios from 'axios';
import { Constants } from 'expo';
import PostCard from './Components/PostCard';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

export default class App extends React.Component {

  state = {
    posts: [],
  }
  
  render() {
    return (
        this.state.posts.length ?
        <View>
          <StatusBar/>
          <ScrollView style={{ padding: 5 }}>
            {this.state.posts.map(post => (
              <PostCard
                key={post.title}
                post={post}
              />
            ))}
          </ScrollView>
        </View>
           :
        <View style={styles.container}>
          <StatusBar/>
          <Text>Nothing to show.</Text>
          <Button
            onPress={this.fetchPosts}
            title="Download Posts"
            color="#841584"
          />
        </View>    
  );
}

  fetchPosts = async () => {
    const response = await axios.get("https://hn.algolia.com/api/v1/search_by_date?tags=ask_hn")
    const posts = response.data.hits;

    const postsWithComments = await Promise.all(
      posts.map(async post => {
        const p = await (await axios.get(`https://hn.algolia.com/api/v1/items/${post.objectID}`))
        return p.data;
      })
    )

    this.setState({ posts: postsWithComments })
  }
  
}

const StatusBar = () => (
  <View>
    <View style={styles.statusBar}/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: "#FF742B",
    height: Constants.statusBarHeight,
  }
});
