import { PAGES } from '@/config/pages.config';

import applications from '@assets/icons/nav/applications.svg';
import myTemplates from '@assets/icons/nav/my-templates.svg';
import myFiles from '@assets/icons/nav/my-files.svg';
import chatting from '@assets/icons/nav/chatting.svg';
import myPayments from '@assets/icons/nav/my-payments.svg';
import templates from '@assets/icons/nav/templates.svg';
import reestr from '@assets/icons/nav/notary-actions-registry.svg';
import reestrNotary from '@assets/icons/nav/notaries-registry.svg';
import userGuide from '@assets/icons/nav/user-guide.svg';
import profile from '@assets/icons/nav/profile.svg';

const navs = [
  {
    path: PAGES.APPLICATIONS, // Заявки
    label: 'Заявки',
    icon: applications,
  },
  {
    path: PAGES.MY_TEMPLATES, // Мои шаблоны
    label: 'Мои шаблоны',
    icon: myTemplates,
  },
  {
    path: PAGES.MY_FILES, // Мои файлы
    label: 'Мои файлы',
    icon: myFiles,
  },
  {
    path: PAGES.CHAT, // Переписка
    label: 'Переписка',
    icon: chatting,
  },
  {
    path: PAGES.PAYMENTS, // Мои платежи
    label: 'Мои платежи',
    icon: myPayments,
  },
];

const publicNavs = [
  {
    path: PAGES.TEMPLATES, // Шаблоны (публичные)
    label: 'Шаблоны',
    icon: templates,
  },
  {
    path: PAGES.REGISTRY_ACTIONS, // Реестр нотариальных действий
    label: 'Реестр нотариальных действий',
    icon: reestr,
  },
  {
    path: PAGES.REGISTRY_NOTARIES, // Реестр нотариусов
    label: 'Реестр нотариусов',
    icon: reestrNotary,
  },
  {
    path: PAGES.GUIDES, // Руководства пользователя
    label: 'Руководства пользователя',
    icon: userGuide,
  },
  {
    path: PAGES.PROFILE, // Профиль
    label: 'Профиль',
    icon: profile,
  },
];

export { navs, publicNavs };
