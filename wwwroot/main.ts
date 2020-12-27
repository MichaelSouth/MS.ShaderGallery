class Main {
    constructor() {
        console.log("Main constructur called");
    }   

    getShaders() {
        fetch('/Shader')
            .then(response => response.json())
            .then(data => {

                console.log(data);

                const shaderList = document.getElementById('shaderList') as HTMLUListElement;

                for (let i = 0; i < data.length; i++) {
                    const obj = data[i];

                    console.log(obj.title);

                    const li = document.createElement("li");
                    //li.appendChild(document.createTextNode(obj.title));

                    const canvas = document.createElement('canvas') as HTMLCanvasElement;
                    canvas.id = obj.title;
                    canvas.width = 400;
                    canvas.height = 300;

                    li.appendChild(canvas);

                    shaderList.appendChild(li);

                    const renderBackground = new RenderBackground();
                    renderBackground.initiateWebGl(obj.code, canvas);
                    renderBackground.renderLoop();
                }
            });

        return;
    }
}

// start the app
const main = new Main();
main.getShaders();