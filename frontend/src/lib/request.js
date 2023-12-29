export async function setUniform(color1Value,color2Value,color3Value, team){
    const setUniform = await fetch(`http://localhost:3000/setColor?rotate=90&team=${team}&color1=0x${color1Value}&color2=0x${color2Value}&color3=0x${color3Value}`)
}

export async function banUser(id){
    const setUniform = await fetch(`http://localhost:3000/ban?userid=${id}`)
}

export async function takeAdmin(id){
    const setUniform = await fetch(`http://localhost:3000/take/admin?userid=${id}`)
}

export async function giveAdmin(id){
    const setUniform = await fetch(`http://localhost:3000/give/admin?userid=${id}`)
}

export async function setTeam(team, id){
    const setUniform = await fetch(`http://localhost:3000/change/team?id=${id}&team=${team}`)
}

export async function editAvatar(avatar, id){
    const setUniform = await fetch(`http://localhost:3000/change/avatar?id=${id}&avatar=${avatar}`)
}

export async function msg(message){
    const setUniform = await fetch(`http://localhost:3000/sendMessage?message=${message}`)
}

export async function freeze(name){
    await fetch(`http://localhost:3000/freeze?name=${name}`)
}

export async function unfreeze(name){
    await fetch(`http://localhost:3000/unfreeze?name=${name}`)
}

export async function muteUser(delay,name){
    let time = 0;

    switch(type){
        case "s":
            time = delay * 1000;
        break;
        case "m":
            time = delay * 60000;
        break;
        case "h":
            time = delay * 3600000;
        break;
        case "d":
            time = delay * 86400000;
    }

    const mute = await fetch(`http://localhost:3000/mute/player?name=${name}&delay=${time}`)
}

export async function changeMap(map){
    const maps = await fetch(`http://localhost:3000/change/map?map=${map}`)
}

export async function editRaduis(radius, id){
    await fetch(`http://localhost:3000/editRadius?userid=${id}&radius=${radius}`,{
        mode:"cors"
    })
    if(Response.ok){
        alert("Kullanıcının Boyutu güncellendi")
    }
}