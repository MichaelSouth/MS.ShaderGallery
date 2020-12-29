class Main {
    constructor() {
        const compileButton = document.getElementById('compileButton') as HTMLButtonElement;
        compileButton.addEventListener("click", (e: Event) => this.compileButtonClickExecute(e));

        const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
        saveButton.addEventListener("click", (e: Event) => this.saveButtonClickExecute(e));

        const fullScreenButton = document.getElementById('fullScreenButton') as HTMLButtonElement;
        fullScreenButton.addEventListener("click", (e: Event) => this.fullScreenButtonClickExecute(e));
    }

    getShaders() {
        fetch('/Shader')
            .then(response => response.json())
            .then(data => {

                console.log(data);

                const shaderList = document.getElementById('shaderList') as HTMLUListElement;

                for (let i = 0; i < data.length; i++) {
                    this.createShader(data[i], shaderList);
                }
            });

        return;
    }

    private createShader(obj: any, shaderList: HTMLUListElement) {
        console.log(obj.title);

        const li = document.createElement("li");
        li.addEventListener("click", (e: Event) => this.shaderClickExecute(obj));

        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        canvas.id = obj.title;
        canvas.width = 400;
        canvas.height = 300;
        canvas.className = "shaderCanvas";
        li.appendChild(canvas);

        const shaderTitle = document.createElement('div') as HTMLDivElement;
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

        const shaderSourceCode = document.getElementById('shaderSourceCodeTextArea') as HTMLTextAreaElement;
        const editorCanvas = document.getElementById('editorCanvas') as HTMLCanvasElement;
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

        const editorCanvas = document.getElementById('editorCanvas') as HTMLCanvasElement;

        if (!document.fullscreenElement) {
            editorCanvas.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    shaderClickExecute(obj) {
        console.log(obj.title+ " clicked");

        const shaderList = document.getElementById('shaderList') as HTMLUListElement;
        const shaderEditor = document.getElementById('shaderEditor') as HTMLDivElement;
        const shaderSourceCode = document.getElementById('shaderSourceCodeTextArea') as HTMLTextAreaElement;
        const editorCanvas = document.getElementById('editorCanvas') as HTMLCanvasElement;

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