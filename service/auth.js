const sessionidmap=new Map();
const setUserId=(id,user)=>{
return sessionidmap.set(id,user);

}

const getUserId=(id)=>{
return sessionidmap.get(id);
}

module.exports={
    setUserId,
    getUserId
}