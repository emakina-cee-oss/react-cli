import { Compute } from 'cerebral';
import { state } from 'cerebral/tags'

/*
 * TEST COMPUTE
 */
const testCompute = Compute(
    state`foo`,
    (foo) => {
        return `${foo}bar`;
    }
);

export default testCompute;
