import React from 'react';
import TitleCard from '../components/TitleHeader';
import { getPostHeight } from '../utils'; 
import { View, Text, ScrollView, StyleSheet, Dimensions, WebView } from 'react-native';


const IndividualScreen = props => {
    const post = props.navigation.getParam('post');
    return (
        <View>
            <ScrollView style={{ padding: 5, paddingBottom: 50 }}>
                <TitleCard postTitle = {post.title} postBody = {post.text} />
                {post.children.map(comment => (
                    <WebView
                        key = {comment.id}
                        source = {{ html: comment.text }}
                        style = {getCommentStyle(comment.text)}
                    />
                ))}
            </ScrollView>
    </View>
    )
};

const getCommentStyle = comment => {
    return {
            margin: 5,
            paddingLeft: 25,
            paddingRight: 25,
            paddingTop: 5,
            paddingBottom: 3,
            width: Dimensions.get('window').width - 5,
            height: getPostHeight(comment),
            backgroundColor: '#f6f6ef',
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
    }
}

const styles = StyleSheet.create({
    comment: {
        margin: 5,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        width: Dimensions.get('window').width - 5,
        height: Dimensions.get('window').height / 5,
        backgroundColor: '#f6f6ef',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        
    },
});

export default IndividualScreen;