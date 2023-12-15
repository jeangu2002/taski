import { css } from "lit";

export const GLOBAL_STYLES = css`
    *,
    *::before,
    *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    }

    .container {
    width: 100%;
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