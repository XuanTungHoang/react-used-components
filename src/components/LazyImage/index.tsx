import React, { useEffect, useMemo, useRef, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import './index.scss';
import { mapModifiers } from '../../utils';
import classNames from 'classnames';
import ImagePlaceHolder from '../../assets/images/placeholder-image.png';
import axios from 'axios';

export interface LazyImageProps {
  lazyProps?: LazyImageProps;
}

export interface ImageProps {
  alt: string;
  height: number | string;
  width?: number | string;
  className?: string;
  src?: string;
  style?: React.StyleHTMLAttributes<HTMLImageElement>;
  defaultImage?: string;
  RenderImg?: any;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  ratio?:
    | '1x1'
    | '2x1'
    | '2x3'
    | '3x2'
    | '5x3'
    | '7x5'
    | '8x5'
    | '9x4'
    | '10x7'
    | '4x5'
    | '13x8'
    | '15x8'
    | '16x9'
    | '17x8'
    | '17x7'
    | '17x12'
    | '19x12';
  size?: number | string;
  objectFit?: 'cover' | 'contain';
  imageProps?: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  classNameContainer?: string;
}

const LazyImage: React.FC<LazyImageProps & ImageProps> = ({
  src,
  alt = '',
  style,
  defaultImage,
  RenderImg,
  onClick,
  height,
  width,
  lazyProps,
  className,
  ratio,
  size,
  objectFit = 'cover',
  classNameContainer,
  imageProps,
}) => {
  const [srcImg, setSrcImage] = useState(defaultImage);
  const [loading, setLoading] = useState(true);

  const token = 'anyToken'

  useEffect(() => {
    if (src && token) {
      axios
        .get(src, {
          responseType: 'arraybuffer',
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          if (res.data) {
            const blob = new Blob([res.data], {
              type: 'image/jpeg',
            });
            const objectURL = URL.createObjectURL(blob);
            setSrcImage(objectURL);
            return;
          }
          setSrcImage(src);
        })
        .catch((err) => setSrcImage(defaultImage ?? ImagePlaceHolder));
    }
  }, [src]);

  const handleError = (e:any) => {
    setSrcImage(defaultImage ?? ImagePlaceHolder);
  };

  const propsType = {
    src: srcImg,
    style,
    alt,
    onClick,
    onError: handleError,
    height,
    width,
    className,
  };

  const renderLoading = useMemo(() => {
    if (loading)
      return (
        <img
          src={ImagePlaceHolder}
          alt={propsType.alt}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}
        />
      );
    return null;
  }, [loading]);

  if (RenderImg)
    return (
      <div
        className={classNames('relative', classNameContainer)}
        style={{ height, width }}>
        {renderLoading}
        <LazyLoad height={'100%'} {...lazyProps}>
          <RenderImg {...propsType} />
        </LazyLoad>
      </div>
    );

  if (ratio)
    return (
      <div
        className={classNames('relative', classNameContainer)}
        style={{ height, width }}>
        {renderLoading}
        <LazyLoad
          className={classNames(
            mapModifiers('m-image', ratio, !!size && size.toString()),
            className,
          )}
          height={'100%'}
          onContentVisible={() => {
            setLoading(false);
          }}>
          <div className="m-image-wrapper">
            {propsType.src && (
              <img
                {...propsType}
                alt={propsType.alt}
                className={classNames(
                  propsType.className,
                  objectFit === 'contain' ? `object-contain` : 'object-cover',
                )}
              />
            )}
          </div>
        </LazyLoad>
      </div>
    );

  return (
    <div
      className={classNames('relative', classNameContainer)}
      style={{ height, width }}>
      {renderLoading}
      <LazyLoad
        className={classNames(className)}
        height={'100%'}
        onContentVisible={() => {
          setLoading(false);
        }}>
        <img
          {...propsType}
          alt={propsType.alt}
          style={{ display: loading ? 'none' : 'block' }}
          className={classNames(
            propsType.className,
            objectFit === 'contain' ? `object-contain` : 'object-cover',
          )}
        />
      </LazyLoad>
    </div>
  );
};

const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
  style,
  defaultImage,
  RenderImg,
  onClick,
  height,
  width,
  className,
  ratio,
  size,
  objectFit = 'cover',
  imageProps,
}) => {
  const [srcImg, setSrcImage] = useState(src);

  const token ='anyToken'

  useEffect(() => {
    if (src && token) {
      axios
        .get(src, {
          responseType: 'arraybuffer',
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          if (res.data) {
            const blob = new Blob([res.data], {
              type: 'image/jpeg',
            });
            const objectURL = URL.createObjectURL(blob);
            setSrcImage(objectURL);
            return;
          }
          setSrcImage(src);
        })
        .catch((err) => setSrcImage(defaultImage ?? ImagePlaceHolder));
    }
  }, [src]);

  const handleError = (e: any) => {
    console.log("e --->", e);
    setSrcImage(defaultImage ?? ImagePlaceHolder);
  };

  const propsType = {
    height,
    width,
    src: srcImg,
    style,
    alt,
    onClick,
    onError: handleError,
    ...imageProps,
  };

  if (RenderImg) return <RenderImg {...propsType} />;

  if (ratio)
    return (
      <div
        className={classNames(
          mapModifiers('m-image', ratio, !!size && size.toString()),
          className,
        )}>
        <div className="m-image-wrapper">
          {propsType.src && (
            <img
              {...propsType}
              alt={propsType.alt}
              className={classNames(
                objectFit === 'contain' ? `object-contain` : 'object-cover',
              )}
            />
          )}
        </div>
      </div>
    );

  return (
    <img
      className={classNames(
        objectFit === 'contain' ? `object-contain` : 'object-cover',
        className,
      )}
      {...propsType}
      alt={propsType.alt}
    />
  );
};
const ImageRatio: React.FC<Omit<ImageProps, 'height'>> = ({
  ratio = '1x1',
  size,
  ...props
}) => {
  return <Image ratio={ratio} size={size} height={0} {...props} />;
};

const ImageComponent = {
  LazyImage: React.memo(LazyImage),
  Image: React.memo(Image),
  ImageRatio: React.memo(ImageRatio),
};

export default ImageComponent;
