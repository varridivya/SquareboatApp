/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';


const SearchBar = (props) => {
    return (
        <View style={styles.container}>
            <Icon style={{ marginLeft: '3%' }}
                name={'magnifying-glass'} color={'black'} size={25} />
            <TextInput placeholder='searching'
                style={styles.searchInput} />
            {/* <TextInput style={styles.searchBar} onChangeText={props.onChangeText} value={props.value}
                placeholder={props.placeholder ?
                    props.placeholder : 'Start Searching...'} />
            {props.editing ? <TouchableOpacity onPress={props.onClear} style={{ marginRight: '7%' }}><Text
                style={{ color: '#0078b0' }}>Clear</Text></TouchableOpacity> : null} */}
        </View>
    );
};


SearchBar.propType = {
    onChangeText: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    onClear: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //backgroundColor: 'black',
        //width: '100%',
        height: 50,

        marginLeft: 20,
        marginRight: 20,
    },
    searchInput: {
        // width: '100%',
        // height: '100%',
        paddingLeft: 8,
        fontSize: 16,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
    },
});
export default SearchBar;
