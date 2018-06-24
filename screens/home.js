import React from 'react';
import axios from 'axios';
import { Constants } from 'expo';
import PostCard from '../components/PostCard';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    AsyncStorage
} from 'react-native';

export default class HomeScreen extends React.Component {

    state = {
        posts: [],
        lastRefreshed: null,
        loading: true
    }

    render() {
        this.loadPosts();

        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <Text>Checking for data.</Text>
                </View>
            )
        
        }
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
                        color="#f4511e"
                    />
                </View>
        );
    }

    loadPosts = async () => {
        try {
            const data = await AsyncStorage.getItem('@HNOffline:postData');
            const parsed = JSON.parse(data);
            this.setState({
                posts: parsed.posts,
                lastRefreshed: parsed.dateRefreshed,
                loading: false,
            })
        } catch (error) {
            console.log("didnt have data");
            this.setState({
                loading: false
            })
        }    
    }

    fetchPosts = async () => {
        this.setState({
            loading: true,
        })
        const response = await axios.get("https://hn.algolia.com/api/v1/search_by_date?tags=ask_hn")
        const posts = response.data.hits;

        const postsWithComments = await Promise.all(
            posts.map(async post => {
                const p = await (await axios.get(`https://hn.algolia.com/api/v1/items/${post.objectID}`))
                return p.data;
            })
        )

        const store = await AsyncStorage.setItem('@HNOffline:postData', JSON.stringify({
                posts: postsWithComments,
                dateRefreshed: new Date(),
            }));
            
        this.setState({
            posts: postsWithComments,
            loading: false
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