// asynchronous Code

//callbacks

console.log('before');
getUser(1, function(user){
    console.log('user',user);
});
console.log ('after');

function getUser(id, callbacks){
    setTimeout(() => {
        console.log('reading a user from the database..');
        callbacks({id: id, gitHubUser: "manthan"});
    }, 2000);
}



