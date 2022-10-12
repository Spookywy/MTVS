import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import PeopleItem from './PeopleItem'

class PeopleList extends React.Component {

    constructor(props) {
        super(props)
    }

    _displayDetailForPeople = (idPeople) => {
        this.props.navigation.navigate("PeopleDetails", {idPeople: idPeople})
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.peoples}
                keyExtractor={(item) => item.id.toString()}
                onEndReachThreashold={0.5}
                onEndReached={() => {
                    if (this.props.page < this.props.numberOfPages) {
                    this.props.loadPeoples()
                    }
                }}
                renderItem={({item}) => <PeopleItem people={item} displayDetailForPeople={this._displayDetailForPeople}/>}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

export default PeopleList