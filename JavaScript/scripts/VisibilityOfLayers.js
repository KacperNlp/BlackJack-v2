const HIDDEN_CLASS = 'hidden';
export const HIDDEN_LAYER = false;
export const VISIBLE_LAYER = true;

class VisibilityOfLayers{

    changeVisibility(layer, isHidden) {
        if(isHidden){
            layer.classList.remove(HIDDEN_CLASS);
        }else{
            layer.classList.add(HIDDEN_CLASS);
        }
    }

}

export const visibilityOfLayers = new VisibilityOfLayers();