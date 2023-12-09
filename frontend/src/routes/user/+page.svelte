<script>
    import {page} from "$app/stores"
    let radius;
    let avatar;
    let message;
    let delay;
    let type;
    let map;
    async function editRaduis(){
        await fetch(`http://localhost:3000/editRadius?userid=${$page.url.searchParams.get('id')}&radius=${radius}`,{
            mode:"cors"
        })
        if(Response.ok){
            alert("Kullanıcının Boyutu güncellendi")
        }
    }

    async function setUniform(color1Value,color2Value,color3Value){
        let team = $page.url.searchParams.get('team')
        const setUniform = await fetch(`http://localhost:3000/setColor?rotate=90&team=${team}&color1=0x${color1Value}&color2=0x${color2Value}&color3=0x${color3Value}`)
    }

    async function banUser(){
        const setUniform = await fetch(`http://localhost:3000/ban?userid=${$page.url.searchParams.get('id')}`)
    }

    async function takeAdmin(){
        const setUniform = await fetch(`http://localhost:3000/take/admin?userid=${$page.url.searchParams.get('id')}`)
    }

    async function giveAdmin(){
        const setUniform = await fetch(`http://localhost:3000/give/admin?userid=${$page.url.searchParams.get('id')}`)
    }

    async function setTeam(team){
        const setUniform = await fetch(`http://localhost:3000/change/team?id=${$page.url.searchParams.get('id')}&team=${team}`)
    }

    async function editAvatar(){
        const setUniform = await fetch(`http://localhost:3000/change/avatar?id=${$page.url.searchParams.get('id')}&avatar=${avatar}`)
    }

    async function msg(){
        const setUniform = await fetch(`http://localhost:3000/sendMessage?message=${message}`)
    }

    async function muteUser(){
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

        const mute = await fetch(`http://localhost:3000/mute/player?name=${$page.url.searchParams.get('name')}&delay=${time}`)
    }

    async function changeMap(){
        const maps = await fetch(`http://localhost:3000/change/map?map=${map}`)
    }
    let uniforms = [
        {
            name:"GALATASARAY",
            color1: "000",
            color2: "ff0000",
            color3: "ffff00"
        },
        {
            name:"FENERBAHÇE",
            color1: "000",
            color2: "ffff00",
            color3: "0000ff"
        },
        {
            name:"BEŞIKTAŞ",
            color1: "ff0000",
            color2: "000000",
            color3: "ffffff"
        },{
            name:"ADANA DEMIR SPOR",
            color1:"000",
            color2:"FF8C00",
            color3:"ffffff",
        }
    ]
</script>
<div class="container mx-auto">
    <center><h2 class="text-6xl mt-5 mb-5">{$page.url.searchParams.get('name')}</h2></center>
    <div class=" flex justify-center items-center">
        <div class="btn-group variant-filled">
        
            {#if $page.url.searchParams.get('admin') == "true"}
                <button on:click={takeAdmin}>Admini al</button>
            {:else}
                <button on:click={giveAdmin}>Admin ver</button>
            {/if}
                <button on:click={banUser}>Banla</button>
                <button on:click={()=>{setTeam("blue")}}>Mavi Takıma gönder</button>
                <button on:click={()=>{setTeam("red")}}>Kırmızı Takıma gönder</button>
                <button on:click={()=>{setTeam("spec")}}>İzleyicilere At</button>
        </div>
    </div>
    <div class="card p-6 mt-5">
        <span>Haritayı güncelle</span>
        <select class="select px-2 py-3" bind:value={map}>
            <option value="dodgeball">Yakartop</option>
            <option value="power">Power</option>
            <option value="voleybol">Voleybol</option>
        </select>
        <button type="button" class="btn variant-filled mt-5" on:click={changeMap}>Güncelle</button>
</div>
    <div class="card p-6 mt-5">
            <span>Kullanıcı Boyutunu güncelle</span>
            <input class="input p-2 mt-5" type="text" placeholder="Input" bind:value={radius}/>
            <button type="button" class="btn variant-filled mt-5" on:click={editRaduis}>Güncelle</button>
    </div>
    <div class="card p-6 mt-5">
        <span>Kullanıcı Avatarını güncelle</span>
        <input class="input p-2 mt-5" type="text" placeholder="Input" bind:value={avatar}/>
        <button type="button" class="btn variant-filled mt-5" on:click={editAvatar}>Güncelle</button>
</div>
<div class="card p-6 mt-5">
    <span>Sunucuya mesaj gönder</span>
    <input class="input p-2 mt-5" type="text" placeholder="Input" bind:value={message}/>
    <button type="button" class="btn variant-filled mt-5" on:click={msg}>Güncelle</button>
</div>
<div class="card p-6 mt-5">
    <span>Kullanıcıyı Sustur</span>
    <div class="input-group input-group-divider flex">
    <input class="px-3 w-[85%] py-4" type="text" placeholder="Input" bind:value={delay}/>
    <select class="px-2 py-3" bind:value={type}>
        <option value="s">Saniye</option>
        <option value="m">Dakika</option>
        <option value="h">Saat</option>
        <option value="d">Gün</option>
    </select>
    </div>
    <button type="button" class="btn variant-filled mt-5" on:click={muteUser}>Sustur</button>
</div>
    <h1 class="text-3xl">Formalar</h1>
    <div class="flex wrap gap-2">
        {#each uniforms as uniform}
            <div on:click={()=>{setUniform(uniform.color1,uniform.color2,uniform.color3)}} class="card mt-3 w-[75px] flex items-center justify-center py-3">
                <div class="rounded-full overflow-hidden flex w-[50px] h-[50px]">
                    <div class="w-[25px] h-[50px]" style="background:#{uniform.color2}">

                    </div>
                    <div class="w-[25px] h-[50px]" style="background:#{uniform.color3}">
                      
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
