import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/pt-br';
import mergeDeepRight from 'ramda/src/mergeDeepRight';
import es from './translations/es';
import pt_br from './translations/pt-br';

export type CustomLocale = {
  name: string;
  translations: any;
};

function setDayjsLocale(localeName: string) {
  // All dayjs files are in lowercase and use hypens instead of underscores.
  const standardLocaleName = localeName.toLowerCase().replace('_', '-');
  dayjs.locale(standardLocaleName);
}

/**
 * Function to build localization data for the `TranslationsProvider`.
 *
 * @param locale
 */
export function useLocale(locale: string | CustomLocale) {
  const localeName = typeof locale === 'string' ? locale : locale.name;
  setDayjsLocale(localeName);

  const defaultLocales = { es, pt_BR: pt_br };

  if (typeof locale === 'string') return defaultLocales[locale];
  else {
    const customLocales = mergeDeepRight(defaultLocales, { [localeName]: locale.translations });
    return customLocales[localeName];
  }
}
