import React from 'react';
import timeago from 'epoch-timeago';
import { StyleSheet, Text, View, Button, Dimensions, TouchableHighlight, Alert } from 'react-native';


export default class PostCard extends React.Component {
    render() {
        return (
            <TouchableHighlight
                onPress={this.cardPressed}
                style={styles.card}
            >
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{this.props.post.title}</Text>
                    <Text style={{ fontSize: 12 }}>
                        {this.props.post.points} points |  
                         {this.props.post.author} | 
                         {timeago(this.props.post.created_at_i * 1000)} | 
                         {this.props.post.children.length} comments
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    cardPressed = () => {
        Alert.alert(this.props.post.title);
    }
}

const styles = StyleSheet.create({
    card: {
        margin: 5,
        paddingLeft: 25,
        paddingTop: 5,
        width: Dimensions.get('window').width - 5,
        height: 90,
        backgroundColor: '#f6f6ef',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
});

const timeSince = timeStamp => {
    var now = new Date(),
        secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if (secondsPast < 60) {
        return parseInt(secondsPast) + 's';
    }
    if (secondsPast < 3600) {
        return parseInt(secondsPast / 60) + 'm';
    }
    if (secondsPast <= 86400) {
        return parseInt(secondsPast / 3600) + 'h';
    }
    if (secondsPast > 86400) {
        day = timeStamp.getDate();
        month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
        year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
        return day + " " + month + year;
    }
}