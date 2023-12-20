<script>
    import { onMount } from "svelte";
    import {AppRail, AppRailAnchor, AppRailTile} from "@skeletonlabs/skeleton"

    let currentTile = 0;

    let users = [];
    onMount(async()=>{
        getUsers()
    })

    async function getUsers(){
        const response = await fetch("http://localhost:3000/users",{
            mode:"cors"
        })
        const result = await response.json();
        users = result.users;
    }
</script>

<AppRail background="bg-surface-800" active="none" width="w-[10%]" height="h-[100vh] fixed">
    {#each users as user}
    <a href="/user/{user.id}/{user.team}/{user.admin}/{user.name}">
    <AppRailTile  href="/user/{user.id}">
		<span>{user.name}</span>
	</AppRailTile>
    </a>
    {/each}
</AppRail>