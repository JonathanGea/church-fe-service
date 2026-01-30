export interface Link {
  label: string;
  url: string;
}

export interface HomeHero {
  title: string;
  description: string;
  ctaPrimary: Link;
  ctaSecondary?: Link;
  ctaTertiary?: Link;
}

export interface ScheduleSummaryItem {
  day: string;
  title: string;
  time: string;
  location: string;
}

export interface WeeklyTheme {
  title: string;
  dateLabel: string;
  verseText: string;
  verse: string;
  preacher: string;
  location: string;
}

export interface OnlineWorship {
  isLive: boolean;
  embedUrl: string;
  streamUrl?: string;
  channelUrl: string;
  action?: Link;
  quickLinks?: QuickLinkCard[];
}

export interface QuickLinkCard {
  label: string;
  title: string;
  description?: string;
  url: string;
}

export interface HomeContent {
  hero: HomeHero;
  scheduleSummary: ScheduleSummaryItem[];
  weeklyTheme: WeeklyTheme;
  onlineWorship: OnlineWorship;
  quickLinks: QuickLinkCard[];
}

export interface AboutHistory {
  summary: string;
  establishedYear: number;
  serviceArea: string;
  notes: string;
}

export interface AboutHero {
  label: string;
  title: string;
  description: string;
}

export interface AboutLeader {
  role: string;
  name: string;
}

export interface AboutContent {
  hero: AboutHero;
  history: AboutHistory;
  vision: string;
  missions: string[];
  leaders: AboutLeader[];
}

export interface WorshipScheduleItem {
  day: string;
  title: string;
  time: string;
  location: string;
}

export interface LiturgyInfo {
  wartaUrl: string;
}

export interface WorshipWeeklyTheme {
  title: string;
  verse: string;
  preacher: string;
}

export interface WorshipHero {
  label: string;
  title: string;
  description: string;
}

export interface WorshipContent {
  hero: WorshipHero;
  schedule: WorshipScheduleItem[];
  liturgy: LiturgyInfo;
  online: OnlineWorship;
  weeklyTheme: WorshipWeeklyTheme;
}

export interface BulletinItem {
  id: string;
  dateLabel: string;
  theme: string;
  pdfUrl: string;
}

export interface BulletinPayload {
  dateLabel: string;
  theme: string;
  pdfUrl: string;
}

export interface BulletinHero {
  label: string;
  title: string;
  description: string;
}

export interface BulletinThemeSummary {
  title: string;
  verse: string;
  summary: string;
}

export interface BulletinArchive {
  month: string;
  count?: number;
}

export interface BulletinList {
  hero: BulletinHero;
  weekly: BulletinItem;
  latest: BulletinItem[];
  weeklyTheme: BulletinThemeSummary;
  archives: BulletinArchive[];
}

export interface ActivityCta {
  label: string;
  url: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  status: string;
  summary?: string;
  ctaPrimary?: ActivityCta;
  ctaSecondary?: ActivityCta;
}

export interface ActivityPayload {
  title: string;
  category: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  status: string;
  summary?: string;
  highlights?: string[];
  agenda?: string[];
  contactName?: string;
  contactPhone?: string;
  ctaPrimary?: ActivityCta;
  ctaSecondary?: ActivityCta;
}

export interface ActivityCalendarItem {
  dateLabel: string;
  title: string;
  timeLabel: string;
}

export interface ActivityArchive {
  month: string;
}

export interface ActivityFilters {
  months: string[];
  categories: string[];
}

export interface ActivityHero {
  label: string;
  title: string;
  description: string;
}

export interface ActivityContactCta {
  title: string;
  description: string;
  label: string;
  url: string;
}

export interface ActivityList {
  hero: ActivityHero;
  filters: ActivityFilters;
  upcoming: ActivityItem[];
  calendar: ActivityCalendarItem[];
  archives: ActivityArchive[];
  contactCta: ActivityContactCta;
}

export interface ActivityDetail {
  id: string;
  title: string;
  category: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  status: string;
  summary: string;
  highlights: string[];
  agenda: string[];
  contactName: string;
  contactPhone: string;
}

export interface MinistryKategorialItem {
  label: string;
  name: string;
  description: string;
  schedule: string;
}

export interface MinistryFungsionalItem {
  label: string;
  name: string;
  description: string;
}

export interface MinistryHero {
  label: string;
  title: string;
  description: string;
}

export interface MinistrySectionMeta {
  title: string;
  description: string;
}

export interface MinistryCtaSection {
  title: string;
  description: string;
  primaryLink: Link;
  secondaryLink: Link;
  note: string;
}

export interface MinistryContent {
  hero: MinistryHero;
  kategorialSection: MinistrySectionMeta;
  kategorialCta: Link;
  kategorial: MinistryKategorialItem[];
  fungsionalSection: MinistrySectionMeta;
  fungsional: MinistryFungsionalItem[];
  ctaSection: MinistryCtaSection;
}

export type OfferingMethodType = 'TRANSFER' | 'QRIS' | 'ONSITE';

export interface OfferingMethodDetail {
  label: string;
  value: string;
}

export interface OfferingHero {
  label: string;
  title: string;
  description: string;
}

export interface OfferingSectionMeta {
  title: string;
  description: string;
  note?: string;
}

export interface OfferingMethod {
  type: OfferingMethodType;
  title: string;
  details: OfferingMethodDetail[];
  note?: string;
  action?: Link;
}

export interface OfferingConfirmationForm {
  isEnabled: boolean;
  title?: string;
  description?: string;
  contactCta?: Link;
  note?: string;
}

export interface OfferingTransparencyItem {
  label: string;
  url: string;
}

export interface OfferingTransparency {
  isEnabled: boolean;
  title?: string;
  description?: string;
  items: OfferingTransparencyItem[];
}

export interface OfferingInfo {
  hero: OfferingHero;
  methodsSection: OfferingSectionMeta;
  methods: OfferingMethod[];
  guideSection: OfferingSectionMeta;
  guide: string[];
  confirmationForm: OfferingConfirmationForm;
  transparency: OfferingTransparency;
}

export interface ContactOfficeContacts {
  phone: string;
  email: string;
  whatsapp: string;
}

export interface ContactHero {
  label: string;
  title: string;
  description: string;
}

export interface ContactLocationSection {
  title: string;
  description: string;
}

export interface ContactCtaLabels {
  whatsappLabel: string;
  mapLabel: string;
}

export interface ContactMapInfo {
  embedUrl: string;
  mapUrl: string;
}

export interface ContactOfficeHour {
  label: string;
  time: string;
}

export interface PastoralServiceInfo {
  isEnabled: boolean;
  title?: string;
  description?: string;
  ctaLabel: string;
  ctaUrl: string;
}

export interface ContactInfo {
  hero: ContactHero;
  locationSection: ContactLocationSection;
  address: string;
  landmark: string;
  officeContacts: ContactOfficeContacts;
  ctaLabels: ContactCtaLabels;
  map: ContactMapInfo;
  officeHours: ContactOfficeHour[];
  officeHoursNote?: string;
  pastoralService?: PastoralServiceInfo;
}

export interface AlbumItem {
  id?: string;
  title: string;
  count: number;
  tag: string;
}

export interface AlbumPayload {
  title: string;
  count: number;
  tag: string;
}

export interface AlbumPhotoPayload {
  url: string;
  caption?: string;
}

export interface AlbumHero {
  label: string;
  title: string;
  description: string;
}

export interface AlbumList {
  hero: AlbumHero;
  tags: string[];
  selectedTag: string;
  photos: AlbumItem[];
}

export interface AlbumPhoto {
  url: string;
  caption: string;
}

export interface AlbumDetail {
  id: string;
  title: string;
  tag: string;
  photoCount: number;
  photos: AlbumPhoto[];
}
