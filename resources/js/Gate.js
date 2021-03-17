export default class Gate{

    constructor(user){
        this.user = user; // enable us to use this.user in our app
    }

    isAdmin(){
        return this.user.type === 'admin';
    }
    isAuthor(){
        return this.user.type === 'author';
    }
    isUser(){
        return this.user.type === 'user';
    }
}