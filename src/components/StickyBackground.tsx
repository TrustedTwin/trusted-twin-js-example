import { ReactNode } from 'react';

import Image from 'next/image';

import backgroundImageDefault from '../../public/assets/background.png';

type IBackgroundProps = {
  backgroundHeightSpacing?: { h: string; top: string };
  backdrop?: string;
  backgroundImage?: StaticImageData;
  children: ReactNode;
  contentBackground?: string;
};

const StickyBackground = ({
  backgroundHeightSpacing = { h: 'h-hero', top: 'top-hero' },
  backdrop = 'bg-gray-700/50',
  backgroundImage = backgroundImageDefault,
  contentBackground = 'bg-white',
  children,
}: IBackgroundProps) => {
  return (
    <div className={`relative ${backgroundHeightSpacing.h}`}>
      <div className={`sticky h-0 top-0 -z-10`}>
        <div className={`relative ${backgroundHeightSpacing.h}`}>
          {
            <Image
              alt=""
              src={backgroundImage}
              layout="fill"
              objectFit="cover"
              quality={100}
              placeholder="blur"
            />
          }
        </div>
      </div>
      <div
        className={`absolute top-0 ${backgroundHeightSpacing.h} w-full ${backdrop} text-gray-100`}
      >
        {children}
      </div>
      <div
        className={`absolute ${backgroundHeightSpacing.top} ${backgroundHeightSpacing.h} w-full ${contentBackground} -z-10`}
      />
    </div>
  );
};

export { StickyBackground };
