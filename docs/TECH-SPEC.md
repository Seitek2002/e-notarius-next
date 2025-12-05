# E-Notariat — Техническое задание (v0.1)

Дата: 2025-12-05
Владелец: Frontend (Next.js) · Backend (Node/Nest) · PM/Tech Lead

## 1. Короткое описание проекта
E-Notariat — веб‑приложение для онлайн‑оформления нотариальных действий. Основные роли: Гражданин (citizen/client) и Нотариус (notary). Гражданин создаёт пошаговую заявку (wizard), прикладывает файлы, получает и скачивает готовый документ. Нотариус просматривает заявки, редактирует/подтверждает/отклоняет, создаёт нотариальные действия на основании шаблонов.

## 2. Цели
- Реализовать рабочий прототип уровня Middle: чистая архитектура, читаемый код, расширяемость.
- Корректно реализовать роли/авторизацию.
- Надёжная генерация и скачивание документов (PDF).
- Микро UI‑kit для повторного использования.
- Удобные таблицы, фильтры, пагинация; мульти‑step формы с валидацией и автосохранением.

## 3. Технологический стек (рекомендуемый)
Frontend: Next.js (App Router) + TypeScript
State: React Query (TanStack Query) + Zustand (локальный UI/сессионный state)
Формы: React Hook Form + Zod (валидация)
Стили: TailwindCSS или CSS Modules/SCSS
HTTP: axios с централизованным instance
Таблицы: TanStack Table / headless подход
Документы: backend генерирует PDF; фронт — preview через blob/iframe
Backend: Node.js + NestJS/Express + PostgreSQL (+Prisma)
Auth: JWT в httpOnly cookie (refresh token flow)
CI/CD: GitHub Actions/GitLab CI (lint, tests, build, deploy)
Тесты: Jest + React Testing Library; E2E: Playwright (опционально)

## 4. Пользователи и роли
- Guest — просмотр инфо, вход/регистрация
- Citizen — создаёт заявки (Wizard), управляет файлами/шаблонами, скачивает документы
- Notary — реестр заявок, изменение статуса, генерация документов, шаблоны
- Admin — админский доступ (в перспективе)

## 5. Ключевые сценарии (User Stories, acceptance criteria)
1) Как гражданин, хочу пошагово заполнить заявку → получить документ
- Шаги: выбор объекта → выбор документа → личные данные стороны 1 → сторона 2 → доп. данные → подтверждение/preview
- Валидация на каждом шаге; автосохранение черновика
- На финальном шаге — preview документа и Download

2) Как гражданин, хочу сохранять черновики и продолжать позже
- Черновики сохраняются на backend; доступны в «Мои заявки»

3) Как гражданин, хочу загружать файлы
- Multi-file, превью, валидация формата/размера

4) Как нотариус, хочу реестр заявок с фильтрами и сортировкой
- Фильтры по типу документа/статусу/дате/нотариусу; пагинация; row actions (просмотр, назначить, скачать, удалить)

5) Как нотариус, хочу редактировать шаблон и генерировать документы
- Выбрать шаблон, применить поля, сохранить новый шаблон

6) Как пользователь, хочу безопасный вход/выход и роль‑based доступ

## 6. Структура проекта (Feature-Sliced, упрощённо)
```
src/
  app/                      # Next.js app router: layouts + pages
  shared/
    lib/
      api/
        http.ts
    utils/
    ui/                     # микро UI-kit (Button, Input, Table, ...)
    types/
    hooks/
  entities/
    user/
    application/
    document/
    notary/
  features/
    application-wizard/
      ui/
      model/
    document-preview/
    file-upload/
    templates/
  widgets/
    Sidebar/
    Topbar/
    DashboardWidgets/
  styles/
  tests/
```

## 7. Маршрутизация
- / — Dashboard / Overview
- /auth/login, /auth/register
- /citizen/applications — список заявок
- /citizen/applications/new — старт wizard
- /citizen/applications/[id] — просмотр/редактирование/preview
- /citizen/templates, /citizen/files, /citizen/payments, /citizen/chat
- /notary/registry — реестр нотариальных действий
- /notary/actions/[id] — работа с действием
- /admin/*

## 8. State management — стратегия
- React Query: все запросы к серверу (списки, детали, CRUD, справочники), кэширование, оптимистические апдейты, фоновые рефетчи
- Zustand: глобальные UI состояния (user/session, sidebar collapsed, модалки), локальные stores (части wizard вне RHF)
- React Hook Form: управление формами; snapshot черновика на переходах step через mutation

## 9. API — основные endpoints (пример)
Auth
- POST /api/auth/login → { accessToken } (httpOnly cookie)
- POST /api/auth/refresh
- POST /api/auth/logout
- GET /api/auth/me → user

Applications
- GET /api/applications → list + filters + pagination
- GET /api/applications/:id → detail
- POST /api/applications → create (start)
- PATCH /api/applications/:id → update (save step)
- POST /api/applications/:id/submit → submit for notary
- DELETE /api/applications/:id

Templates
- GET /api/templates
- POST /api/templates
- PATCH /api/templates/:id
- DELETE /api/templates/:id
- POST /api/templates/:id/generate → generate doc (PDF blob/URL)

Files
- POST /api/files → upload (multipart/form-data)
- GET /api/files/:id → download
- DELETE /api/files/:id

Notary
- GET /api/notary/registry
- PATCH /api/notary/applications/:id/assign
- PATCH /api/notary/applications/:id/status → approve/reject etc.

## 10. DTO / Типы (TypeScript)
```ts
export type Role = 'guest' | 'citizen' | 'notary' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
}

export type ApplicationStatus =
  | 'draft' | 'submitted' | 'in_process' | 'completed' | 'rejected';

export interface Participant {
  id?: string;
  role?: 'party1' | 'party2' | 'witness' | 'other';
  // поля из PersonSchema
}

export interface FileMeta {
  id: string;
  name: string;
  size: number;
  mime: string;
  url?: string;
}

export interface Application {
  id: string;
  typeCode: string;
  templateId?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  parties: Participant[];
  files: FileMeta[];
}
```

## 11. Формы и валидация (Zod пример)
```ts
import { z } from 'zod';

export const PersonSchema = z.object({
  lastName: z.string().min(1, 'Введите фамилию'),
  firstName: z.string().min(1, 'Введите имя'),
  patronymic: z.string().optional(),
  identity: z.object({
    type: z.enum(['passport','id']),
    series: z.string().optional(),
    number: z.string().min(1)
  }),
  birthDate: z.string().refine(val => true, 'Неверная дата'),
  citizenship: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().min(5)
});
```

## 12. UI‑kit — рекомендации
- Микро UI‑kit в shared/ui (Button, Input, Select, DatePicker, Modal, Table, Icon, Stepper)
- API‑friendly props (className, size, disabled), aria‑атрибуты, headless/presentational

## 13. Генерация документов — flow
1) Заполнены все поля → фронт собирает финальный payload
2) POST /api/templates/:id/generate → backend возвращает PDF (blob/URL)
3) Фронт: получить blob → показать preview (iframe/object) → кнопка Download
4) Быстрый preview можно делать HTML на фронте (только превью), официальный PDF — бэкенд

## 14. Безопасность и авторизация
- JWT в httpOnly cookie + refresh flow
- Next.js middleware для защиты маршрутов и проверки роли
- Backend: ACL на CRUD операции
- Загрузка файлов: лимиты, типы, сканирование (опционально)
- Rate limit на критичных endpoints

## 15. Производительность / NFR
- SSR/SSG по месту (dashboard — SSR, формы — CSR)
- Lazy‑load тяжёлых UI (editor, pdf preview)
- React Query для кеширования
- Таблицы — серверная пагинация/фильтрация

## 16. Тестирование
- Unit: UI компоненты, helpers, utils (Jest + RTL)
- Integration: критичные флоу (login, create application wizard)
- E2E: happy‑path создания заявки и скачивания PDF (Playwright)

## 17. CI / Code Quality
- Pre‑commit: husky + lint‑staged (prettier, eslint --fix)
- CI pipeline: install → lint → test:unit → build → deploy
- Code review checklist: типизация, тесты, обработка ошибок, производительность

## 18. Документация
- README: запуск, env vars
- Contributing.md: код‑стайл, commit messages
- Архитектурная заметка: почему Zustand+React Query, Zod и т.д.
- API spec (OpenAPI/Swagger) — согласовать с backend

## 19. Roadmap / Milestones
M1. Setup & Core
- Next.js + TS boilerplate
- Tailwind/SCSS, ESLint, Prettier, Husky
- Auth flow (login, me)
- Basic layout: Sidebar, Topbar
- User model + mock API

M2. Applications list + Table
- Реестр заявок (citizen)
- Фильтры, сортировка, пагинация (server‑side)
- Row Actions: view, edit, delete, download

M3. Wizard (citizen)
- 6 шагов с RHF + Zod
- Автосохранение черновика (mutation)
- Preview → request generate PDF (mock)

M4. File Upload & Templates
- Загрузка файлов и хранение метаданных
- Страница шаблонов, выбор шаблона

M5. Notary flows
- Реестр нотариуса, просмотр заявки, изменение статуса, назначение
- Генерация финального PDF

M6. Polishing
- Tests, accessibility, responsive, i18n (ru/ky)
- CI/CD, docs

## 20. Acceptance criteria (Wizard)
- Валидация на каждом шаге; нельзя перейти при ошибках
- Черновик сохраняется каждые N минут и при переходе step→step
- При сабмите на backend уходит полный валидный payload
- PDF генерируется и доступен к скачиванию
- UI валиден desktop/mobile

## 21. Конкретные задачи для фронтенда (итеративно)
- Создать репозиторий и инициализировать Next.js + TS
- Настроить ESLint/Prettier и Husky
- Добавить структуру папок (см. выше)
- Сделать общие компоненты (Button, Input, Select, Modal, Table)
- Настроить axios instance и mock server (msw или json-server)
- Реализовать auth flow (login → /citizen/applications)
- Реализовать таблицу заявок с react-query
- Сделать wizard: шаг Person полностью (zod/schema + autosave)
- Реализовать upload файлов
- Покрыть unit‑тестами Button/Input и форму шага

## 22. UX рекомендации
- Делить длинные формы на обязательные и опциональные; показывать прогресс
- Для «паспорт» — опциональная проверка внешними API
- Для нотариуса — quick actions (approve/reject), комментарии, фильтр по назначенным
- i18n: использовать next‑i18next или аналог

## 23. Опциональные «pro» фичи
- PWA / offline черновики
- Подпись документов (e‑signature)
- Интеграции с внешними базами
- Analytics (воронка по заявкам)
- Audit log действий нотариуса

---

## Организационные практики (менторинг)

### Бранч‑стратегия
- trunk‑based (main + короткие feature/* ветки) или GitFlow для релизов
- PR обязательны, CI на PR (lint/tests/build)

### Коммиты и PR
- Conventional Commits (feat|fix|chore|refactor|test|docs)
- Небольшие PR (< 400 строк), описание: цель, изменения, скрины

### Env и конфигурация
- .env.local для фронта (NEXT_PUBLIC_*), .env для бэкенда
- Переменные: API_BASE_URL, AUTH_COOKIE_NAME, SENTRY_DSN (опц.), FEATURE_FLAGS

### Error handling/UX
- Централизованный http instance: перехватчики ошибок, refresh‑flow
- Toast/inline ошибки форм, retry/rollback для мутаций

### Качество
- ESLint + Prettier + Type‑checked CI
- Обязательные unit для UI‑кита, интеграционные для ключевых фич

### DoD (Definition of Done)
- Типизация полная, тесты пройдены, сценарии покрыты, перформанс не деградировал, дока обновлена

### Labels/Issues
- type: feature/bug/chore/docs · area: auth/wizard/table · priority: P0‑P3

### Открытые вопросы/допущения
- Форматы шаблонов документов и заполняемых полей — уточнить
- Требования к хранению файлов (S3/локально), лимиты и антивирус — уточнить
- Юридические требования к подписи/логам — уточнить

## Следующие шаги (предложение)
1) Подтвердить стек/арх и роли
2) Завести базовые tickets по M1
3) Настроить CI (lint/test/build), husky + lint‑staged
4) Реализовать auth (login/me, guard middleware)
5) Начать Applications list (citizen) с серверной пагинацией
