<template>
	<div>
		<!--  custome pannels -->
		<div class="panel__top">
			<div class="panel__basic-actions"></div>
		</div>
		<!--  custome pannels -->
		<div id="gjs"></div>
		<div id="blocks"></div>
		<button @click="saveEdits()">Save</button>
	</div>
</template>

<script>
import grapesjs from "grapesjs";
import axios from "axios";
// import 'grapesjs-blocks-basic';
// import 'grapesjs-preset-webpage';
import "grapesjs-preset-newsletter";
import "grapesjs-plugin-ckeditor";
import ckeditor from "ckeditor";

export default {
	name: "dashboard",
	data: function() {
		return {
			editor: null,
			LandingPage: {
				html: `<table class="table"><tr><td class="cell">Hello world!</td></tr></table>`,
				css: null,
				components: null,
				style: null
			},
			templateId: 1
		};
	},
	mounted: function() {
		this.editor = grapesjs.init({
			container: "#gjs",
			autorender: 0,
			components: this.LandingPage.components || this.LandingPage.html,
			style: this.LandingPage.style || this.LandingPage.css,
			panels: {
				// options
			},
			plugins: [
				// 'gjs-blocks-basic',
				"gjs-preset-webpage",
				"gjs-preset-newsletter",
				"gjs-plugin-ckeditor"
			],
			// custom components
			pluginsOpts: {
				"gjs-preset-newsletter": {
					// modalLabelImport:
					// 	"Paste all your code here below and click import",
					// modalLabelExport:
					// 	"Copy the code and use it wherever you want",
					// codeViewerTheme: "material",
					// //defaultTemplate: templateImport,
					// importPlaceholder:
					// 	'<table class="table"><tr><td class="cell">Hello world!</td></tr></table>',
					// cellStyle: {
					// 	"font-size": "12px",
					// 	"font-weight": 300,
					// 	"vertical-align": "top",
					// 	color: "rgb(111, 119, 125)",
					// 	margin: 0,
					// 	padding: 0
					// }
					modalLabelImport:
						"Paste all your code here below and click import",
					modalLabelExport:
						"Copy the code and use it wherever you want",
					codeViewerTheme: "material",
					//defaultTemplate: templateImport,
					importPlaceholder:
						'<table class="table"><tr><td class="cell">Hello world!</td></tr></table>',
					cellStyle: {
						"font-size": "12px",
						"font-weight": 300,
						"vertical-align": "top",
						color: "rgb(111, 119, 125)",
						margin: 0,
						padding: 0
					}
				},
				"gjs-plugin-ckeditor": {
					position: "center",
					options: {
						language: "en"
						//skin: 'moono-dark',
					}
				}
			},
			blockManager: {
				appendTo: "#blocks",
				blocks: [
					//     {
					//         id: 'section', // id is mandatory
					//         label: '<b>Section</b>', // You can use HTML/SVG inside labels
					//         attributes: { class:'gjs-block-section' },
					//         content: `<section>
					//         <h1>This is a simple title</h1>
					//         <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
					//         </section>`,
					//     }, {
					//         id: 'text',
					//         label: 'Text',
					//         content: '<div data-gjs-type="text">Insert your text here</div>',
					//     }, {
					//         id: 'my-first-block',
					//         label: 'Simple block',
					//         content: '<div class="my-block">This is a simple block</div>',
					//     }, {
					//         id: 'my-map-block',
					//         label: 'Simple map block',
					//         content: {
					//             type: 'map', // Built-in 'map' component
					//             style: {
					//                 height: '350px'
					//             },
					//             removable: false, // Once inserted it can't be removed
					//         }
					//     }, {
					//         id: 'my-image',
					//         label: 'Simple Image',
					//         content: {
					//             type: 'image',
					//             style: {
					//                 height: '250px',
					//                 width: '400px'
					//             },
					//         }
					//     }, {
					//         id: 'the-row-block',
					//         label: '2 Columns',
					//         content: `<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
					//             <div class="row-cell" data-gjs-draggable=".row"></div>
					//             <div class="row-cell" data-gjs-draggable=".row"></div>
					//             </div>`
					//     }
				]
			},
			storageManager: {
				id: "",
				type: "remote",
				autosave: false,
				autoload: false,
				contentTypeJson: true,
				urlStore: `api/templates/${this.templateId}`,
				urlLoad: `api/templates/${this.templateId}`
			},
			assetManager: {
				disableUpload: false,
				uploadFile: this.uploadAsset
			}
		});
		// custom pannels and buttons
		// this.editor.Panels.addPanel({
		// 	id: "panel-top",
		// 	el: ".panel__top"
		// });
		// this.editor.Panels.addPanel({
		// 	id: "basic-actions",
		// 	el: ".panel__basic-actions",
		// 	buttons: [

		// 		{
		// 			id: "show-json",
		// 			className: "btn-show-json",
		// 			label: "JSON",
		// 			context: "show-json",
		// 			command(editor) {
		// 				editor.Modal.setTitle("Components JSON")
		// 					.setContent(
		// 						`<textarea style="width:100%; height: 250px;">
		//                             ${JSON.stringify(editor.getComponents())}
		//                         </textarea>`
		// 					)
		// 					.open();
		// 			}
		// 		}
		// 	]
		// });

		// const panelManager = this.editor.Panels;
		// const removedButton = panelManager.addButton("myNewPanel", {
		// 	id: "myNewButton",
		// 	className: "someClass",
		// 	command: "someCommand",
		// 	attributes: { title: "Some title" },
		// 	active: false
		// });

		// const removedButton = panelManager.removeButton(
		// 	"myNewPanel",
		// 	"myNewButton"
		// );
		// end

		this.editor.on("run:export-template:before", opts => {
			console.log("Before the command run");
			if (0 /* some condition */) {
				opts.abort = 1;
			}
		});
		this.editor.on("run:export-template", () =>
			console.log("After the command run")
		);
		this.editor.on("abort:export-template", () =>
			console.log("Command aborted")
		);
		// custome codes

		this.editor.on("storage:load", e => {
			this.editor.render();
		});

		this.editor.on("change", this.change);

		this.checkTemplates();
	},
	methods: {
		change() {
			this.$emit("change", this.editor.getHtml());
		},
		saveEdits() {
			this.editor.store();
		},
		checkTemplates() {
			axios
				.get(`api/templates/${this.templateId}`)
				.then(response => {
					this.editor.load();
					console.log("Loading templates");
				})
				.catch(error => {
					this.editor.render();
				});
		},
		uploadAsset(e) {
			const files = e.dataTransfer
				? e.dataTransfer.files
				: e.target.files;
			const formData = new FormData();

			formData.append("files", files[0]); // containing all the selected images from local

			axios
				.post("api/files", formData, {
					headers: { "Content-Type": "multipart/form-data" }
				})
				.then(response => {
					const assets = response.data.data.map(imageName => ({
						name: imageName,
						src: `api/files/${imageName}`
					}));
					this.editor.AssetManager.add(assets);
					this.editor.AssetManager.render();
				})
				.catch(error => error);
		}
	}
};
</script>

<style>
/* Let's highlight canvas boundaries */

#gjs {
	border: 3px solid #444;
}

/* Reset some default styling */

/* .gjs-cv-canvas { */
/* top: 0; */
/* width: 100%;
        height: 100%; */
/* } */

.gjs-block {
	width: auto;
	height: auto;
	min-height: auto;
}

.panel__top {
	padding: 0;
	width: 100%;
	display: flex;
	position: initial;
	justify-content: center;
	justify-content: space-between;
}

.panel__basic-actions {
	position: initial;
}

.editor-row {
	display: flex;
	justify-content: flex-start;
	align-items: stretch;
	flex-wrap: nowrap;
	height: 300px;
}

.editor-canvas {
	flex-grow: 1;
}

.panel__right {
	flex-basis: 230px;
	position: relative;
	overflow-y: auto;
}

.panel__switcher {
	position: initial;
}
</style>