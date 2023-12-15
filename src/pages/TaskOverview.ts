import { LitElement, css, html } from "lit";

import { GLOBAL_STYLES } from "../styles";
import { customElement } from "lit/decorators.js";

@customElement('task-overview')
export class TaskOverview extends LitElement {

    constructor() {
        super()
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

        .task__search{
            display: flex;
            gap: 8px;
            align-items: center;
            background-color: var(--tl-paleWhite);
            border-radius: 12px;
            height: 34px;
            padding: 10px; 
            
        }
        .task-search-input {
            height: 100%;
            appearance: none;
            border: none;
            height: 22px;
            background-color: transparent;
        }

        .task-search-input::placeholder {
            color: #C6CFDC;
        }
    `;

    protected render() {
        return html`
            <div class="top-bar">
                <div class="user__messages">
                    <p>Welcome, <span class="user__name">John</span>.</p>
                    <p class="user__waiting-tasks">You've got 7 tasks to do.</p>
                </div>

                <div class="task__search">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.53425 11.5476C7.23668 11.5476 7.89662 11.4157 8.51407 11.152C9.13153 10.8883 9.67534 10.5236 10.1455 10.0579C10.6157 9.58653 10.9839 9.04506 11.2501 8.43346C11.522 7.82185 11.658 7.16816 11.658 6.47238C11.658 5.77661 11.522 5.12292 11.2501 4.51131C10.9839 3.8997 10.6157 3.36104 10.1455 2.89532C9.67534 2.4296 9.13153 2.06488 8.51407 1.80116C7.89662 1.53183 7.23668 1.39716 6.53425 1.39716C5.83183 1.39716 5.17189 1.53183 4.55443 1.80116C3.93698 2.06488 3.39033 2.4296 2.9145 2.89532C2.44433 3.36104 2.07612 3.8997 1.80988 4.51131C1.54364 5.12292 1.41052 5.77661 1.41052 6.47238C1.41052 7.16816 1.54364 7.82185 1.80988 8.43346C2.07612 9.04506 2.44433 9.58653 2.9145 10.0579C3.39033 10.5236 3.93698 10.8883 4.55443 11.152C5.17189 11.4157 5.83183 11.5476 6.53425 11.5476ZM6.53425 12.9448C5.63356 12.9448 4.78952 12.7764 4.00212 12.4398C3.21473 12.1031 2.5208 11.6374 1.92034 11.0426C1.31988 10.4478 0.849708 9.76048 0.509825 8.98054C0.169942 8.2006 0 7.36455 0 6.47238C0 5.58022 0.169942 4.74417 0.509825 3.96423C0.849708 3.17868 1.31988 2.49132 1.92034 1.90216C2.5208 1.30738 3.21473 0.841662 4.00212 0.504997C4.79519 0.168332 5.63923 0 6.53425 0C7.43494 0 8.27899 0.168332 9.06638 0.504997C9.85378 0.841662 10.5477 1.30738 11.1482 1.90216C11.7486 2.49693 12.2188 3.18429 12.5587 3.96423C12.8986 4.74417 13.0685 5.58022 13.0685 6.47238C13.0685 7.36455 12.8986 8.2006 12.5587 8.98054C12.2188 9.76048 11.7486 10.4478 11.1482 11.0426C10.5477 11.6374 9.85378 12.1031 9.06638 12.4398C8.27899 12.7764 7.43494 12.9448 6.53425 12.9448ZM15.0568 16C14.9265 16 14.8019 15.9776 14.683 15.9327C14.564 15.8878 14.4564 15.8176 14.3601 15.7223L9.84811 11.253L11.2416 9.91478L15.7281 14.3672C15.8244 14.457 15.8924 14.5608 15.932 14.6786C15.9773 14.7964 16 14.9171 16 15.0405C16 15.2201 15.9575 15.38 15.8725 15.5203C15.7932 15.6661 15.6828 15.7812 15.5412 15.8653C15.3995 15.9551 15.2381 16 15.0568 16Z" fill="#C6CFDC"/>
                    </svg>
                    <input type="text" placeholder="Search" class="task-search-input" >
                </div>
            </div>
        
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'task-overview': TaskOverview
    }
  }