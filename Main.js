import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    ListView,
    TouchableOpacity 
    
} from 'react-native'

// var Movies_List = 'http://api.themoviedb.org/3/movie/now_playing?api_key=e1a3bd96e2e2a55a0a19b753e5b42a1f';
var Movies_List = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';



export default class Main extends Component {

    constructor(props) {
        super(props)
        

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged:(row1,row2) => row1 != row2
            }) ,
            loaded: false,
            animating: true,

        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {

        fetch(Movies_List)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded: true,
                    animating: false
                })
            })
            .done();
    }

    render() {
        if (this.state.loaded == false) {
            console.log("Before")
            return this.renderView()

        }

        else {
            console.log("After")
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator = {this.renderSeparator}
                    renderFooter = {this.renderFooter}
                    style={styles.listview}
                    />
            )

        }
    }
    renderFooter() {

        return(
            <View style = {styles.footerContainer}>
                <TouchableOpacity onPress = {()=>{console.log("Pressed")}} style={styles.button}>
                    <Text>Load More</Text>
                </TouchableOpacity>
            </View>
        )
    }


    renderSeparator(sectionId,rowId) {

        return(
            <View key={rowId} style={styles.renderSeparator}>

            </View>
        )
    }

    renderRow(rowData) {
        console.log("working")
        return (
            <View style = {styles.container}>
                <Image
                    source = {{uri: rowData.posters.thumbnail}}
                    style = {styles.thumbnail}
                />
            
            <View style = {styles.content}>
                <Text style={styles.contentText}>{rowData.title}</Text>
                <Text style={styles.contentText}>{rowData.year}</Text>
                
            </View>

            </View>
        )
    }



    renderView() {

        console.log("sdfsd")

        return (

            <View style={styles.container}>
                <Text>Loading Movies!!!</Text>
                <ActivityIndicator animating={this.state.animating} size="large" style={styles.activityIndicator} />

            </View>
        )
    }


    // renderViewLoading() {
    //     return(
    //         <View style={styles.container}>
    //         <Text>{}</Text>

    //         </View>
    //     )
    // }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    thumbnail: {
        height: 100,
        width: 50,
        flex: 2,

    },
    content: {
        flex: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    contentText: {
        fontSize:20
    },
    activityIndicator: {
        flex: 1,
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    listView: {
    
    backgroundColor: '#F5FCFF',
  },
  renderSeparator:{
      flex:1,
      height:StyleSheet.hairlineWidth,
      backgroundColor:"black"
  },
  footerContainer:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
  },
  button:{
      borderWidth:StyleSheet.hairlineWidth,
      borderRadius:5,
      padding:10
  }
})