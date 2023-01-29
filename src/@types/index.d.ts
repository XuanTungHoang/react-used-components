import './tailwind-types';
import './types';
import { AppColors, TextColor, BgColor, AppBgImage } from '@assets/colors';
import * as yup from 'yup';

// type Prefix<TObject extends object, TPrefix extends string> = `${TPrefix}${keyof TObject}`;

type Opacity =
  | '/[0.1]'
  | '/[0.2]'
  | '/[0.3]'
  | '/[0.4]'
  | '/[0.5]'
  | '/[0.6]'
  | '/[0.7]'
  | '/[0.8]'
  | '/[0.9]';

declare global {
  interface Window {
    lang: any;
    webkit: any;
  }

  type Prefix<T, P extends string, A extends string = ''> = {
    [K in keyof T as K extends string ? `${P}${K}${A}` : never]: T[K];
  };

  type TAppColors = keyof typeof AppColors;

  type TTextColorWithOpacity = keyof Prefix<typeof TextColor, 'text-', Opacity>;
  type TTextColorWithoutOpcity = keyof Prefix<typeof TextColor, 'text-'>;
  type TTextColor = TTextColorWithoutOpcity | TTextColorWithOpacity;

  type TBgColorWithOpacity = keyof Prefix<typeof AppColors, 'bg-', Opacity>;
  type TBgColorWithoutOpcity = keyof Prefix<typeof BgColor, 'bg-'>;
  type TBgColor = TBgColorWithoutOpcity | TBgColorWithOpacity;

  type TBorderColorWithOpacity = keyof Prefix<typeof AppColors, 'border-', Opacity>;
  type TBorderColorWithoutOpcity = keyof Prefix<typeof BgColor, 'border-'>;
  type TBorderColor = TBorderColorWithoutOpcity | TBorderColorWithOpacity;

  type TBgImage = keyof Prefix<typeof AppBgImage, 'bg-'>;

  interface String {
    capitalize(): string;
  }

  interface CRUDComponentProps<T extends unknown> {
    formData: T;
    onChange?: (formData: T) => void;
    files?: { [key: string]: FileList | undefined };
    onChangeFile?: (files: { [key: string]: FileList | undefined }) => void;
    editorState?: any
    onChangeEditorState?: (editorState: { [key: string]: any }) => void;
  
    onClear?: () => void;
    onCancel?: () => void;
    onSubmit?: () => void;
    labelSubmit?: string;
    disabledClear?: boolean;
    disabledSubmit?: boolean;
  
    ableDelete?: boolean;
    ableCreateOrUpdate?: boolean;
  
    schema?: yup.ObjectSchema<any>;
  }
}

window.lang = window.lang || {};

export {};
