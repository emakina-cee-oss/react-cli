import {state} from 'cerebral/tags';
import {set} from 'cerebral/operators';

export default {
    state: {
        $loading: true
    },
    signals: {
        bootstrap: [
            set(state`app.$loading`, false)
        ],
        routed: [
            set(state`app.$selectedView`, 'Home')
        ]
    }
};
