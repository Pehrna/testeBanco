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