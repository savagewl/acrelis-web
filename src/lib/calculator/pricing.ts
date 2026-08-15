// Цены и коэффициенты калькулятора — временные данные (по приложению к ТЗ).
// В проде это должно прийти с бэкенда (ТЗ: "не должны быть жестко зашиты во Frontend"),
// поэтому вся логика ниже читает эти значения из одного места — при переходе на API
// достаточно заменить содержимое констант на фетч, сигнатура calculateTotal не меняется.

export type ProjectTypeId =
  | "mvp"
  | "ecommerce"
  | "corporate-portal"
  | "telegram-product"
  | "ai-solution"
  | "landing"
  | "crm-erp"
  | "web-app"
  | "mobile-app"
  | "custom";

export type DesignOptionId = "has-design" | "no-design";

export type ModuleId =
  | "auth"
  | "admin-panel"
  | "cabinet"
  | "chat"
  | "multilanguage"
  | "loyalty"
  | "subscriptions-billing"
  | "calendar-booking"
  | "gallery-media"
  | "referral"
  | "booking-orders"
  | "geolocation";

export type IntegrationId =
  | "yookassa"
  | "telegram-payments"
  | "stripe"
  | "crypto"
  | "custom";

export type TimelineId = "standard" | "fast" | "urgent";

export const PROJECT_TYPES: Record<
  ProjectTypeId,
  { label: string; basePrice: number | null }
> = {
  mvp: { label: "MVP стартап", basePrice: 30_000 },
  ecommerce: { label: "Интернет-магазин", basePrice: 13_000 },
  "corporate-portal": { label: "Корпоративный портал", basePrice: 20_000 },
  "telegram-product": { label: "Telegram-продукт", basePrice: 20_000 },
  "ai-solution": { label: "AI-решение", basePrice: 10_000 },
  landing: { label: "Лендинг", basePrice: 20_000 },
  "crm-erp": { label: "CRM/ERP", basePrice: 80_000 },
  "web-app": { label: "Веб-приложение", basePrice: 50_000 },
  "mobile-app": { label: "Мобильное приложение", basePrice: 70_000 },
  // "Свой сценарий" — расчёт не производится, только пометка для менеджера.
  custom: { label: "Свой сценарий", basePrice: null },
};

export const DESIGN_OPTIONS: Record<DesignOptionId, { label: string; multiplier: number }> = {
  "has-design": { label: "Есть свой макет", multiplier: 1.0 },
  "no-design": { label: "Макета нет", multiplier: 1.5 },
};

export const MODULES: Record<ModuleId, { label: string; price: number }> = {
  auth: { label: "Регистрация и авторизация", price: 1_000 },
  "admin-panel": { label: "Админ-панель", price: 3_000 },
  cabinet: { label: "Личный кабинет", price: 2_000 },
  chat: { label: "Онлайн-чат / мессенджер", price: 3_000 },
  multilanguage: { label: "Мультиязычность", price: 2_000 },
  loyalty: { label: "Программа лояльности", price: 3_000 },
  "subscriptions-billing": { label: "Подписки и биллинг", price: 4_000 },
  "calendar-booking": { label: "Календарь и запись", price: 2_000 },
  "gallery-media": { label: "Галереи и медиа", price: 1_000 },
  referral: { label: "Реферальная система", price: 2_000 },
  "booking-orders": { label: "Бронирование / заказы", price: 4_000 },
  geolocation: { label: "Геолокация / карты", price: 2_000 },
};

export const INTEGRATIONS: Record<
  IntegrationId,
  { label: string; category: "Платежи" | "CRM" | "Прочее"; price: number | null }
> = {
  yookassa: { label: "ЮKassa", category: "Платежи", price: 2_000 },
  "telegram-payments": { label: "Telegram Payments", category: "Платежи", price: 800 },
  stripe: { label: "Stripe", category: "Платежи", price: 2_000 },
  crypto: { label: "Крипто-платежи", category: "Платежи", price: 3_000 },
  // "по запросу заказчика" — цена не участвует в автоматическом расчёте.
  custom: { label: "Дополнительные интеграции (через API)", category: "Прочее", price: null },
};

export const TIMELINES: Record<TimelineId, { label: string; multiplier: number }> = {
  standard: { label: "Стандарт", multiplier: 1.0 },
  fast: { label: "Ускоренно", multiplier: 1.2 },
  urgent: { label: "Срочно", multiplier: 1.5 },
};

export interface CalculatorSelection {
  projectType: ProjectTypeId | null;
  design: DesignOptionId | null;
  modules: ModuleId[];
  integrations: IntegrationId[];
  timeline: TimelineId | null;
}

export interface CalculatorResult {
  /** null, если "Свой сценарий" — по ТЗ автоматический расчёт не производится */
  total: number | null;
  developmentCost: number | null;
}

// Формула по ТЗ:
// 1. Цена_типа
// 2. Цена_типа × Коэф_дизайна
// 3. + Сумма_модулей + Сумма_интеграций
// 4. × Коэф_сроков = Итого
export function calculateTotal(selection: CalculatorSelection): CalculatorResult {
  const { projectType, design, modules, integrations, timeline } = selection;

  if (!projectType) return { total: null, developmentCost: null };

  const basePrice = PROJECT_TYPES[projectType].basePrice;
  if (basePrice === null) return { total: null, developmentCost: null };

  const designMultiplier = design ? DESIGN_OPTIONS[design].multiplier : 1;
  const afterDesign = basePrice * designMultiplier;

  const modulesSum = modules.reduce((sum, id) => sum + MODULES[id].price, 0);
  const integrationsSum = integrations.reduce((sum, id) => {
    const price = INTEGRATIONS[id].price;
    return sum + (price ?? 0);
  }, 0);

  const developmentCost = afterDesign + modulesSum + integrationsSum;

  const timelineMultiplier = timeline ? TIMELINES[timeline].multiplier : 1;
  const total = developmentCost * timelineMultiplier;

  return { total, developmentCost };
}
