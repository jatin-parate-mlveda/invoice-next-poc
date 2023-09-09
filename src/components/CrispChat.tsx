'use client';
import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('9a70b14e-b8db-48b2-8773-95eb66b91cee');
    Crisp.session.setSegments(['invoicehero'], true);
    Crisp.session.setData({
      storename: new URLSearchParams(window.location.search).get('shop')!,
    });
  });

  return null;
};

export default CrispChat;
