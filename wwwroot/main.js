class Main {
    constructor() {
        const compileButton = document.getElementById('compileButton');
        compileButton.addEventListener("click", (e) => this.compileButtonClickExecute(e));
        const saveButton = document.getElementById('saveButton');
        saveButton.addEventListener("click", (e) => this.saveButtonClickExecute(e));
        const fullScreenButton = document.getElementById('fullScreenButton');
        fullScreenButton.addEventListener("click", (e) => this.fullScreenButtonClickExecute(e));
    }
    getShaders() {
        fetch('/Shader')
            .then(response => response.json())
            .then(data => {
            console.log(data);
            const shaderList = document.getElementById('shaderList');
            for (let i = 0; i < data.length; i++) {
                this.createShader(data[i], shaderList);
            }
        });
        return;
    }
    createShader(obj, shaderList) {
        console.log(obj.title);
        const li = document.createElement("li");
        li.addEventListener("click", (e) => this.shaderClickExecute(obj));
        const canvas = document.createElement('canvas');
        canvas.id = obj.title;
        canvas.width = 400;
        canvas.height = 300;
        canvas.className = "shaderCanvas";
        li.appendChild(canvas);
        const shaderTitle = document.createElement('div');
        shaderTitle.innerHTML = obj.title;
        shaderTitle.className = "shaderTitle";
        li.appendChild(shaderTitle);
        shaderList.appendChild(li);
        const renderBackground = new RenderBackground();
        renderBackground.initiateWebGl(obj.code, canvas);
        renderBackground.renderLoop();
    }
    compileButtonClickExecute(obj) {
        console.log("Compile button clicked");
        const shaderSourceCode = document.getElementById('shaderSourceCodeTextArea');
        const editorCanvas = document.getElementById('editorCanvas');
        const shaderCode = shaderSourceCode.value;
        const renderBackground = new RenderBackground();
        renderBackground.initiateWebGl(shaderCode, editorCanvas);
        renderBackground.renderLoop();
    }
    saveButtonClickExecute(obj) {
        console.log(" Save button clicked");
    }
    fullScreenButtonClickExecute(obj) {
        console.log("Full screen button clicked");
        const editorCanvas = document.getElementById('editorCanvas');
        if (!document.fullscreenElement) {
            editorCanvas.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        }
        else {
            document.exitFullscreen();
        }
    }
    shaderClickExecute(obj) {
        console.log(obj.title + " clicked");
        const shaderList = document.getElementById('shaderList');
        const shaderEditor = document.getElementById('shaderEditor');
        const shaderSourceCode = document.getElementById('shaderSourceCodeTextArea');
        const editorCanvas = document.getElementById('editorCanvas');
        shaderList.style.display = "none";
        shaderEditor.style.display = "block";
        shaderSourceCode.value = obj.code;
        const renderBackground = new RenderBackground();
        renderBackground.initiateWebGl(obj.code, editorCanvas);
        renderBackground.renderLoop();
    }
}
// start the app
const main = new Main();
main.getShaders();
//# sourceMappingURL=main.js.map