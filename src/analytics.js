import * as $ from 'jquery';

function createAnalytics() {
    let counter = 0;
    let isDestroyed = false;
    const listener = () => {
        counter++;
    }
    console.log(counter);
    $(document).on('click', listener);
    return {
        destroy() {
            $(document).off('click', listener);
            isDestroyed = true
        },
        getClicks() {
            if (isDestroyed) {
                return `Analytics is destroyed, Total = ${counter}`
            }
            return counter;
        }
    }
}

window.analytics = createAnalytics();
