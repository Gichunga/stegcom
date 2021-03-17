export default class Gate{

    constructor(user){
        this.user = user; // enable us to use this.user in our app
    }

    isAdmin(){
        return this.user.type === 'admin';
    }
    isAdminOrAuthor(){
        if(this.user.type  === 'admin' || this.user.type  === 'author'){
            return true;
        }
    }
    isUserOrAuthor(){
        if(this.user.type  === 'user' || this.user.type  === 'author'){
            return true;
        }
    }
    isUser(){
        return this.user.type === 'user';
    }
}