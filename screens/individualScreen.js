import React from 'react';
import TitleCard from '../components/TitleHeader';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';


const IndividualScreen = props => {
    const post = props.navigation.getParam('post');
    return (
        <View>
            <ScrollView style={{ padding: 5 }}>
                <TitleCard postTitle = {post.title} postBody = {post.text} />
                {post.children.map(comment => (
                    <View style={styles.comment}>
                        <Text>
                            {comment.text}
                        </Text>
                    </View>
                ))}
            </ScrollView>
    </View>
    )
};

const styles = StyleSheet.create({
    comment: {
        margin: 5,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        width: Dimensions.get('window').width - 5,
        backgroundColor: '#f6f6ef',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
});

export default IndividualScreen;