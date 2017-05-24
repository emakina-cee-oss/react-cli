import {set, push} from 'cerebral/operators';
import {state, props} from 'cerebral/tags';
import fetchMinion from './actions/fetchMinionAction';

export default {
    state: {
        available: [
            {id: 1, name: 'Bob'},
            {id: 2, name: 'Stuart'},
            {id: 3, name: 'Kevin'}
        ]
    },
    signals: {
        addMinionClicked: [
            fetchMinion,
            push(state`minions.available`, props`apiMinion`)
        ],
        routed: [
            set(state`app.$selectedView`, 'Minions')
        ]
    }
};
