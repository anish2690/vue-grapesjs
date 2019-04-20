<template>
	<div>
		<div id="gjs"></div>
	</div>
</template>

<script>
import grapesjs from "grapesjs";
import $ from "jquery";
import "grapesjs-preset-webpage";
import "grapesjs-preset-newsletter";
import "grapesjs-plugin-ckeditor";
import ckeditor from "ckeditor";
import toastr from "toastr";

export default {
	name: "hello",
	data() {
		return {
			msg: "Welcome to Your Vue.js App"
		};
	},

	mounted() {
		var host = "//artf.github.io/grapesjs/";
		var images = [
			host + "img/grapesjs-logo.png",
			host + "img/tmp-blocks.jpg",
			host + "img/tmp-tgl-images.jpg",
			host + "img/tmp-send-test.jpg",
			host + "img/tmp-devices.jpg"
		];
		var editor = grapesjs.init({
			container: "#gjs",
			fromElement: true,
			noticeOnUnload: 0,
			plugins: ["gjs-preset-newsletter", "gjs-plugin-ckeditor"],
			panels: {},
			// pluginsOpts: {
			// 	"gjs-preset-newsletter": {
			// 		modalLabelImport:
			// 			"Paste all your code here below and click import",
			// 		modalLabelExport:
			// 			"Copy the code and use it wherever you want",
			// 		codeViewerTheme: "material",
			// 		//defaultTemplate: templateImport,
			// 		importPlaceholder:
			// 			'<table class="table"><tr><td class="cell">Hello world!</td></tr></table>',
			// 		cellStyle: {
			// 			"font-size": "12px",
			// 			"font-weight": 300,
			// 			"vertical-align": "top",
			// 			color: "rgb(111, 119, 125)",
			// 			margin: 0,
			// 			padding: 0
			// 		}
			// 	},
			// 	"gjs-plugin-ckeditor": {
			// 		position: "left",
			// 		// options: {
			// 		// 	language: "en",
			// 		// 	skin: "moono-dark"
			// 		// }
			// 	}
			// 	// pluginsOpts: {
			// 	// 	"gjs-plugin-ckeditor": {
			// 	// 		position: "center",
			// 	// 		options: {
			// 	// 			language: "en",
			// 	// 			skin: "moono-dark"
			// 	// 		}
			// 	// 	}
			// 	// }
			// },
			storageManager: {
				id: "",
				type: "remote",
				autosave: false,
				autoload: false,
				contentTypeJson: true,
				urlStore: `api/templates/${this.templateId}`,
				urlLoad: `api/templates/${this.templateId}`
			}
		});

		// Set up GrapesJS editor with the Newsletter plugin
		//   var editor = grapesjs.init({
		//     clearOnRender: true,
		//     // height: '100%',
		//     storageManager: {
		//       id: 'gjs-nl-',
		//     },
		//     assetManager: {
		//       assets: images,
		//       upload: 0,
		//       uploadText: 'Uploading is not available in this demo',
		//     },
		//     container : '#gjs',
		//     fromElement: true,
		//     plugins: ['gjs-preset-newsletter', 'gjs-plugin-ckeditor'],
		//     pluginsOpts: {
		//       'gjs-preset-newsletter': {
		//         modalLabelImport: 'Paste all your code here below and click import',
		//         modalLabelExport: 'Copy the code and use it wherever you want',
		//         codeViewerTheme: 'material',
		//         //defaultTemplate: templateImport,
		//         importPlaceholder: '<table class="table"><tr><td class="cell">Hello world!</td></tr></table>',
		//         cellStyle: {
		//           'font-size': '12px',
		//           'font-weight': 300,
		//           'vertical-align': 'top',
		//           color: 'rgb(111, 119, 125)',
		//           margin: 0,
		//           padding: 0,
		//         }
		//       },
		//       'gjs-plugin-ckeditor': {
		//         position: 'center',
		//         options: {
		//           startupFocus: true,
		//           extraAllowedContent: '*(*);*{*}', // Allows any class and any inline style
		//           allowedContent: true, // Disable auto-formatting, class removing, etc.
		//         //   enterMode: CKEDITOR.ENTER_BR,
		//           extraPlugins: 'sharedspace,justify,colorbutton,panelbutton,font',
		//           toolbar: [
		//             { name: 'styles', items: ['Font', 'FontSize' ] },
		//             ['Bold', 'Italic', 'Underline', 'Strike'],
		//             {name: 'paragraph', items : [ 'NumberedList', 'BulletedList']},
		//             {name: 'links', items: ['Link', 'Unlink']},
		//             {name: 'colors', items: [ 'TextColor', 'BGColor' ]},
		//           ],
		//         }
		//       }
		//     }
		//   });
		var blockManager = editor.BlockManager;
		// 'my-first-block' is the ID of the block
		blockManager.add("my-first-block", {
			label: "Simple block",
			content: '<div class="my-block">This is a simple block</div>'
		});
	}
};
</script>

<style>
/* @import "grapesjs/dist/css/grapes.min.css"; */

#gjs .gjs-editor .gjs-cv-canvas {
	padding-left: 264px;
	padding-right: 200px;
	width: 100%;
}

#gjs .gjs-editor .gjs-pn-panel#gjs-pn-left-control {
	width: 64px;
	height: 900px;
	left: 0;
	top: 0;
}

#gjs .gjs-editor .gjs-pn-panel#gjs-pn-left-panel {
	width: 200px;
	height: 900px;
	left: 64px;
	top: 0;
}

#gjs .gjs-editor .gjs-pn-panel#gjs-pn-right-control {
	width: 200px;
	height: 64px;
	right: 0;
	top: 0;
}

#gjs .gjs-editor .gjs-pn-panel#gjs-pn-right-panel {
	width: 200px;
	height: 836px;
	top: 64px;
	right: 0;
}
</style>
