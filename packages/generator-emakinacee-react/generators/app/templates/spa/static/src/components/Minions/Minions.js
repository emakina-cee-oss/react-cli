import React from 'react';
import {connect} from 'cerebral/react';
import {state, signal} from 'cerebral/tags';
import './Minions.scss';

const Minions = ({addMinionClicked, availableMinions}) => {
    return (
        <div className="c-minions">
            <a href="/">Back to Home</a>
            <button onClick={() => addMinionClicked({name: 'Charlie'})}>Add a Minion</button>
            <ul>
                {availableMinions.map((minion) =>
                    <li key={minion.id}>{minion.name}</li>
                )}
            </ul>
        </div>
    );
};

export default connect({
    addMinionClicked: signal`minions.addMinionClicked`,
    availableMinions: state`minions.available`
}, Minions);
