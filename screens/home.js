import React from 'react';
import axios from 'axios';
import { Constants } from 'expo';
import PostCard from '../components/PostCard';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import '../storage';

export default class HomeScreen extends React.Component {

    state = {
        posts: [],
        lastRefreshed: null
    }

    render() {
        this.loadPosts();
        return (
            this.state.posts.length ?
                <View>
                    <ScrollView style={{ padding: 5 }}>
                        {this.state.posts.map(post => (
                            <PostCard
                                key={post.title}
                                post={post}
                                {...this.props}
                            />
                        ))}
                    </ScrollView>
                </View>
                :
                <View style={styles.container}>
                    <Text>Nothing to show.</Text>
                    <Button
                        onPress={this.fetchPosts}
                        title="Download Posts"
                        color="#841584"
                    />
                </View>
        );
    }

    loadPosts = () => {
        console.log("loading");
        storage.load({ key: 'postData' })
            .then(data => this.setState({
                posts: data.posts,
                lastRefreshed: data.dateRefreshed,
            }))
            .catch(() => console.log("err"));
        
    }

    fetchPosts = async () => {
        console.log("fetching");
        const response = await axios.get("https://hn.algolia.com/api/v1/search_by_date?tags=ask_hn")
        const posts = response.data.hits;

        const postsWithComments = await Promise.all(
            posts.map(async post => {
                const p = await (await axios.get(`https://hn.algolia.com/api/v1/items/${post.objectID}`))
                return p.data;
            })
        )

        storage.save({
            key: 'postData',
            data: {
                posts: postsWithComments,
                dateRefreshed: new Date(),
            }
        }).then(() => console.log("saved successfully"))
        .catch(() => console.log("didn't save"));
        
        this.setState({
            posts: postsWithComments
        })
    }
}

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