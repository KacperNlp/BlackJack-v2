class Animation{
    inputAnimation(layerId) {
        const timeline = gsap.timeline();

        timeline
            .set(layerId, {opacity:0, y:100})
            .to(layerId, .5, {opacity:1, y:50})
    }

    outputAnimation(layerId) {
        const timeline = gsap.timeline();

        timeline
            .set(layerId, {opacity:1, y:0})
            .to(layerId, .5, {opacity:0, y:100});
    }
}

export const animation = new Animation();