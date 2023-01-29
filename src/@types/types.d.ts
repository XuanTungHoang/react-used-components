type Option = {
  id: string;
  label: string;
  value: string;
};

type WithChildren<T = {}> = T & { children?: React.ReactNode };
type WithClassName<T = {}> = T & {
  className?: Partial<string | GlobalTailWindClassName>;
};

