import React from 'react';
import { Checkbox } from '@mui/material';
import set from 'lodash/set';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      set(resolvedRef, 'current.indeterminate', indeterminate);
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    );
  },
);

export default React.memo(IndeterminateCheckbox);
