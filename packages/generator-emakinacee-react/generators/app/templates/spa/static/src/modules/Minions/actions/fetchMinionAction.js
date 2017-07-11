const fetchApiMinion = ({props, state}) => {
    const availableMinions = state.get('minions.available') || [];

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                apiMinion: {
                    id: availableMinions + 1,
                    name: props.name
                }
            });
        }, 1000);
    });
};

export default fetchApiMinion;
