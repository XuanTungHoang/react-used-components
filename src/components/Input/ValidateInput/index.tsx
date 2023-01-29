import React from 'react';
import styled from 'styled-components';
import Input, { InputProps } from '..';

export const TextError = styled.p`
  margin: 6px 0;
  color: #bf1650;
  ::before {
    display: inline;
    content: '⚠ ';
  }
`;

export interface ValidateInputProps extends InputProps {
  errors?: string;
}

const ValidateInput = React.forwardRef<HTMLInputElement, ValidateInputProps>(
  (props, ref) => {
    const { errors, ...rest } = props;
    return (
      <>
        <Input ref={ref} {...rest} />
        {errors && <TextError>{errors}</TextError>}
      </>
    );
  },
);

export default ValidateInput;
