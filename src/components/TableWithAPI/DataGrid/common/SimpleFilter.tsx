import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import React, { FC, useRef, useState } from 'react';
import styles from './index.module.scss';

const cx = classNames.bind(styles);
interface SimpleFilterProps {
  onSearch?: (evt: string) => void;
  onClearSortClicked?: () => void;
  defaultValue?: string;
}

const SimpleFilter: FC<SimpleFilterProps> = (props) => {
  const [toggle, setToggle] = useState(!!props.defaultValue);
  const search = useRef<HTMLDivElement>(null);

  const handleOnChange = (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    props.onSearch?.(evt.target.value);
  };

  if (!isFunction(props.onSearch)) return null;

  return (
    <React.Fragment>
      <div className={cx(styles.search, toggle ? styles.open : '')} ref={search}>
        <input
          type="search"
          className={cx(styles['search-box'])}
          id="search-input"
          onChange={handleOnChange}
          placeholder={'Enter Search'}
          defaultValue={props.defaultValue}
        />
        <span
          className={cx(styles['search-button'])}
          onClick={(e) => {
            e.preventDefault();
            setToggle(!toggle);
          }}>
          <span className={cx(styles['search-icon'])}></span>
        </span>
      </div>
      {/* <Input
        type="text"
        id="search-input"
        value={searchValue}
        onChange={handleOnChange}
        size="small"
        placeholder={'Enter Search'}
      /> */}
      {/* <InputGroupAddon addonType="append">
        <Button color="info" onClick={props.onClearSortClicked}>
          <i className="fa fa-refresh" style={{ fontSize: 14 }} /> Reload
        </Button>
      </InputGroupAddon> */}
    </React.Fragment>
  );
};

export default React.memo(SimpleFilter);
