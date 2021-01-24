class ShaderElement extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        //We need to wait for the attributes to be set so creation happens here.
        //console.log('Shader element added to the DOM.');

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create spans
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');
      
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        canvas.id = this.getAttribute('title');
        canvas.width = 400;
        canvas.height = 300;
        canvas.className = "shaderCanvas";
        wrapper.appendChild(canvas);

        const shaderTitle = document.createElement('div') as HTMLDivElement;
        shaderTitle.innerHTML = this.getAttribute('title');
        shaderTitle.className = "shaderTitle";
        wrapper.appendChild(shaderTitle);

        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');

        //CSS style to show and hide the title on hover of the shader canvas.
        style.textContent = `
              .wrapper .shaderTitle {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    top: 0%;
                    margin: 16px;
                    left: 0;
                    font-size: 24px;
                    color: white;
                    font-family: sans-serif;
                    opacity: 0;
                    visibility: hidden;
                    transition: visibility 0s, opacity 1.0s linear;
                    text-shadow: 3px 3px #333333;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }

                .wrapper:hover .shaderCanvas {
                    filter: blur(8px);
                }

                .wrapper:hover .shaderTitle {
                    visibility: visible;
                    opacity: 1.0;
                }
            `;

        // Attach the created elements to the shadow dom
        shadow.appendChild(style);

        const renderBackground = new RenderBackground();
        renderBackground.initiateWebGl(this.getAttribute('code'), canvas);
        renderBackground.renderLoop();

        // Attach the created elements to the shadow dom
        shadow.appendChild(wrapper);
    }
}

// Define the new element (name requires hyphen)
customElements.define('shader-canvas', ShaderElement);