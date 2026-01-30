import {
  ActivityDetail,
  ActivityList,
  AlbumList,
  AlbumDetail,
  AboutContent,
  ContactInfo,
  HomeContent,
  MinistryContent,
  OfferingInfo,
  WorshipContent,
  BulletinList,
  Link
} from '../models/content.models';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

const createResult = (errors: string[]): ValidationResult => ({
  isValid: errors.length === 0,
  errors
});

const isBlank = (value: string | null | undefined): boolean =>
  !value || value.trim().length === 0;

const isUrlLike = (value: string | null | undefined): boolean => {
  if (!value) {
    return false;
  }
  const trimmed = value.trim();
  return trimmed.startsWith('/') || /^https?:\/\//i.test(trimmed);
};

const validateLink = (link: Link | undefined, label: string, errors: string[]): void => {
  if (!link) {
    errors.push(`${label} is required.`);
    return;
  }
  if (isBlank(link.label)) {
    errors.push(`${label} label is required.`);
  }
  if (isBlank(link.url)) {
    errors.push(`${label} url is required.`);
  }
};

export const validateHomeContent = (data: HomeContent): ValidationResult => {
  const errors: string[] = [];

  if (isBlank(data.hero?.title)) {
    errors.push('Hero title is required.');
  }
  if (isBlank(data.hero?.description)) {
    errors.push('Hero description is required.');
  }
  validateLink(data.hero?.ctaPrimary, 'Hero primary CTA', errors);
  if (data.hero?.ctaSecondary) {
    validateLink(data.hero.ctaSecondary, 'Hero secondary CTA', errors);
  }
  if (data.hero?.ctaTertiary) {
    validateLink(data.hero.ctaTertiary, 'Hero tertiary CTA', errors);
  }

  if (!data.scheduleSummary?.length) {
    errors.push('Schedule summary is required.');
  } else if (data.scheduleSummary.length > 3) {
    errors.push('Schedule summary must not exceed 3 items.');
  } else {
    data.scheduleSummary.forEach((item, index) => {
      if (isBlank(item.day)) errors.push(`Schedule item ${index + 1} day is required.`);
      if (isBlank(item.title)) errors.push(`Schedule item ${index + 1} title is required.`);
      if (isBlank(item.time)) errors.push(`Schedule item ${index + 1} time is required.`);
      if (isBlank(item.location)) errors.push(`Schedule item ${index + 1} location is required.`);
    });
  }

  if (isBlank(data.weeklyTheme?.title)) errors.push('Weekly theme title is required.');
  if (isBlank(data.weeklyTheme?.dateLabel)) errors.push('Weekly theme date is required.');
  if (isBlank(data.weeklyTheme?.verseText)) errors.push('Weekly theme verse text is required.');
  if (isBlank(data.weeklyTheme?.verse)) errors.push('Weekly theme verse is required.');
  if (isBlank(data.weeklyTheme?.preacher)) errors.push('Weekly theme preacher is required.');
  if (isBlank(data.weeklyTheme?.location)) errors.push('Weekly theme location is required.');

  if (isBlank(data.onlineWorship?.embedUrl)) errors.push('Online worship embed url is required.');
  if (isBlank(data.onlineWorship?.channelUrl)) errors.push('Online worship channel url is required.');
  validateLink(data.onlineWorship?.action, 'Online worship action', errors);
  if (!data.onlineWorship?.quickLinks?.length) {
    errors.push('Online worship quick links are required.');
  } else {
    data.onlineWorship.quickLinks.forEach((link, index) => {
      if (isBlank(link.label)) errors.push(`Online quick link ${index + 1} label is required.`);
      if (isBlank(link.title)) errors.push(`Online quick link ${index + 1} title is required.`);
      if (isBlank(link.url)) errors.push(`Online quick link ${index + 1} url is required.`);
    });
  }

  if (!data.quickLinks?.length) {
    errors.push('Quick links are required.');
  } else {
    data.quickLinks.forEach((link, index) => {
      if (isBlank(link.label)) errors.push(`Quick link ${index + 1} label is required.`);
      if (isBlank(link.title)) errors.push(`Quick link ${index + 1} title is required.`);
      if (isBlank(link.description)) errors.push(`Quick link ${index + 1} description is required.`);
      if (isBlank(link.url)) errors.push(`Quick link ${index + 1} url is required.`);
    });
  }

  return createResult(errors);
};

export const validateAboutContent = (data: AboutContent): ValidationResult => {
  const errors: string[] = [];

  if (isBlank(data.hero?.label)) errors.push('Hero label is required.');
  if (isBlank(data.hero?.title)) errors.push('Hero title is required.');
  if (isBlank(data.hero?.description)) errors.push('Hero description is required.');
  if (isBlank(data.history?.summary)) errors.push('History summary is required.');
  if (!Number.isFinite(data.history?.establishedYear) || data.history.establishedYear <= 0) {
    errors.push('Established year is required.');
  }
  if (isBlank(data.history?.serviceArea)) errors.push('Service area is required.');
  if (isBlank(data.history?.notes)) errors.push('History notes is required.');
  if (isBlank(data.vision)) errors.push('Vision is required.');

  if (!data.missions?.length) {
    errors.push('Missions are required.');
  } else {
    data.missions.forEach((mission, index) => {
      if (isBlank(mission)) errors.push(`Mission ${index + 1} is required.`);
    });
  }

  if (!data.leaders?.length) {
    errors.push('Leaders are required.');
  } else {
    data.leaders.forEach((leader, index) => {
      if (isBlank(leader.role)) errors.push(`Leader ${index + 1} role is required.`);
      if (isBlank(leader.name)) errors.push(`Leader ${index + 1} name is required.`);
    });
  }

  return createResult(errors);
};

export const validateWorshipContent = (data: WorshipContent): ValidationResult => {
  const errors: string[] = [];

  if (isBlank(data.hero?.label)) errors.push('Worship hero label is required.');
  if (isBlank(data.hero?.title)) errors.push('Worship hero title is required.');
  if (isBlank(data.hero?.description)) errors.push('Worship hero description is required.');

  if (!data.schedule?.length) {
    errors.push('Worship schedule is required.');
  } else {
    data.schedule.forEach((item, index) => {
      if (isBlank(item.day)) errors.push(`Schedule item ${index + 1} day is required.`);
      if (isBlank(item.title)) errors.push(`Schedule item ${index + 1} title is required.`);
      if (isBlank(item.time)) errors.push(`Schedule item ${index + 1} time is required.`);
      if (isBlank(item.location)) errors.push(`Schedule item ${index + 1} location is required.`);
    });
  }

  if (isBlank(data.liturgy?.wartaUrl)) {
    errors.push('Liturgy warta url is required.');
  } else if (!isUrlLike(data.liturgy.wartaUrl)) {
    errors.push('Liturgy warta url must be a URL.');
  }
  if (isBlank(data.online?.embedUrl)) errors.push('Online embed url is required.');
  if (isBlank(data.online?.channelUrl)) errors.push('Online channel url is required.');
  if (isBlank(data.weeklyTheme?.title)) errors.push('Weekly theme title is required.');
  if (isBlank(data.weeklyTheme?.verse)) errors.push('Weekly theme verse is required.');
  if (isBlank(data.weeklyTheme?.preacher)) errors.push('Weekly theme preacher is required.');

  return createResult(errors);
};

export const validateBulletinList = (data: BulletinList): ValidationResult => {
  const errors: string[] = [];

  if (isBlank(data.hero?.label)) errors.push('Bulletin hero label is required.');
  if (isBlank(data.hero?.title)) errors.push('Bulletin hero title is required.');
  if (isBlank(data.hero?.description)) errors.push('Bulletin hero description is required.');

  if (isBlank(data.weekly?.id)) errors.push('Weekly bulletin id is required.');
  if (isBlank(data.weekly?.dateLabel)) errors.push('Weekly bulletin date is required.');
  if (isBlank(data.weekly?.theme)) errors.push('Weekly bulletin theme is required.');
  if (isBlank(data.weekly?.pdfUrl)) errors.push('Weekly bulletin pdf url is required.');

  if (isBlank(data.weeklyTheme?.title)) errors.push('Weekly theme title is required.');
  if (isBlank(data.weeklyTheme?.verse)) errors.push('Weekly theme verse is required.');
  if (isBlank(data.weeklyTheme?.summary)) errors.push('Weekly theme summary is required.');

  if (data.latest?.length) {
    data.latest.forEach((item, index) => {
      if (isBlank(item.id)) errors.push(`Latest bulletin ${index + 1} id is required.`);
      if (isBlank(item.dateLabel)) errors.push(`Latest bulletin ${index + 1} date is required.`);
      if (isBlank(item.theme)) errors.push(`Latest bulletin ${index + 1} theme is required.`);
      if (isBlank(item.pdfUrl)) errors.push(`Latest bulletin ${index + 1} pdf url is required.`);
    });
  }

  if (data.archives?.length) {
    data.archives.forEach((item, index) => {
      if (isBlank(item.month)) errors.push(`Archive ${index + 1} month is required.`);
    });
  }

  return createResult(errors);
};

export const validateActivityList = (data: ActivityList): ValidationResult => {
  const errors: string[] = [];

  if (isBlank(data.hero?.label)) errors.push('Activity hero label is required.');
  if (isBlank(data.hero?.title)) errors.push('Activity hero title is required.');
  if (isBlank(data.hero?.description)) errors.push('Activity hero description is required.');

  if (data.upcoming?.length) {
    data.upcoming.forEach((item, index) => {
      if (isBlank(item.id)) errors.push(`Activity ${index + 1} id is required.`);
      if (isBlank(item.title)) errors.push(`Activity ${index + 1} title is required.`);
      if (isBlank(item.category)) errors.push(`Activity ${index + 1} category is required.`);
      if (isBlank(item.dateLabel)) errors.push(`Activity ${index + 1} date is required.`);
      if (isBlank(item.timeLabel)) errors.push(`Activity ${index + 1} time is required.`);
      if (isBlank(item.location)) errors.push(`Activity ${index + 1} location is required.`);
      if (isBlank(item.status)) errors.push(`Activity ${index + 1} status is required.`);
    });
  }

  if (data.calendar?.length) {
    data.calendar.forEach((item, index) => {
      if (isBlank(item.dateLabel)) errors.push(`Calendar item ${index + 1} date is required.`);
      if (isBlank(item.title)) errors.push(`Calendar item ${index + 1} title is required.`);
      if (isBlank(item.timeLabel)) errors.push(`Calendar item ${index + 1} time is required.`);
    });
  }

  if (data.archives?.length) {
    data.archives.forEach((item, index) => {
      if (isBlank(item.month)) errors.push(`Archive ${index + 1} month is required.`);
    });
  }

  if (isBlank(data.contactCta?.title)) errors.push('Contact CTA title is required.');
  if (isBlank(data.contactCta?.description)) errors.push('Contact CTA description is required.');
  if (isBlank(data.contactCta?.label)) errors.push('Contact CTA label is required.');
  if (isBlank(data.contactCta?.url)) errors.push('Contact CTA url is required.');

  return createResult(errors);
};

export const validateActivityDetail = (data: ActivityDetail): ValidationResult => {
  const errors: string[] = [];

  if (isBlank(data.id)) errors.push('Activity detail id is required.');
  if (isBlank(data.title)) errors.push('Activity detail title is required.');
  if (isBlank(data.category)) errors.push('Activity detail category is required.');
  if (isBlank(data.dateLabel)) errors.push('Activity detail date is required.');
  if (isBlank(data.timeLabel)) errors.push('Activity detail time is required.');
  if (isBlank(data.location)) errors.push('Activity detail location is required.');
  if (isBlank(data.status)) errors.push('Activity detail status is required.');
  if (isBlank(data.summary)) errors.push('Activity detail summary is required.');
  if (!data.highlights?.length) errors.push('Activity detail highlights are required.');
  if (!data.agenda?.length) errors.push('Activity detail agenda is required.');
  if (isBlank(data.contactName)) errors.push('Activity contact name is required.');
  if (isBlank(data.contactPhone)) errors.push('Activity contact phone is required.');

  return createResult(errors);
};

export const validateMinistryContent = (data: MinistryContent): ValidationResult => {
  const errors: string[] = [];

  if (isBlank(data.hero?.label)) errors.push('Ministry hero label is required.');
  if (isBlank(data.hero?.title)) errors.push('Ministry hero title is required.');
  if (isBlank(data.hero?.description)) errors.push('Ministry hero description is required.');
  if (isBlank(data.kategorialSection?.title)) errors.push('Kategorial section title is required.');
  if (isBlank(data.kategorialSection?.description)) errors.push('Kategorial section description is required.');
  validateLink(data.kategorialCta, 'Kategorial CTA', errors);

  if (!data.kategorial?.length) {
    errors.push('Ministry kategorial items are required.');
  } else {
    data.kategorial.forEach((item, index) => {
      if (isBlank(item.label)) errors.push(`Kategorial ${index + 1} label is required.`);
      if (isBlank(item.name)) errors.push(`Kategorial ${index + 1} name is required.`);
      if (isBlank(item.description)) errors.push(`Kategorial ${index + 1} description is required.`);
      if (isBlank(item.schedule)) errors.push(`Kategorial ${index + 1} schedule is required.`);
    });
  }

  if (!data.fungsional?.length) {
    errors.push('Ministry fungsional items are required.');
  } else {
    data.fungsional.forEach((item, index) => {
      if (isBlank(item.label)) errors.push(`Fungsional ${index + 1} label is required.`);
      if (isBlank(item.name)) errors.push(`Fungsional ${index + 1} name is required.`);
      if (isBlank(item.description)) errors.push(`Fungsional ${index + 1} description is required.`);
    });
  }

  if (isBlank(data.fungsionalSection?.title)) errors.push('Fungsional section title is required.');
  if (isBlank(data.fungsionalSection?.description)) errors.push('Fungsional section description is required.');
  if (isBlank(data.ctaSection?.title)) errors.push('CTA section title is required.');
  if (isBlank(data.ctaSection?.description)) errors.push('CTA section description is required.');
  validateLink(data.ctaSection?.primaryLink, 'CTA primary link', errors);
  validateLink(data.ctaSection?.secondaryLink, 'CTA secondary link', errors);
  if (isBlank(data.ctaSection?.note)) errors.push('CTA section note is required.');

  return createResult(errors);
};

export const validateOfferingInfo = (data: OfferingInfo): ValidationResult => {
  const errors: string[] = [];

  if (isBlank(data.hero?.label)) errors.push('Offering hero label is required.');
  if (isBlank(data.hero?.title)) errors.push('Offering hero title is required.');
  if (isBlank(data.hero?.description)) errors.push('Offering hero description is required.');
  if (isBlank(data.methodsSection?.title)) errors.push('Offering methods title is required.');
  if (isBlank(data.methodsSection?.description)) errors.push('Offering methods description is required.');

  if (!data.methods?.length) {
    errors.push('Offering methods are required.');
  } else {
    data.methods.forEach((method, index) => {
      if (!method.type) errors.push(`Method ${index + 1} type is required.`);
      if (isBlank(method.title)) errors.push(`Method ${index + 1} title is required.`);
      if (!method.details?.length) {
        errors.push(`Method ${index + 1} details are required.`);
      } else {
        method.details.forEach((detail, detailIndex) => {
          if (isBlank(detail.label)) errors.push(`Method ${index + 1} detail ${detailIndex + 1} label is required.`);
          if (isBlank(detail.value)) errors.push(`Method ${index + 1} detail ${detailIndex + 1} value is required.`);
        });
      }
    });
  }

  if (isBlank(data.guideSection?.title)) errors.push('Offering guide title is required.');
  if (isBlank(data.guideSection?.description)) errors.push('Offering guide description is required.');
  if (isBlank(data.guideSection?.note)) errors.push('Offering guide note is required.');
  if (!data.guide?.length) {
    errors.push('Offering guide is required.');
  } else {
    data.guide.forEach((item, index) => {
      if (isBlank(item)) errors.push(`Guide item ${index + 1} is required.`);
    });
  }

  if (!data.confirmationForm) {
    errors.push('Offering confirmation form is required.');
  } else if (data.confirmationForm.isEnabled) {
    if (isBlank(data.confirmationForm.title)) errors.push('Confirmation title is required.');
    if (isBlank(data.confirmationForm.description)) errors.push('Confirmation description is required.');
    if (isBlank(data.confirmationForm.note)) errors.push('Confirmation note is required.');
    validateLink(data.confirmationForm.contactCta, 'Confirmation contact CTA', errors);
  }

  if (!data.transparency) {
    errors.push('Offering transparency is required.');
  } else if (data.transparency.isEnabled) {
    if (isBlank(data.transparency.title)) errors.push('Transparency title is required.');
    if (isBlank(data.transparency.description)) errors.push('Transparency description is required.');
    if (data.transparency.items?.length === 0) {
      errors.push('Offering transparency items are required when enabled.');
    }
  }

  return createResult(errors);
};

export const validateContactInfo = (data: ContactInfo): ValidationResult => {
  const errors: string[] = [];

  if (isBlank(data.hero?.label)) errors.push('Contact hero label is required.');
  if (isBlank(data.hero?.title)) errors.push('Contact hero title is required.');
  if (isBlank(data.hero?.description)) errors.push('Contact hero description is required.');
  if (isBlank(data.locationSection?.title)) errors.push('Location section title is required.');
  if (isBlank(data.locationSection?.description)) errors.push('Location section description is required.');

  if (isBlank(data.address)) errors.push('Contact address is required.');
  if (isBlank(data.landmark)) errors.push('Contact landmark is required.');
  if (isBlank(data.officeContacts?.phone)) errors.push('Office phone is required.');
  if (isBlank(data.officeContacts?.email)) errors.push('Office email is required.');
  if (isBlank(data.officeContacts?.whatsapp)) errors.push('Office whatsapp is required.');
  if (isBlank(data.ctaLabels?.whatsappLabel)) errors.push('Whatsapp label is required.');
  if (isBlank(data.ctaLabels?.mapLabel)) errors.push('Map label is required.');
  if (isBlank(data.map?.embedUrl)) errors.push('Map embed url is required.');
  if (isBlank(data.map?.mapUrl)) errors.push('Map url is required.');

  if (!data.officeHours?.length) {
    errors.push('Office hours are required.');
  } else {
    data.officeHours.forEach((item, index) => {
      if (isBlank(item.label)) errors.push(`Office hour ${index + 1} label is required.`);
      if (isBlank(item.time)) errors.push(`Office hour ${index + 1} time is required.`);
    });
  }

  if (data.pastoralService?.isEnabled) {
    if (isBlank(data.pastoralService.title)) errors.push('Pastoral title is required.');
    if (isBlank(data.pastoralService.description)) errors.push('Pastoral description is required.');
    if (isBlank(data.pastoralService.ctaLabel)) errors.push('Pastoral CTA label is required.');
    if (isBlank(data.pastoralService.ctaUrl)) errors.push('Pastoral CTA url is required.');
  }

  return createResult(errors);
};

export const validateAlbumList = (data: AlbumList): ValidationResult => {
  const errors: string[] = [];

  if (isBlank(data.hero?.label)) errors.push('Album hero label is required.');
  if (isBlank(data.hero?.title)) errors.push('Album hero title is required.');
  if (isBlank(data.hero?.description)) errors.push('Album hero description is required.');

  if (!data.tags?.length) {
    errors.push('Album tags are required.');
  } else if (!data.tags.includes(data.selectedTag)) {
    errors.push('Selected tag must exist in tags.');
  }

  if (data.photos?.length) {
    data.photos.forEach((item, index) => {
      if (isBlank(item.title)) errors.push(`Album item ${index + 1} title is required.`);
      if (!item.count && item.count !== 0) errors.push(`Album item ${index + 1} count is required.`);
      if (isBlank(item.tag)) errors.push(`Album item ${index + 1} tag is required.`);
    });
  }

  return createResult(errors);
};

export const validateAlbumDetail = (data: AlbumDetail): ValidationResult => {
  const errors: string[] = [];

  if (isBlank(data.id)) errors.push('Album detail id is required.');
  if (isBlank(data.title)) errors.push('Album detail title is required.');
  if (isBlank(data.tag)) errors.push('Album detail tag is required.');
  if (!data.photoCount && data.photoCount !== 0) errors.push('Album detail photo count is required.');

  if (data.photos?.length) {
    data.photos.forEach((photo, index) => {
      if (isBlank(photo.url)) errors.push(`Album photo ${index + 1} url is required.`);
    });
  }

  return createResult(errors);
};
