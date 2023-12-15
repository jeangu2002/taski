import { LitElement, PropertyValueMap, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { GLOBAL_STYLES } from "../styles";

@customElement('task-row')
class TaskRow extends LitElement {

    @property({type: Number})
    taskId?: number;

    @property()
    taskTitle?: string;

    @property()
    taskDescription?: string;

    @property({type: Boolean, reflect: true})
    isCompleted?:boolean;

    @property({type: String})
    _lineThrough='';

    @property({type: Boolean, reflect: true})
    private _showTaskDescription?;

    constructor() {
        super();
        this._showTaskDescription = false;
        this.isCompleted = false;
    }

    static override styles = css`
        ${GLOBAL_STYLES}

        .task-row {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            background-color: var(--tl-paleWhite);
            padding: 1.5625rem;
            border-radius: 20px;
            overflow: hidden;
        }

        .task-row__left-col {
            display: flex;
            flex-flow: column;
            justify-content: center;
            gap: 14px;
            overflow: hidden;
        }

        .task-title {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .task__description {
            max-height: 0;
            transition: max-height 1000ms ease-in;
            overflow: hidden;
        }

        .task__description--expanded {
            max-height: 400px;
        }

        .task__actions {
            display: flex;
            align-self: flex-start;
            gap: 10px;
        }

        .task-action-btn {
            border: none;
            background-color: transparent;
        }

        .task-completed-checkbox {
            accent-color: var(--tl-blue);
            height: 28px;
        }

    `;

    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        if (this.isCompleted) {
            this._lineThrough = 'strike-through'
        }        
    }

    toggleShowDescription() {
        this._showTaskDescription = !this._showTaskDescription
    }

    taskStatusClicked() {
        const checkBoxInput = <HTMLInputElement>this.shadowRoot?.querySelector('.task-completed-checkbox');
        if(checkBoxInput && checkBoxInput.checked) {
            this._lineThrough = 'strike-through';
        } else {
            this._lineThrough = '';
        }
    }

    protected render(): unknown {
        return html`
        <div class="task-row">
            <div class="task-row__left-col">
                <div class="task-title">
                    <input type="checkbox" class="task-completed-checkbox" .checked=${this.isCompleted} @click=${this.taskStatusClicked}>
                    <strong .className="${this._lineThrough}"> 
                        ${this.taskTitle}
                    </strong></div>
                <p class="task__description ${this._showTaskDescription ? 'task__description--expanded' : '' }" > ${this.taskDescription} </p>

            </div>
            <div class="task__actions">
                <button class="task-action-btn expand-descripton__btn" @click=${this.toggleShowDescription}>
                    ${ !this._showTaskDescription ? html`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_6_384)">
                                <path d="M12 22L18 16L12 10" stroke="#8D9CB8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_6_384">
                                <rect width="30" height="30" rx="15" fill="white"/>
                                </clipPath>
                                </defs>
                        </svg>`
                        :html`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_6_381)">
                                <rect width="30" height="30" rx="15" fill="#007FFF" fill-opacity="0.15"/>
                                <path d="M9 13L15 19L21 13" stroke="#007FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_6_381">
                                <rect width="30" height="30" rx="15" fill="white"/>
                                </clipPath>
                                </defs>
                        </svg>
                        `}

                </button>
                <button class="task-action-btn edit-task__btn">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_6_376)">
                        <rect width="30" height="30" rx="15" fill="#007FFF" fill-opacity="0.15"/>
                        <path d="M8 19.247V21.6112C8 21.8289 8.17109 22 8.38883 22H10.753C10.854 22 10.9551 21.9611 11.0251 21.8833L19.5173 13.399L16.601 10.4827L8.11665 18.9671C8.03888 19.0449 8 19.1382 8 19.247ZM21.7725 11.1437C22.0758 10.8404 22.0758 10.3505 21.7725 10.0472L19.9528 8.22747C19.6495 7.92418 19.1596 7.92418 18.8563 8.22747L17.4331 9.6506L20.3494 12.5669L21.7725 11.1437Z" fill="#007FFF"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_6_376">
                        <rect width="30" height="30" rx="15" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
                <button class="task-action-btn delete-task__btn">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="30" height="30" rx="15" fill="#FF5E5E" fill-opacity="0.15"/>
                        <path d="M20.9706 9.65687C21.4169 10.1032 21.4169 10.8268 20.9706 11.2731L16.93 15.3137L20.9706 19.3543C21.4169 19.8006 21.4169 20.5243 20.9706 20.9706C20.5242 21.4169 19.8006 21.4169 19.3543 20.9706L15.3137 16.93L11.2731 20.9706C10.8268 21.4169 10.1032 21.4169 9.65685 20.9706C9.21054 20.5243 9.21054 19.8006 9.65685 19.3543L13.6975 15.3137L9.65685 11.2731C9.21054 10.8268 9.21054 10.1032 9.65685 9.65687C10.1032 9.21055 10.8268 9.21055 11.2731 9.65687L15.3137 13.6975L19.3543 9.65687C19.8006 9.21055 20.5242 9.21055 20.9706 9.65687Z" fill="#FF5E5E"/>
                    </svg>
                </button>
            </div>
        </div>

        `
    }

}

declare global {
    interface HTMLElementTagNameMap {
      'task-row': TaskRow
    }
  }