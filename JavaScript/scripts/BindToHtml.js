export class BindToHtml{
    constructor(id){
        this.layer = this.bindById(id);
    }

    bindById(id){
        return document.getElementById(id)
    }

    bindElementsById(selector){
        return document.querySelectorAll(selector)
    }
}