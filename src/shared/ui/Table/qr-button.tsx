import { FC } from 'react';
import Image from 'next/image';

import qrIcon from '@assets/icons/table/qr-icon.svg';

type TProps = {
  src: string;
};

export const QrButton: FC<TProps> = ({ src }) => {
  return (
    <div>
      <Image src={src && qrIcon} alt='qr-code' />
    </div>
  );
};
