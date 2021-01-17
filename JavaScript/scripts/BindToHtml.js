export class BindToHtml{
    constructor(id){
        this.layer = this.bindById(id);
    }

    bindById(id){
        return document.getElementById(id)
    }

    bindElementsBySelector(selector){
        return document.querySelectorAll(selector)
    }
}