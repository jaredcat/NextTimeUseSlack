import {node} from 'prop-types';

const TextRow = ({children}) => <>{children}</>;

TextRow.propTypes = {
    children: node.isRequired
}
export default TextRow;