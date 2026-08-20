// Figma id=345:2988 "Section_Monitoring" (/support).
export interface MonitoringItem {
  icon: string;
  title: string;
  description: string;
}

export const MONITORING_OVERLINE = "Непрерывный контроль";
export const MONITORING_HEADING = "Что мониторим 24/7";
export const MONITORING_SUBTITLE =
  "Мы следим за здоровьем вашей инфраструктуры в реальном времени, предотвращая инциденты до их возникновения.";
export const MONITORING_ALERT_TEXT = "Получаете уведомления раньше, чем клиенты замечают проблему";

export const MONITORING_ITEMS: MonitoringItem[] = [
  {
    icon: "/images/support/icons/server.svg",
    title: "Серверы",
    description: "Uptime, нагрузка и доступность 99.9%",
  },
  {
    icon: "/images/support/icons/zap.svg",
    title: "Скорость загрузки",
    description: "Lighthouse и Core Web Vitals аудит",
  },
  {
    icon: "/images/support/icons/lock.svg",
    title: "SSL-сертификаты",
    description: "Контроль сроков и корректности",
  },
  {
    icon: "/images/support/icons/database.svg",
    title: "Резервные копии",
    description: "Ежедневная проверка целостности",
  },
  {
    icon: "/images/support/icons/shield-check.svg",
    title: "Безопасность",
    description: "Защита от DDoS и сканирование атак",
  },
  {
    icon: "/images/support/icons/cpu.svg",
    title: "Ресурсы",
    description: "Мониторинг CPU, RAM и дисков",
  },
  {
    icon: "/images/support/icons/share-2.svg",
    title: "Работоспособность",
    description: "Проверка ответов внешних сервисов",
  },
  {
    icon: "/images/support/icons/file-text.svg",
    title: "Логи ошибок",
    description: "Runtime мониторинг PHP/JS ошибок",
  },
];
