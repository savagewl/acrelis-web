// Figma id=352:3255 "Section_Status" (/support).
export interface StatusService {
  name: string;
  status: string;
  uptime: string;
  /** Индекс "яркой" полоски-инцидента среди BARS_COUNT баров, если есть (сверено с Figma —
   * не у каждой строки она есть). */
  incidentBarIndex: number | null;
}

export const BARS_COUNT = 32;

export const STATUS_HEADING = "Статус-страница ваших систем";
export const STATUS_SUBTITLE =
  "Контролируйте uptime и доступность ключевых бизнес-систем в режиме реального времени. Всё честно, открыто и прозрачно.";
export const STATUS_BANNER = "Все системы работают штатно";
export const STATUS_FOOTER_PLAIN = "Каждый клиент получает ";
export const STATUS_FOOTER_ACCENT = "персональную статус-страницу";
export const STATUS_FOOTER_TAIL = " с историей инцидентов и uptime за 90 дней.";

export const STATUS_SERVICES: StatusService[] = [
  { name: "Веб-приложение", status: "Operational", uptime: "99.95%", incidentBarIndex: 18 },
  { name: "База данных", status: "Operational", uptime: "99.99%", incidentBarIndex: null },
  { name: "Платёжный шлюз", status: "Operational", uptime: "100%", incidentBarIndex: null },
  { name: "CDN и статика", status: "Operational", uptime: "99.97%", incidentBarIndex: null },
  { name: "Email-сервис", status: "Operational", uptime: "99.90%", incidentBarIndex: 8 },
];
