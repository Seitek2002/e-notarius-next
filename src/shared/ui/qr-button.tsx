import { FC } from 'react';
import Image from 'next/image';

type TProps = {
  src: string;
};

export const QrButton: FC<TProps> = ({ src }) => {
  return (
    <div>
      <Image src={src} alt='qr-code' />
    </div>
  );
};
