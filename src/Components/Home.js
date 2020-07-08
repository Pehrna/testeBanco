var rowsUser = [];
var cont = 0;
for (let i = 0; i < projeto.length; i++) {
    cont = 0;
    for (let j = 0; j < rowsUser.length; j++) {
        if (projeto[i].userId === rowsUser[j]) {
            cont = 1;
        }
    }
    if (cont === 0) {
        rowsUser.push(projeto[i].userId);
    }
}
console.log(rowsUser)

return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>Home Screen</Text>
    //     <Button
    //         title="Go to Details"
    //         onPress={() => navigation.navigate('Postagens')}
    //     />
    // </View>
    <View style={styles.container} >

        <FlatList
            data={rowsUser}
            renderItem={({ item }) =>

                <View style={styles.line}>
                    <Button onPress={ () => {
                        navigation.navigate('Postagens', { item } ) } } >
                        <Text style={styles.info}>Usuario {item.numero} </Text>
                    </Button>
                </View>
            }
            keyExtractor={item => item.userId}
        />
    </View>