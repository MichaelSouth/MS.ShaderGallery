class Main {
    constructor() {
        const compileButton = document.getElementById('compileButton') as HTMLButtonElement;
        compileButton.addEventListener("click", (e: Event) => this.compileButtonClickExecute(e));

        const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
        saveButton.addEventListener("click", (e: Event) => this.saveButtonClickExecute(e));

        const fullScreenButton = document.getElementById('fullScreenButton') as HTMLButtonElement;
        fullScreenButton.addEventListener("click", (e: Event) => this.fullScreenButtonClickExecute(e));
        
        const shaderGalleryButton = document.getElementById('shaderGalleryButton') as HTMLButtonElement;
        shaderGalleryButton.addEventListener("click", (e: Event) => this.shaderGalleryButtonClickExecute(e));
    }

    async getShaders() {
        try {
            const response = await fetch('/Shader');
            if (!response.ok) {
                throw response;
            };

            const json = await response.json();
            console.log(json);

            const shaderList = document.getElementById('shaderList') as HTMLUListElement;

            for (let i = 0; i < json.length; i++) {
                this.createShader(json[i] as Shader, shaderList);
            }
        }
        catch (error : any) {
            console.error('Fetch failed getting shaders:'+error)

            //TODO show user error
        }

        //await fetch('/Shader')
        //    .then(response => {
        //        if (!response.ok) throw response.statusText;
        //        return response;
        //    })
        //    .then(response => response.json())
        //    .then(data => {

        //        console.log(data);

        //        const shaderList = document.getElementById('shaderList') as HTMLUListElement;

        //        for (let i = 0; i < data.length; i++) {
        //            this.createShader(data[i] as Shader, shaderList);
        //        }
        //    }).catch(error => {
        //        console.log('Fetch faile3d: &{error}')

        //        //Show user
        //    });

        return;
    }

    private createShader(shader: Shader, shaderList: HTMLUListElement) {
        console.log(shader.title);

        const li = document.createElement("li");
        li.addEventListener("click", (e: Event) => this.shaderClickExecute(shader));

        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        canvas.id = shader.title;
        canvas.width = 400;
        canvas.height = 300;
        canvas.className = "shaderCanvas";
        li.appendChild(canvas);

        const shaderTitle = document.createElement('div') as HTMLDivElement;
        shaderTitle.innerHTML = shader.title;
        shaderTitle.className = "shaderTitle";
        li.appendChild(shaderTitle);
        shaderList.appendChild(li);

        const renderBackground = new RenderBackground();
        renderBackground.initiateWebGl(shader.code, canvas);
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

    shaderGalleryButtonClickExecute(obj) {
        console.log("Shader gallery button clicked");

        window.location.href = 'index.htm';
    }

    shaderClickExecute(shader: Shader) {
        console.log(shader.title+ " clicked");

        const shaderList = document.getElementById('shaderList') as HTMLUListElement;
        const shaderEditor = document.getElementById('shaderEditor') as HTMLDivElement;
        const shaderSourceCode = document.getElementById('shaderSourceCodeTextArea') as HTMLTextAreaElement;
        const editorCanvas = document.getElementById('editorCanvas') as HTMLCanvasElement;

        shaderList.style.display = "none";
        shaderEditor.style.display = "block";

        shaderSourceCode.value = shader.code;
        const renderBackground = new RenderBackground();
        renderBackground.initiateWebGl(shader.code, editorCanvas);
        renderBackground.renderLoop();
    }
}

interface Shader {
    title: string;
    code: string;
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

// start the app
const main = new Main();
main.getShaders();