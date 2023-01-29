// import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import React from 'react';
import styled from 'styled-components';
import Input, { InputProps } from '..';
import { TextError } from '../ValidateInput';

export interface PlusAndMinusInputProps
  extends Omit<InputProps, 'type' | 'placeHolder'> {
  errors?: string;
  handleMinus?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handlePlus?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PlusAndMinusInput = React.forwardRef<HTMLInputElement, PlusAndMinusInputProps>(
  (props, ref) => {
    const { errors, ...rest } = props;
    return (
      <>
        <Input
          type="number"
          noMargin={false}
          placeHolder={''}
          name="subTitle"
          className={'w-full'}
          variant={'plusAndMinus'}
          // iconAfter={
          //   <Button size="44x44" onClick={props.handleMinus}>
          //     <Icon icon="minus" color="white" />
          //   </Button>
          // }
          // iconBefore={
          //   <Button size="44x44" onClick={props.handlePlus}>
          //     <Icon icon="plus" width={16} height={16} color="white" />
          //   </Button>
          // }
          ref={ref}
          {...rest}
        />
        {errors && <TextError>{errors}</TextError>}
      </>
    );
  },
);

export default PlusAndMinusInput;
