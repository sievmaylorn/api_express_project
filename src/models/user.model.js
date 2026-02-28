import conn from "../configs/db.js";

export const createUser =   (name,email,password) =>{
    return  conn.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3)  RETURNING *"
        ,[name,email,password]
    )
}

export const findsOneuser =  (email) =>{
   return conn.query("SELECT * FROM users WHERE email=$1",[email]) 
}