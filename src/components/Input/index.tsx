import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { mapModifiers } from '../../utils';
import PinInput from './PinInput';

export interface InputProps {
  className?: string;
  containerClassName?: string;
  // empty for pin
  placeHolder: string;
  fullWidth?: boolean;
  autocomplete?: 'off';
  type: 'number' | 'text' | 'currency' | 'pin' | 'password';
  // \\d*{1,}/g input phone number , \\d*/g keyboard number
  pattern?: '\\d*{1,}' | '\\d*';
  inputMode?:
    | 'text'
    | 'search'
    | 'numeric'
    | 'none'
    | 'tel'
    | 'url'
    | 'email'
    | 'decimal';
  required?: boolean;
  name?: string;
  autoFocus?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onChangeOTP?: (otp: string | number) => any;
  value?: string | number | readonly string[];
  label?: string;
  fontColor?: ThemeColors;
  labelClass?: string;
  id?: string;
  readOnly?: boolean;
  inputprops?: React.InputHTMLAttributes<HTMLInputElement>;
  iconAfter?: React.ReactNode;
  iconBefore?: React.ReactNode;
  disabled?: boolean;
  noMargin?: boolean;
  borderColor?: TBorderColor;
  borderRadius?: TailWindRound;
  variant?: 'select' | 'plusAndMinus';
  isAccessControlInput?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // Declare same props here
  const sameProps = {
    id: props.id ?? props.name,
    inputMode: props.inputMode,
    ref: ref,
    name: props.name,
    pattern: props.pattern,
    placeholder: props.placeHolder,
    value: props.value,
    onChange: props.onChange,
    onFocus: props.onFocus,
    required: props.required,
    autoComplete: props.autocomplete,
    readOnly: props.readOnly,
    inputprops: props.inputprops,
    disabled: props.disabled,
    autoFocus: props.autoFocus,
  };

  const [hide, setHide] = useState(false);

  const InputDefault = React.useMemo(() => {
    return (
      <div
        className={classNames(props.containerClassName, {
          'w-full': props.fullWidth,
        })}>
        {props.label && (
          <label
            className={classNames(props.fontColor, props.labelClass)}
            htmlFor={props.name}>
            {props.label}
          </label>
        )}
        <div
          className={classNames('relative h-full', {
            'mt-1': props.noMargin,
            'mb-4': props.noMargin,
            'input-fullWidth': props.fullWidth,
          })}>
          <span className={classNames('absolute icon-before', props.fontColor)}>
            {props.iconBefore}
          </span>
          <input
            {...sameProps}
            type={props.type}
            className={classNames(
              'input ',
              mapModifiers('input border'),
              props.borderColor,
              props.borderRadius || 'rounded-lg',
              props.fontColor,
              props.className,
              {
                'input-fullWidth': props.fullWidth,
                'input-select-template': props.variant === 'select',
                'input-plusAndMinus-template': props.variant === 'plusAndMinus',
              },
              props.isAccessControlInput && 'access__control__input',
            )}
          />
          <span className={classNames('absolute icon-after', props.fontColor)}>
            {props.iconAfter}
          </span>
        </div>
      </div>
    );
  }, [props]);

  const CurrencyInput = React.useMemo(() => {
    return (
      <div className={classNames(props.containerClassName)}>
        {props.label && (
          <label
            className={classNames(props.fontColor, props.labelClass)}
            htmlFor={props.name}>
            {props.label}
          </label>
        )}
        <div
          className={classNames('relative h-full', {
            'mt-1': props.noMargin,
            'mb-4': props.noMargin,
            'input-fullWidth': props.fullWidth,
          })}>
          <input
            {...sameProps}
            value={props.value }
            className={classNames(
              'input-currency ',
              mapModifiers('input border'),
              props.borderColor,
              props.borderRadius || 'rounded-lg',
              props.fontColor,
              props.className,
              {
                'input-fullWidth': props.fullWidth,
              },
            )}
            maxLength={20}
          />
          <span className={classNames('absolute icon-after', props.fontColor)}>
            {props.iconAfter ?? 'VNĐ'}
          </span>
        </div>
      </div>
    );
  }, [props]);

  const PasswordInput = React.useMemo(() => {
    return (
      <div className={classNames(props.containerClassName)}>
        {props.label && (
          <label
            className={classNames(props.fontColor, props.labelClass)}
            htmlFor={props.name}>
            {props.label}
          </label>
        )}
        <div
          className={classNames('relative h-full', {
            'mt-1': props.noMargin,
            'mb-4': props.noMargin,
            'input-fullWidth': props.fullWidth,
          })}>
          <input
            {...sameProps}
            type={hide ? 'text' : 'password'}
            onChange={(e) => {
              if (props.inputMode === 'numeric') {
                const re = /^[0-9\b]+$/;
                // if value is not blank, then test the regex
                if (e.target.value === '' || re.test(e.target.value)) {
                  props.onChange?.(e);
                }
              } else {
                props.onChange?.(e);
              }
            }}
            value={props.value}
            className={classNames(
              'input input-password ',
              props.fontColor,
              props.className,
              mapModifiers('input border'),
              props.borderColor,
              props.borderRadius || 'rounded-lg',
              {
                'input-fullWidth': props.fullWidth,
              },
              props.isAccessControlInput && 'access__control__input',
            )}
            maxLength={20}
          />
          <span
            className={classNames('absolute icon-after', props.fontColor)}
            onClick={() => setHide(!hide)}>
            {hide ? (
              <i className="icon icon-eye" />
            ) : (
              <i className="icon icon-eye-slash" />
            )}
          </span>
        </div>
      </div>
    );
  }, [props, hide]);

  const InputPin = React.useMemo(() => {
    return (
      <React.Fragment>
        <PinInput
          {...sameProps}
          placeHolder="."
          pattern="\d*"
          type="pin"
          autoFocus
          autocomplete="off"
          length={6}
          inputClassName={classNames('otpInput', props.fontColor)}
          onChangeOTP={(otp) => props.onChangeOTP?.(otp)}
          className={classNames(
            'otpContainer ',
            mapModifiers('input border'),
            props.borderColor,
            props.borderRadius || 'rounded-lg',
            props.className,
            {
              'input-fullWidth': props.fullWidth,
              'mt-1': props.noMargin,
              'mb-4': props.noMargin,
            },
          )}
        />
      </React.Fragment>
    );
  }, [props]);

  const renderInput = () => {
    switch (props.type) {
      case 'currency':
        return CurrencyInput;
      case 'number':
      case 'text':
        return InputDefault;
      case 'password':
        return PasswordInput;
      case 'pin':
        return InputPin;
      default:
        return InputDefault;
    }
  };

  return renderInput();
});

Input.defaultProps = {
  fontColor: 'text-black',
  labelClass: 'font-normal text-base',
  noMargin: true,
};

export default Input;
