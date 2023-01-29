type TailWindText =
  | 'antialiased'
  | 'subpixel-antialiased'
  | 'break-normal'
  | 'break-words'
  | 'break-all'
  | 'truncate'
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'normal-case'
  | 'leading-none'
  | 'leading-tight'
  | 'leading-snug'
  | 'leading-normal'
  | 'leading-relaxed'
  | 'leading-loose'
  | 'leading-3'
  | 'leading-4'
  | 'leading-5'
  | 'leading-6'
  | 'leading-7'
  | 'leading-8'
  | 'leading-9'
  | 'leading-10'
  | 'underline'
  | 'line-through'
  | 'no-underline'
  | 'font-hairline'
  | 'font-thin'
  | 'font-light'
  | 'font-normal'
  | 'font-medium'
  | 'font-semibold'
  | 'font-bold'
  | 'font-extrabold'
  | 'font-black'
  | 'text-2xs'
  | 'text-xs'
  | 'text-sm'
  | 'text-base'
  | 'text-lg'
  | 'text-xl'
  | 'text-2xl'
  | 'text-3xl'
  | 'text-4xl'
  | 'text-5xl'
  | 'text-6xl'
  | 'font-sans'
  | 'font-serif'
  | 'font-mono'
  | 'text-left'
  | 'text-center'
  | 'text-right'
  | 'text-justify'
  | 'italic'
  | 'not-italic'
  | 'whitespace-normal'
  | 'whitespace-no-wrap'
  | 'whitespace-pre'
  | 'whitespace-pre-line'
  | 'whitespace-pre-wrap'
  | 'tracking-tighter'
  | 'tracking-tight'
  | 'tracking-normal'
  | 'tracking-wide'
  | 'tracking-wider'
  | 'tracking-widest';

type TailWindTextStyle = TTextColor | TailWindTextColor;

type TailWindDisplay =
  | 'block'
  | 'hidden'
  | 'inline'
  | 'inline-block'
  | 'inline-flex'
  | 'inline-grid'
  | 'flex'
  | 'grid'
  | 'flow-root';

type TailWindFlexbox =
  | 'flex-wrap'
  | 'flex-wrap-reverse'
  | 'flex-nowrap'
  | 'flex-row'
  | 'flex-row-reverse'
  | 'flex-col'
  | 'flex-col-reverse'
  | 'content-around'
  | 'content-between'
  | 'content-center'
  | 'content-end'
  | 'content-evenly'
  | 'content-start'
  | 'contents'
  | 'flex-nowrap'
  | 'justify-start'
  | 'justify-end'
  | 'justify-center'
  | 'justify-between'
  | 'justify-around'
  | 'justify-evenly'
  | 'justify-items-auto'
  | 'justify-items-center'
  | 'justify-items-end'
  | 'justify-items-start'
  | 'justify-items-stretch'
  | 'justify-self-auto'
  | 'justify-self-center'
  | 'justify-self-end'
  | 'justify-self-start'
  | 'justify-self-stretch'
  | 'items-start'
  | 'items-end'
  | 'items-center'
  | 'items-baseline'
  | 'items-stretch'
  | 'space-x-7'
  | 'space-x-px'
  | 'space-x-reverse'
  | 'space-y-px'
  | 'space-y-reverse';

type TailWindRound =
  | 'rounded-none'
  | 'rounded-sm'
  | 'rounded'
  | 'rounded-md'
  | 'rounded-lg'
  | 'rounded-xl'
  | 'rounded-2xl'
  | 'rounded-3xl'
  | 'rounded-full';

type TailWindOverflow =
  | 'overflow-auto'
  | 'overflow-hidden'
  | 'overflow-clip'
  | 'overflow-visible'
  | 'overflow-scroll'
  | 'overflow-x-auto'
  | 'overflow-y-auto'
  | 'overflow-x-hidden'
  | 'overflow-y-hidden'
  | 'overflow-x-clip'
  | 'overflow-y-clip'
  | 'overflow-x-visible'
  | 'overflow-y-visible'
  | 'overflow-x-scroll'
  | 'overflow-y-scroll';

type TailWindPosition = 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';

type ThemeColors = TTextColor | TBgColor | TBgImage;

type TailWindBorderStyle = TailWindRound | TBorderColor;

type GlobalTailWindClassName =
  | TailWindBorderStyle
  | TailWindDisplay
  | TailWindFlexbox
  | TailWindText
  | TailWindPosition
  | TailWindOverflow
  | ThemeColors;

type Modifiers = GlobalTailWindClassName[] | string[];
