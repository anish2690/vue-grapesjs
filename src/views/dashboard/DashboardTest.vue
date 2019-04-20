<template>
	<section>
		<div id="gjs"></div>
		<div id="blocks"></div>
		<button @click="saveEdits()">Save</button>

		<!-- info -->
		<div id="info-panel" style="display:none">
			<br>
			<svg class="info-panel-logo" xmlns="//www.w3.org/2000/svg" version="1">
				<g id="gjs-logo">
					<path
						d="M40 5l-12.9 7.4 -12.9 7.4c-1.4 0.8-2.7 2.3-3.7 3.9 -0.9 1.6-1.5 3.5-1.5 5.1v14.9 14.9c0 1.7 0.6 3.5 1.5 5.1 0.9 1.6 2.2 3.1 3.7 3.9l12.9 7.4 12.9 7.4c1.4 0.8 3.3 1.2 5.2 1.2 1.9 0 3.8-0.4 5.2-1.2l12.9-7.4 12.9-7.4c1.4-0.8 2.7-2.2 3.7-3.9 0.9-1.6 1.5-3.5 1.5-5.1v-14.9 -12.7c0-4.6-3.8-6-6.8-4.2l-28 16.2"
						style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-width:10;stroke:#fff"
					></path>
				</g>
			</svg>
			<br>
			<div class="info-panel-label">
				<b>GrapesJS Newsletter Builder</b> is a showcase of what/how is possible to build an editor using the
				<a
					class="info-panel-link gjs-four-color"
					target="_blank"
					href="//artf.github.io/grapesjs/"
				>GrapesJS</a>
				core library
				<br>
				<br>For any tip about this demo (or newsletters construction in general) check the
				<a
					class="info-panel-link gjs-four-color"
					target="_blank"
					href="https://github.com/artf/grapesjs-preset-newsletter"
				>Newsletter Preset repository</a>
				and open an issue. For any problem with the builder itself, open an issue on the main
				<a
					class="info-panel-link gjs-four-color"
					target="_blank"
					href="https://github.com/artf/grapesjs"
				>GrapesJS repository</a>
				<br>
				<br>Being a free and open source project contributors and supporters are extremely welcome.
				If you like the project support it with a donation of your choice or become a backer/sponsor via
				<a
					class="info-panel-link gjs-four-color"
					target="_blank"
					href="https://opencollective.com/grapesjs"
				>Open Collective</a>
			</div>
		</div>
	</section>
</template>

<script>
import grapesjs from "grapesjs";
import axios from "axios";
// import "grapesjs-blocks-basic";
import "grapesjs-preset-webpage";
import "grapesjs-preset-newsletter";
import "grapesjs-plugin-ckeditor";
import ckeditor from "ckeditor";
import toastr from "toastr";
export default {
	name: "dashboard",
	data: function() {
		return {
			editor: null,
			LandingPage: {
				html: `<div>Emtpy Page</div>`,
				css: null,
				components: null,
				style: null
			},
			templateId: 1
		};
	},
	mounted: function() {
		var host = "//artf.github.io/grapesjs/";
		var images = [
			host + "img/grapesjs-logo.png",
			host + "img/tmp-blocks.jpg",
			host + "img/tmp-tgl-images.jpg",
			host + "img/tmp-send-test.jpg",
			host + "img/tmp-devices.jpg"
		];

		this.editor = grapesjs.init({
			clearOnRender: true,
			// height: "100%",
			storageManager: {
				id: "gjs-nl-"
			},
			assetManager: {
				assets: images,
				upload: 0,
				uploadText: "Uploading is not available in this demo"
			},
			container: "#gjs",
			fromElement: true,
			plugins: ["gjs-preset-newsletter", "gjs-plugin-ckeditor"],
			pluginsOpts: {
				"gjs-preset-newsletter": {
					modalLabelImport:
						"Paste all your code here below and click import",
					modalLabelExport:
						"Copy the code and use it wherever you want",
					codeViewerTheme: "material",
					//defaultTemplate: templateImport,
					importPlaceholder: ``,
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
						startupFocus: true,
						extraAllowedContent: "*(*);*{*}", // Allows any class and any inline style
						allowedContent: true, // Disable auto-formatting, class removing, etc.
						enterMode: CKEDITOR.ENTER_BR,
						extraPlugins:
							"sharedspace,justify,colorbutton,panelbutton,font",
						toolbar: [
							{ name: "styles", items: ["Font", "FontSize"] },
							["Bold", "Italic", "Underline", "Strike"],
							{
								name: "paragraph",
								items: ["NumberedList", "BulletedList"]
							},
							{ name: "links", items: ["Link", "Unlink"] },
							{ name: "colors", items: ["TextColor", "BGColor"] }
						]
					}
				}
			}
		});
		// Let's add in this demo the possibility to test our newsletters
		var mdlClass = "gjs-mdl-dialog-sm";
		var pnm = this.editor.Panels;
		var cmdm = this.editor.Commands;
		var md = this.editor.Modal;
		/*
      var testContainer = document.getElementById("test-form");
      var contentEl = testContainer.querySelector('input[name=body]');
      cmdm.add('send-test', {
        run(editor, sender) {
          sender.set('active', 0);
          var modalContent = md.getContentEl();
          var mdlDialog = document.querySelector('.gjs-mdl-dialog');
          var cmdGetCode = cmdm.get('gjs-get-inlined-html');
          contentEl.value = cmdGetCode && cmdGetCode.run(editor);
          mdlDialog.className += ' ' + mdlClass;
          testContainer.style.display = 'block';
          md.setTitle('Test your Newsletter');
          md.setContent('');
          md.setContent(testContainer);
          md.open();
          md.getModel().once('change:open', function() {
            mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
            //clean status
          })
        }
      });
      pnm.addButton('options', {
        id: 'send-test',
        className: 'fa fa-paper-plane',
        command: 'send-test',
        attributes: {
          'title': 'Test Newsletter',
          'data-tooltip-pos': 'bottom',
        },
      });

      var statusFormElC = document.querySelector('.form-status');
      var statusFormEl = document.querySelector('.form-status i');
      var ajaxTest = ajaxable(testContainer).
        onStart(function(){
          statusFormEl.className = 'fa fa-refresh anim-spin';
          statusFormElC.style.opacity = '1';
          statusFormElC.className = 'form-status';
        })
        .onResponse(function(res){
          if (res.data) {
            statusFormElC.style.opacity = '0';
            statusFormEl.removeAttribute('data-tooltip');
            md.close();
          } else if(res.errors || res.errors == '') {
            var err = res.errors || 'Server error';
            statusFormEl.className = 'fa fa-exclamation-circle';
            statusFormEl.setAttribute('data-tooltip', err);
            statusFormElC.className = 'form-status text-danger';
          }
        });
      */

		// Add info command
		var infoContainer = document.getElementById("info-panel");
		cmdm.add("open-info", {
			run: function(editor, sender) {
				sender.set("active", 0);
				var mdlDialog = document.querySelector(".gjs-mdl-dialog");
				mdlDialog.className += " " + mdlClass;
				infoContainer.style.display = "block";
				md.setTitle("About this demo");
				md.setContent("");
				md.setContent(infoContainer);
				md.open();
				md.getModel().once("change:open", function() {
					mdlDialog.className = mdlDialog.className.replace(
						mdlClass,
						""
					);
				});
			}
		});
		pnm.addButton("options", [
			{
				id: "undo",
				className: "fa fa-undo",
				attributes: { title: "Undo" },
				command: function() {
					editor.runCommand("core:undo");
				}
			},
			{
				id: "redo",
				className: "fa fa-repeat",
				attributes: { title: "Redo" },
				command: function() {
					editor.runCommand("core:redo");
				}
			},
			{
				id: "clear-all",
				className: "fa fa-trash icon-blank",
				attributes: { title: "Clear canvas" },
				command: {
					run: function(editor, sender) {
						sender && sender.set("active", false);
						if (confirm("Are you sure to clean the canvas?")) {
							editor.DomComponents.clear();
							setTimeout(function() {
								localStorage.clear();
							}, 0);
						}
					}
				}
			},
			{
				id: "view-info",
				className: "fa fa-question-circle",
				command: "open-info",
				attributes: {
					title: "About",
					"data-tooltip-pos": "bottom"
				}
			}
		]);

		// Simple warn notifier
		var origWarn = console.warn;
		toastr.options = {
			closeButton: true,
			preventDuplicates: true,
			showDuration: 250,
			hideDuration: 150
		};
		console.warn = function(msg) {
			toastr.warning(msg);
			origWarn(msg);
		};

		// Beautify tooltips
		var titles = document.querySelectorAll("*[title]");
		for (var i = 0; i < titles.length; i++) {
			var el = titles[i];
			var title = el.getAttribute("title");
			title = title ? title.trim() : "";
			if (!title) break;
			el.setAttribute("data-tooltip", title);
			el.setAttribute("title", "");
		}

		// Do stuff on load
		this.editor.on("load", function() {
			var $ = grapesjs.$;

			// Show logo with the version
			var logoCont = document.querySelector(".gjs-logo-cont");
			document.querySelector(".gjs-logo-version").innerHTML =
				"v" + grapesjs.version;
			var logoPanel = document.querySelector(".gjs-pn-commands");
			logoPanel.appendChild(logoCont);

			// Move Ad
			$("#gjs").append($(".ad-cont"));
		});

		// this.checkTemplates();
	},
	methods: {
		change() {
			this.$emit("change", this.editor.getHtml());
		},
		saveEdits() {
            this.editor.store();
            console.log(this.editor)
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