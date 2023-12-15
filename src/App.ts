import { Router } from "@vaadin/router";
import { LitElement, PropertyValueMap, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import { GLOBAL_STYLES } from "./styles";
import './pages/TaskOverview';
import { routes } from "./routes";

@customElement('todo-app')
class App extends LitElement {
    private _router:Router;
    constructor() {
        super();

    }


     static override styles = css`
        ${GLOBAL_STYLES}
        :root {
            width: 100%;
            background-color: #ffffff;
        }
        .logo {
            display: flex;
            gap: 6px;
            align-items: center;
        }

        header {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 48px;
        }

        .user {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .user__name, .logo {
            font-size: 18px;
            font-weight: 600;
        }

        .user__avatar {
            height: 42px;
            object-fit: cover;
            aspect-ratio: 1/1;
            border-radius: 50%;
        }

        .container {
            display: flex;
            flex-direction: column;
            gap: 48px;
        }
     
     `

     protected firstUpdated(): void {
        const outlet = this.shadowRoot.getElementById('outlet');
        this._router = new Router(outlet);
        this._router.setRoutes(routes)
     }
    

    protected render() {
        return html`
                <div class="container">
                    <header>
                        <div class="logo">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="28" height="28" rx="8" fill="#007FFF"/>
                                <path d="M7 14L11.6612 18.5L21 9.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Taski </span>
                        </div>
                        <div class="user">
                            <span class="user__name">John</span>
                            <img class="user__avatar" src="https://s3.envato.com/files/230713778/EC4A8636_big.jpg">
                        </div>
                    </header>
                    <main id="outlet">
                    </main>
                 </div>
            
        
        `
    }
}