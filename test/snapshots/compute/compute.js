import { compute } from 'cerebral';
import { state } from 'cerebral/tags'

/**
 * TEST COMPUTE
 */
const testCompute = compute(
    state`foo`,
    (foo) => {
        return `${foo}bar`;
    }
);

export default testCompute;
