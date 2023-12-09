<script>
	import '../app.postcss';
	import Sidebar from '../lib/components/sidebar.svelte';
</script>
<div class="flex wrap">
	<Sidebar />
	<div class="w-[90%] container mx-auto">
	<slot />
	</div>
</div>

