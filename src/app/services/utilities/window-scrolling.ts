import {Injectable} from '@angular/core';

@Injectable()
export class WindowScrolling {

    private styleTag: HTMLStyleElement;

    constructor() {
        this.styleTag = this.buildStyleElement();
    }

    // ---
    // PUBLIC METHODS.
    // ---
    // I disable the scrolling feature on the main viewport.
    public disable() : void {

        document.body.appendChild( this.styleTag );

    }


    // I re-enable the scrolling feature on the main viewport.
    public enable() : void {

        document.body.removeChild( this.styleTag );

    }

    // ---
    // PRIVATE METHODS.
    // ---
    // I build and return a Style element that will prevent scrolling on the body.
    private buildStyleElement() : HTMLStyleElement {

        var style = document.createElement( "style" );

        style.type = "text/css";
        style.setAttribute( "data-debug", "Injected by WindowScrolling service." );
        style.textContent = `
            body {
                overflow: hidden !important ;
            }
        `;

        return( style );

    }

}