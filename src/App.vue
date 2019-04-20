<template>
	<div id="app">
		<div id="nav">
			<!-- <router-link to="/">Home</router-link> | -->
			<!-- <router-view></router-view> -->
		</div>
		<!-- <router-view/> -->
		<Native></Native>
	</div>
</template>
<script>
import Native from "@/views/new/TestWithNative";
export default {
	components: {
		Native
	}
};
</script>

<style src='grapesjs/dist/css/grapes.min.css'>
/* global styles */
</style>

 <style src='grapesjs-preset-newsletter/dist/grapesjs-preset-newsletter.css'>
</style>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
