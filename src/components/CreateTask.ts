import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GLOBAL_STYLES } from '../styles';
import { Ref, createRef, ref } from "lit/directives/ref.js";

@customElement('create-task')
export class CreateTask extends LitElement {
    @property({reflect: true})
    taskTitle?: string;
    @property({reflect: true})
    taskDescription?: string;

    taskNoteRef:Ref<HTMLInputElement> = createRef();
    taskTitleRef:Ref<HTMLInputElement> = createRef();

    constructor() {
        super();
        this.taskTitle = '';
        this.taskDescription = '';
    }

    static styles = css`
        ${GLOBAL_STYLES}
        .create-new-task-dialog {
            border-radius: 12px;
            box-shadow: 3px 3px 10px rgba(0,0,0,.065), -3px -3px 10px rgba(0,0,0,.065);
            padding: 42px;
            transition: transform 500ms ease-in;
            transform: translateY(100vh);
            position: absolute;
            display: flex;
            flex-direction: column;
            gap: 32px;
        }

        .create-new-task-dialog--open {
            transform: translateY(0);
        }
        .form-group {
            display: flex;
            gap: 16px;
        }

        .note{
            font-size: 0.875rem;
        }

        .create-new-task-form {
            display: flex;
            flex-flow: column;
            gap: 35px;
        }

        .create-task-btn {
            align-self: flex-end;
            color: var(--tl-blue);
            font-weight: 800;
            margin-top: 13px;
        }
        .close-dialog-btn {
            position: absolute;
            right: 42px;
            top: 42px;
        }
    `;

    openDalog() {
        this.shadowRoot?.querySelector('.create-new-task-dialog')?.classList.add('create-new-task-dialog--open');
    }
    closeDalog() {
        this.shadowRoot?.querySelector('.create-new-task-dialog')?.classList.remove('create-new-task-dialog--open');
    }

    createTask() {
            const createTaskEvent = new CustomEvent('create-task', {
                bubbles: true,
                detail: {
                    taskTitle: this.taskTitleRef.value?.value,
                    taskDescription: this.taskNoteRef.value?.value
                }
            });

            this.dispatchEvent(createTaskEvent);
    }

    

    protected render(): unknown {
        return html`
            <div class="create-new-task-dialog">

                <div class="form-group">
                    <input type="checkbox" aria-label="task is completed">
                    <input type="text" placeholder="what is on your mind" ${ref(this.taskTitleRef)}>
                    
                </div>
                <div class="form-group note">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_14_1252)">
                            <path d="M3 17.4601V20.5001C3 20.7801 3.22 21.0001 3.5 21.0001H6.54C6.67 21.0001 6.8 20.9501 6.89 20.8501L17.81 9.94006L14.06 6.19006L3.15 17.1001C3.05 17.2001 3 17.3201 3 17.4601ZM20.71 7.04006C21.1 6.65006 21.1 6.02006 20.71 5.63006L18.37 3.29006C17.98 2.90006 17.35 2.90006 16.96 3.29006L15.13 5.12006L18.88 8.87006L20.71 7.04006Z" fill="#C6CFDC"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_14_1252">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                        </defs>
                        </svg>

                    <input type="text" placeholder="Add a note" aria-label="add task note"  ${ref(this.taskNoteRef)}>
                </div>
                <button class="close-dialog-btn" @click=${this.closeDalog}>
                <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.576 0 0 3.576 0 8C0 12.424 3.576 16 8 16C12.424 16 16 12.424 16 8C16 3.576 12.424 0 8 0ZM11.44 11.44C11.128 11.752 10.624 11.752 10.312 11.44L8 9.128L5.688 11.44C5.376 11.752 4.872 11.752 4.56 11.44C4.248 11.128 4.248 10.624 4.56 10.312L6.872 8L4.56 5.688C4.248 5.376 4.248 4.872 4.56 4.56C4.872 4.248 5.376 4.248 5.688 4.56L8 6.872L10.312 4.56C10.624 4.248 11.128 4.248 11.44 4.56C11.752 4.872 11.752 5.376 11.44 5.688L9.128 8L11.44 10.312C11.744 10.616 11.744 11.128 11.44 11.44Z" fill="#C6CFDC"/>
                      </svg>
                </button>
                <button class="create-task-btn" @click=${this.createTask}>Create</button>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'create-task': CreateTask
    }
  }