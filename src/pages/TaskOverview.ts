import { LitElement, css, html, nothing } from "lit";

import { GLOBAL_STYLES } from "../styles";
import { customElement, property } from "lit/decorators.js";
import '../components/TaskRowComponent'
import { repeat } from "lit/directives/repeat.js";
import { TaskService } from "../services/TaskService";
import { BeforeEnterObserver } from "@vaadin/router";
import Container from "typedi";
import '../components/CreateTask';
import { Task } from "../models/Task";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { CreateTask } from "../components/CreateTask";

@customElement('task-overview')

export class TaskOverview extends LitElement implements BeforeEnterObserver {

    @property({type: String})
    __searchInputValue?: String

    searchInputRef:Ref<HTMLInputElement> = createRef();
    createTaskDialogRef:Ref<CreateTask> = createRef();

    @property({type: Array})
    __tasksList?:Task[]
    
    constructor(private taskService:TaskService) {
        super();
        this.__searchInputValue = '';
        this.__tasksList = [];
        this.taskService = Container.get(TaskService)
    }
    static override styles = css`
        ${GLOBAL_STYLES}
        .top-bar {
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
        }
        
        .user__messages {
            font-weight: bold;
            font-size: 28px;
        }

        .user__waiting-tasks {
            color: var(--tl-slateBlue);
            font-size: 18px;
            font-weight: normal;
        }

        .user__name {
            color: var(--tl-blue);
        }

        .task-search{
            display: flex;
            gap: 8px;
            align-items: center;
            background-color: var(--tl-paleWhite);
            border-radius: 12px;
            height: 34px;
            padding: 10px; 
            
        }
        .task-search:has( .task-search-input:focus) {
            outline: var(--tl-blue) solid 1px;
        }

        .task-search__magnifying-glass {
            order: -1;
        }
        .task-search-input {
            height: 100%;
            appearance: none;
            border: none;
            height: 22px;
            background-color: transparent;
        }

        .seatch-text__delete-btn {
            border: none;

        }

        .task-search-input:focus {
            outline: none;
        }

        .task-search-input:focus + .task-search__magnifying-glass > path {
            fill: var(--tl-blue);
        }

        .task-list {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            position: relative;
        }
        
        .empty-list {
            align-self: center;
            display: flex;
            flex-flow: column nowrap;
            gap: 33px;
        }
        .add-new-task {
            display: flex;
            align-items: center;
            gap: 20px;
            color: var(--tl-slateBlue);
        }
        .create-task__btn {
            background-color: rgba(0, 127, 255, .1);
            color: var(--tl-blue);
            font-size: 1.125em;
            padding: 14px 16px;
            border-radius: 12px;
            border: none;
            margin-top: 20px;
        }

        .task-list:has(.empty-list) {
            place-self: center;
        }

    `;

    onBeforeEnter(location, commands, router) {
        console.log(location)
        console.log(router)
    }

    protected async firstUpdated(): Promise<void> {
       //this.__tasksList = TASKS;
        this.refreshTasks();
    }

   async refreshTasks() {
        const {data} = await this.taskService.getAllTasks();
        console.log(data);
        this.__tasksList = data;
    }

    private _handleSearchInput() {
        const input = this.searchInputRef.value;
        if(input) {
            this.__searchInputValue = input.value;
        }
       
    }

    private _clearSearchInput() {
        this.__searchInputValue = '';
        const input = this.searchInputRef.value;
        if(input) {
            input.value = ''; // not sure why 2 way databing doesn't work
        }
    }

    private openNewTaskDialog() {
        this.createTaskDialogRef.value?.openDalog();
    }

    private async onCreateTask(e) {
        const { detail } = e;
        const newTask: Task = {
            title: detail.taskTitle,
            description: detail.taskDescription
        }

        await this.taskService.createTask(newTask);

        this.refreshTasks();
        this.createTaskDialogRef.value?.closeDalog();
    }

    protected render() {
        return html`
            <div class="top-bar">
                <div class="user__messages">
                    <p>Welcome, <span class="user__name">John</span>.</p>
                    <p class="user__waiting-tasks">${!! this.__tasksList?.length ? `You've got ${this.__tasksList.length} tasks to do.`: 'Create tasks to achieve more'}</p>
                </div>

                <div class="task-search">
                    <input id="search-input" ${ref(this.searchInputRef)} type="text" placeholder="Search" class="task-search-input" @input=${this._handleSearchInput} value="${this.__searchInputValue}" />
                    <svg class="task-search__magnifying-glass" role="presentation" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.53425 11.5476C7.23668 11.5476 7.89662 11.4157 8.51407 11.152C9.13153 10.8883 9.67534 10.5236 10.1455 10.0579C10.6157 9.58653 10.9839 9.04506 11.2501 8.43346C11.522 7.82185 11.658 7.16816 11.658 6.47238C11.658 5.77661 11.522 5.12292 11.2501 4.51131C10.9839 3.8997 10.6157 3.36104 10.1455 2.89532C9.67534 2.4296 9.13153 2.06488 8.51407 1.80116C7.89662 1.53183 7.23668 1.39716 6.53425 1.39716C5.83183 1.39716 5.17189 1.53183 4.55443 1.80116C3.93698 2.06488 3.39033 2.4296 2.9145 2.89532C2.44433 3.36104 2.07612 3.8997 1.80988 4.51131C1.54364 5.12292 1.41052 5.77661 1.41052 6.47238C1.41052 7.16816 1.54364 7.82185 1.80988 8.43346C2.07612 9.04506 2.44433 9.58653 2.9145 10.0579C3.39033 10.5236 3.93698 10.8883 4.55443 11.152C5.17189 11.4157 5.83183 11.5476 6.53425 11.5476ZM6.53425 12.9448C5.63356 12.9448 4.78952 12.7764 4.00212 12.4398C3.21473 12.1031 2.5208 11.6374 1.92034 11.0426C1.31988 10.4478 0.849708 9.76048 0.509825 8.98054C0.169942 8.2006 0 7.36455 0 6.47238C0 5.58022 0.169942 4.74417 0.509825 3.96423C0.849708 3.17868 1.31988 2.49132 1.92034 1.90216C2.5208 1.30738 3.21473 0.841662 4.00212 0.504997C4.79519 0.168332 5.63923 0 6.53425 0C7.43494 0 8.27899 0.168332 9.06638 0.504997C9.85378 0.841662 10.5477 1.30738 11.1482 1.90216C11.7486 2.49693 12.2188 3.18429 12.5587 3.96423C12.8986 4.74417 13.0685 5.58022 13.0685 6.47238C13.0685 7.36455 12.8986 8.2006 12.5587 8.98054C12.2188 9.76048 11.7486 10.4478 11.1482 11.0426C10.5477 11.6374 9.85378 12.1031 9.06638 12.4398C8.27899 12.7764 7.43494 12.9448 6.53425 12.9448ZM15.0568 16C14.9265 16 14.8019 15.9776 14.683 15.9327C14.564 15.8878 14.4564 15.8176 14.3601 15.7223L9.84811 11.253L11.2416 9.91478L15.7281 14.3672C15.8244 14.457 15.8924 14.5608 15.932 14.6786C15.9773 14.7964 16 14.9171 16 15.0405C16 15.2201 15.9575 15.38 15.8725 15.5203C15.7932 15.6661 15.6828 15.7812 15.5412 15.8653C15.3995 15.9551 15.2381 16 15.0568 16Z" fill="#C6CFDC"/>
                    </svg>
                    
                    ${
                      !!this.__searchInputValue.length ? html `<button aria-label="delete search text" class="seatch-text__delete-btn" @click=${this._clearSearchInput}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.576 0 0 3.576 0 8C0 12.424 3.576 16 8 16C12.424 16 16 12.424 16 8C16 3.576 12.424 0 8 0ZM11.44 11.44C11.128 11.752 10.624 11.752 10.312 11.44L8 9.128L5.688 11.44C5.376 11.752 4.872 11.752 4.56 11.44C4.248 11.128 4.248 10.624 4.56 10.312L6.872 8L4.56 5.688C4.248 5.376 4.248 4.872 4.56 4.56C4.872 4.248 5.376 4.248 5.688 4.56L8 6.872L10.312 4.56C10.624 4.248 11.128 4.248 11.44 4.56C11.752 4.872 11.752 5.376 11.44 5.688L9.128 8L11.44 10.312C11.744 10.616 11.744 11.128 11.44 11.44Z" fill="#C6CFDC"/>
                      </svg>
                    </button>` : nothing  
                    }

                </div>
            </div>
            <div class="task-list">
                
                ${
                    this.__tasksList?.length ? html`
                    <div class="add-new-task">
                        <button @click=${this.openNewTaskDialog}>
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 8.59277V17.3844" stroke="#C6CFDC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.3999 12.9886H8.59985" stroke="#C6CFDC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6229 1H7.37714C3.45714 1 1 3.7745 1 7.70219V18.2978C1 22.2255 3.44571 25 7.37714 25H18.6229C22.5543 25 25 22.2255 25 18.2978V7.70219C25 3.7745 22.5543 1 18.6229 1Z" stroke="#C6CFDC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <span> Add a new task</span>
                    </div>
                    
                    ${repeat(this.__tasksList, task => task.taskId, (task, index) => {
                        return html`<task-row 
                                        .taskTitle=${task.title} 
                                        .taskDescription=${task.description} 
                                        .taskId=${task.taskId}
                                        .isCompleted=${task.completed}
                                    >
                                    </task-row>`
                    })}`
                    : html`
                        <div class="empty-list">
                        <svg width="148" height="144" viewBox="0 0 148 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_14_822)">
                            <path d="M93.9563 32.3851H54.0767C53.1679 32.3862 52.2967 32.7466 51.6541 33.3871C51.0114 34.0276 50.6499 34.8961 50.6488 35.8019V124.149L50.1918 124.287L40.4087 127.274C39.9451 127.415 39.4443 127.366 39.0163 127.14C38.5882 126.913 38.268 126.526 38.1258 126.064L9.02557 31.3168C8.88396 30.8547 8.93222 30.3554 9.15977 29.9287C9.38731 29.502 9.77551 29.1828 10.239 29.0413L25.3148 24.44L69.0199 11.1054L84.0955 6.50416C84.3249 6.43378 84.566 6.40918 84.805 6.43178C85.044 6.45438 85.2761 6.52374 85.4882 6.63587C85.7002 6.748 85.888 6.90072 86.0408 7.08527C86.1936 7.26983 86.3083 7.4826 86.3785 7.71142L93.8169 31.9296L93.9563 32.3851Z" fill="#F5F7F9"/>
                            <path d="M102.658 31.9293L93.6933 2.74089C93.5442 2.25456 93.3004 1.80229 92.9758 1.40992C92.6512 1.01756 92.2522 0.692788 91.8017 0.454174C91.3511 0.215559 90.8578 0.0677724 90.35 0.0192658C89.8421 -0.0292408 89.3296 0.0224826 88.8418 0.171475L67.6463 6.6383L23.9435 19.9751L2.74797 26.4443C1.76334 26.7456 0.938892 27.4241 0.455597 28.3307C-0.0276977 29.2374 -0.130356 30.2981 0.170159 31.2801L30.8106 131.034C31.0547 131.827 31.5473 132.521 32.2161 133.014C32.8848 133.507 33.6946 133.774 34.5264 133.774C34.9115 133.775 35.2943 133.717 35.6621 133.604L50.1917 129.171L50.6487 129.03V128.554L50.1917 128.693L35.5273 133.169C34.6582 133.433 33.7195 133.342 32.9171 132.917C32.1147 132.493 31.5141 131.768 31.2471 130.902L0.609018 31.1457C0.476723 30.7168 0.430615 30.2661 0.473332 29.8193C0.516049 29.3726 0.646748 28.9387 0.857954 28.5424C1.06916 28.1461 1.35672 27.7952 1.70417 27.5098C2.05162 27.2244 2.45212 27.0102 2.88276 26.8793L24.0783 20.4102L67.7812 7.07565L88.9767 0.60655C89.3033 0.507189 89.6429 0.456528 89.9844 0.45621C90.7173 0.457851 91.4304 0.693371 92.0193 1.12827C92.6082 1.56318 93.0419 2.17461 93.2569 2.87301L102.181 31.9293L102.322 32.3849H102.798L102.658 31.9293Z" fill="#C6CFDC"/>
                            <path d="M28.0357 29.1157C27.5952 29.1154 27.1665 28.9744 26.8123 28.7134C26.4581 28.4524 26.1972 28.0851 26.0678 27.6655L23.1243 18.0822C23.0452 17.8247 23.0178 17.5543 23.0436 17.2863C23.0693 17.0183 23.1478 16.758 23.2745 16.5202C23.4012 16.2825 23.5737 16.0719 23.7821 15.9006C23.9904 15.7293 24.2306 15.6006 24.4889 15.5218L64.6951 3.25241C65.2166 3.09376 65.7801 3.14787 66.2617 3.40285C66.7432 3.65783 67.1037 4.09286 67.2638 4.61244L70.2073 14.1959C70.3664 14.7158 70.312 15.2773 70.0562 15.7574C69.8004 16.2374 69.3641 16.5966 68.8429 16.7564L28.6366 29.0257C28.4419 29.0853 28.2394 29.1156 28.0357 29.1157Z" fill="#007FFF"/>
                            <path d="M43.4547 10.24C45.9789 10.24 48.0252 8.20036 48.0252 5.68431C48.0252 3.16826 45.9789 1.1286 43.4547 1.1286C40.9305 1.1286 38.8843 3.16826 38.8843 5.68431C38.8843 8.20036 40.9305 10.24 43.4547 10.24Z" fill="#007FFF"/>
                            <path d="M43.4547 8.56913C45.0531 8.56913 46.3489 7.27756 46.3489 5.68432C46.3489 4.09108 45.0531 2.7995 43.4547 2.7995C41.8563 2.7995 40.5605 4.09108 40.5605 5.68432C40.5605 7.27756 41.8563 8.56913 43.4547 8.56913Z" fill="white"/>
                            <path d="M137.717 132.611H60.4757C59.9607 132.61 59.4669 132.406 59.1028 132.043C58.7386 131.68 58.5338 131.188 58.5332 130.675V38.4214C58.5338 37.9081 58.7386 37.416 59.1028 37.053C59.4669 36.69 59.9607 36.4858 60.4757 36.4853H137.717C138.232 36.4859 138.725 36.69 139.089 37.053C139.454 37.416 139.658 37.9081 139.659 38.4214V130.675C139.658 131.188 139.454 131.68 139.089 132.043C138.725 132.406 138.232 132.61 137.717 132.611Z" fill="#C6CFDC" fill-opacity="0.5"/>
                            <path d="M102.181 31.9296H54.0768C53.0469 31.931 52.0596 32.3395 51.3314 33.0654C50.6031 33.7912 50.1934 34.7754 50.1919 35.8019V128.693L50.6489 128.554V35.8019C50.65 34.8961 51.0115 34.0276 51.6542 33.3871C52.2968 32.7466 53.168 32.3862 54.0768 32.3851H102.323L102.181 31.9296ZM144.115 31.9296H54.0768C53.0469 31.931 52.0596 32.3395 51.3314 33.0654C50.6031 33.7912 50.1934 34.7754 50.1919 35.8019V140.128C50.1934 141.154 50.6031 142.138 51.3314 142.864C52.0596 143.59 53.0469 143.999 54.0768 144H144.115C145.145 143.999 146.132 143.59 146.86 142.864C147.589 142.138 147.998 141.154 148 140.128V35.8019C147.998 34.7754 147.589 33.7912 146.86 33.0654C146.132 32.3395 145.145 31.931 144.115 31.9296ZM147.543 140.128C147.542 141.034 147.18 141.902 146.538 142.542C145.895 143.183 145.024 143.543 144.115 143.544H54.0768C53.168 143.543 52.2968 143.183 51.6542 142.542C51.0115 141.902 50.65 141.034 50.6489 140.128V35.8019C50.65 34.8961 51.0115 34.0276 51.6542 33.3871C52.2968 32.7466 53.168 32.3862 54.0768 32.3851H144.115C145.024 32.3862 145.895 32.7466 146.538 33.3871C147.18 34.0276 147.542 34.8961 147.543 35.8019V140.128Z" fill="#C6CFDC"/>
                            <path d="M120.12 41.9521H78.0718C77.5266 41.9515 77.0038 41.7353 76.6182 41.351C76.2326 40.9666 76.0158 40.4456 76.0151 39.902V29.8795C76.0158 29.336 76.2326 28.8149 76.6182 28.4305C77.0038 28.0462 77.5266 27.83 78.0718 27.8294H120.12C120.665 27.83 121.188 28.0462 121.574 28.4305C121.959 28.8149 122.176 29.336 122.177 29.8795V39.902C122.176 40.4456 121.959 40.9666 121.574 41.351C121.188 41.7353 120.665 41.9515 120.12 41.9521Z" fill="#007FFF"/>
                            <path d="M99.0959 28.5128C101.62 28.5128 103.666 26.4731 103.666 23.9571C103.666 21.441 101.62 19.4014 99.0959 19.4014C96.5717 19.4014 94.5254 21.441 94.5254 23.9571C94.5254 26.4731 96.5717 28.5128 99.0959 28.5128Z" fill="#007FFF"/>
                            <path d="M99.0959 26.7319C100.633 26.7319 101.88 25.4896 101.88 23.9571C101.88 22.4246 100.633 21.1822 99.0959 21.1822C97.5584 21.1822 96.312 22.4246 96.312 23.9571C96.312 25.4896 97.5584 26.7319 99.0959 26.7319Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_14_822">
                            <rect width="148" height="144" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <div>
                            <p class="no-task-message" role="alert">You have no tasks listed</p>
                            <button class="create-task__btn" @click=${this.openNewTaskDialog}>
                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5 1V13" stroke="#007FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M14 7H1" stroke="#007FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Create task
                            </button>
                            </div>
                        </div>
                    `
                }

                <create-task ${ref(this.createTaskDialogRef)} @create-task=${this.onCreateTask}></create-task>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'task-overview': TaskOverview
    }
  }