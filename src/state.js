
let state = {
    users: JSON.parse(localStorage.getItem("logInfo")),
    currentUser: {
        id:"",
        login : "",
        password : "",
        data:[],
        history: []
    },

    
    
    
}


export default state;