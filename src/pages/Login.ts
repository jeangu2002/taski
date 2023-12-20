import { LitElement, css, html } from "lit";

import { GLOBAL_STYLES } from '../styles';
import { Router } from "@vaadin/router";
import { customElement } from "lit/decorators.js";
import { AuthenticationService } from "../services/AuthenticationService";
import Container from "typedi";


@customElement('app-login')
class Login extends LitElement {
    static styles = css`
        ${GLOBAL_STYLES}

        input[type=text] {
            border: 1px solid var(--tl-slateBlue);
            border-radius: 10px;
            height: 40px;
        }
        .login-form-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 100px;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .login-btn {
            background-color: var(--tl-blue);
            padding: 12px 0;
            border-radius: 10px;
            font-weight: bold;
            color: var(--tl-white, #ffffff);
        }
    `;

    constructor(private authenticationService: AuthenticationService) {
        super();
        this.authenticationService = Container.get(AuthenticationService);
    }

    onLogin() {
        const connectedUser = localStorage.getItem('user');
        
        if(connectedUser) {
             Router.go('');
        } else if(this.authenticationService.authenticate('John', 'password')){
            Router.go('');
        }
        
    }

    protected render(): unknown {
        
    return html`<div class="login-form-container">
            <h1>Log In </h1>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" name="username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="text" name="password">
            </div>
            <button class="login-btn" @click=${this.onLogin}>Login</button>
    </div>`
    }

}

declare global {
    interface HTMLElementTagNameMap {
      'app-login': Login
    }
  }