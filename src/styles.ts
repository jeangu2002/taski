import { css } from "lit";

export const GLOBAL_STYLES = css`
    *,
    *::before,
    *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    }

    button {
        border: none;
        background-color: transparent;
    }

    button:hover {
        cursor: pointer;
    }

    input[type=text]::placeholder {
        color: var(--tl-mutedAzure);
    }
    input[type=text] {
        border: none;
        appearance: none;
        height: 22px;
        background-color: transparent;
        outline:none;
    }

    .container {
        width: 100%;
    }

    /* UTILITIES */
    /* note: always use block comments otherwise lit ignores the rules */
    .strike-through {
        text-decoration: line-through !important;
    }

    @media screen and (min-width: 1000px){
        .container {
            width: 100%;
            max-width: 1024px;
        }
    }
`;

export const COLORS = {
    white: '#ffffff',
    slateBlue: '#8D9CB8'
}