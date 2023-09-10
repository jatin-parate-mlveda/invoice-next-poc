import { NavigationMenu } from '@shopify/app-bridge-react';

export default function AppNavigationMenu() {
  return (
    <NavigationMenu
      navigationLinks={[
        {
          destination: '/home',
          label: 'Home',
        },
        {
          destination: '/dashboard',
          label: 'Dashboard',
        },
      ]}
      // @ts-ignore
      matcher={(link, location) => link.destination === location.pathname}
    />
  );
}
