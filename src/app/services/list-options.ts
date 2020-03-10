export const LICENSES: Array<any> = [
   { value: 'all-rights-reserved', text: 'All rights reserved' },
   { value: 'attribution-cc', text: 'Attribution CC BY' },
   { value: 'attribution-sharealike-cc', text: 'Attribution-ShareAlike BY-SA' },
   { value: 'attribution-noderivs-cc', text: 'Attribution-NoDerivs CC BY-ND' },
   { value: 'attribution-noncommercial-cc', text: 'Attribution-NonCommerical CC BY-NC' },
   { value: 'attribution-noncommercial-sharealike-cc', text: 'Attribution-NonCommerical-ShareAlike CC BY-NC-SA' },
   { value: 'attribution-noncommercial-noderivs-cc', text: 'Attribution-NonCommerical-NoDerivs CC BY-NC-ND' },
   { value: 'publicdomaincco', text: 'Public Domain CCO "No Rights Reserved' },
   { value: 'gnuv3', text: 'GNU v3 General Public License' },
   { value: 'gnuv1.3', text: 'GNU v1.3 Free Documentation License' },
   { value: 'gnu-lgpl', text: 'GNU Lesser General Public License' },
   { value: 'gnu-affero', text: 'GNU Affero General Public License' },
   { value: 'apache-v1', text: 'Apache License, Version 1.0' },
   { value: 'apache-v1.1', text: 'Apache License, Version 1.1' },
   { value: 'apache-v2', text: 'Apache License, Version 2.0' },
   { value: 'mozillapublic', text: 'Mozilla Public License' },
   { value: 'bsd', text: 'BSD License' }
];

export const ACCESS: Array<any> = [
   { value: 0, text: 'Unlisted' },
   { value: 1, text: 'Loggedin' },
   { value: 2, text: 'Public' }
];

export const REASONS: Array<any> = [
   { value: 1, label: 'Illegal' },
   { value: 2, label: 'Should be marked as explicit' },
   { value: 3, label: 'Encourages or incites violence' },
   { value: 4, label: 'Threatens, harasses, bullies or encourages others to do so' },
   { value: 5, label: 'Personal and confidential information' },
   { value: 6, label: 'Maliciously targets users (@name, links, images or videos)' },
   { value: 7, label: 'Impersonates someone in a misleading or deceptive manner' },
   { value: 8, label: 'Spam' },
   { value: 10, label: 'This infringes my copyright' },
   { value: 11, label: 'Another reason' }
];

export const REPORT_REASONS: Array<any> = [
   { value: 1, label: 'Not marked as adult content', description: 'Post shows nudity, sexuality, content not fit for 18 years below, etc.' },
   { value: 2, label: 'Drug Advocacy', description: "We don't encourage the use of drugs. Post showcasing, about or related to drugs." },
   { value: 3, label: 'Child Pornography', description: 'Underage nudity or sexual situation including a minor including selfies, etc.' },
   { value: 4, label: 'Violence or Extremism', description: 'Posts related to violence, radical or extremist, raising concern, promoting hate speech, etc.' },
   { value: 5, label: 'Copyright Violation', description: 'Violation, piracy or theft of a copyright holder’s content, etc.' },
   { value: 6, label: 'Trademark Violation', description: 'Unauthorised use of trademarks or service marks on competing or related goods and services.' },
   { value: 7, label: 'Others', description: 'Inappropriate or disturbing content, hate speech, etc.' }
];

export const PROFILE_REPORT_REASONS: Array<any> = [
   { value: 1, label: 'This person is annoying me', description: 'Constantly trying to make contact against your wish, stalking, commenting on your posts, etc.' },
   { value: 2, label: 'Pretending to be someone I know', description: "Impersonating, using someone else’s content, fake accounts, etc." },
   { value: 3, label: 'Sharing inappropriate or offensive post', description: 'Content that violates other people’s rights, insensitive and insulting in nature, etc.' },
   { value: 4, label: 'Others', description: 'Cyber bullying, abuse, online shaming, intruding your privacy, hate speech, etc.' }
];

export const READABLE_REASONS: Array<any> = [
   { value: 1, label: 'is illegal' },
   { value: 2, label: 'Should be marked as explicit' },
   { value: 3, label: 'Encourages or incites violence' },
   { value: 4, label: 'Threatens, harasses, bullies or encourages others to do so' },
   { value: 5, label: 'contains personal and confidential info' },
   { value: 6, label: 'Maliciously targets users (@name, links, images or videos)' },
   { value: 7, label: 'Impersonates someone in a misleading or deceptive manner' },
   { value: 8, label: 'is spam' },
   { value: 10, label: 'is a copyright infringement' },
   { value: 11, label: 'Another reason' }
];

export const EVENT_TYPES: Array<any> = [
   { value: 'Free‎', label: 'Free‎' },
   { value: 'Paid', label: 'Paid' },

];

export const EVENT_CATEGORY: Array<any> = [
   { value: 'Arts Events‎', label: 'Arts Events‎' },
   { value: 'Award Ceremonies', label: 'Award Ceremonies' },
   { value: 'Ball‎', label: 'Ball‎' },
   { value: 'Concerts', label: 'Concerts' },
   { value: 'Cultural Conferences‎', label: 'Cultural Conferences‎' },
   { value: 'Cultural Festivals', label: 'Cultural Festivals' },
   { value: 'Exhibitions', label: 'Exhibitions' },
   { value: 'Fashion Events‎', label: 'Fashion Events‎' },
   { value: 'Festivals by culture', label: 'Festivals by culture' },
   { value: 'Film Festivals', label: 'Film Festivals' },
   { value: 'Inaugrations‎', label: 'Inaugrations‎' },
   { value: 'Museum Events', label: 'Museum Events' },
   { value: 'Performances', label: 'Performances' },
   { value: 'Technical Events‎', label: 'Technical Events‎' },
   { value: 'Theatre', label: 'Theatre' },
   { value: 'Trade Fairs', label: 'Trade Fairs' }
];

export const CURRENCY: Array<any> = [
   { value: 'USD', label: 'United States Dollars' },
   { value: 'EUR', label: 'Euro' },
   { value: 'GBP', label: 'United Kingdom Pounds' },
   { value: 'DZD', label: 'Algeria Dinars' },
   { value: 'ARP', label: 'Argentina Pesos' },
   { value: 'AUD', label: 'Australia Dollars' },
   { value: 'ATS', label: 'Austria Schillings' },
   { value: 'BSD', label: 'Bahamas Dollars' },
   { value: 'BBD', label: 'Barbados Dollars' },
   { value: 'BEF', label: 'Belgium Francs' },
   { value: 'BMD', label: 'Bermuda Dollars' },
   { value: 'BRR', label: 'Brazil Real' },
   { value: 'BGL', label: 'Bulgaria Lev' },
   { value: 'CAD', label: 'Canada Dollars' },
   { value: 'CLP', label: 'Chile Pesos' },
   { value: 'CNY', label: 'China Yuan Renmimbi' },
   { value: 'CYP', label: 'Cyprus Pounds' },
   { value: 'CSK', label: 'Czech Republic Koruna' },
   { value: 'DKK', label: 'Denmark Kroner' },
   { value: 'NLG', label: 'Dutch Guilders' },
   { value: 'XCD', label: 'Eastern Caribbean Dollars' },
   { value: 'EGP', label: 'Egypt Pounds' },
   { value: 'FJD', label: 'Fiji Dollars' },
   { value: 'FIM', label: 'Finland Markka' },
   { value: 'FRF', label: 'France Francs' },
   { value: 'DEM', label: 'Germany Deutsche Marks' },
   { value: 'XAU', label: 'Gold Ounces' },
   { value: 'GRD', label: 'Greece Drachmas' },
   { value: 'HKD', label: 'Hong Kong Dollars' },
   { value: 'HUF', label: 'Hungary Forint' },
   { value: 'ISK', label: 'Iceland Krona' },
   { value: 'IDR', label: 'Indonesia Rupiah' },
   { value: 'IEP', label: 'Ireland Punt' },
   { value: 'ILS', label: 'Israel New Shekels' },
   { value: 'ITL', label: 'Italy Lira' },
   { value: 'JMD', label: 'Jamaica Dollars' },
   { value: 'JPY', label: 'Japan Yen' },
   { value: 'JOD', label: 'Jordan Dinar' },
   { value: 'KRW', label: 'Korea (South) Won' },
   { value: 'LBP', label: 'Lebanon Pounds' },
   { value: 'LUF', label: 'Luxembourg Francs' },
   { value: 'MYR', label: 'Malaysia Ringgit' },
   { value: 'MXP', label: 'Mexico Pesos' },
   { value: 'NLG', label: 'Netherlands Guilders' },
   { value: 'NZD', label: 'New Zealand Dollars' },
   { value: 'NOK', label: 'Norway Kroner' },
   { value: 'PKR', label: 'Pakistan Rupees' },
   { value: 'XPD', label: 'Palladium Ounces' },
   { value: 'PHP', label: 'Philippines Pesos' },
   { value: 'XPT', label: 'Platinum Ounces' },
   { value: 'PLZ', label: 'Poland Zloty' },
   { value: 'PTE', label: 'Portugal Escudo' },
   { value: 'ROL', label: 'Romania Leu' },
   { value: 'RUR', label: 'Russia Rubles' },
   { value: 'SAR', label: 'Saudi Arabia Riyal' },
   { value: 'XAG', label: 'Silver Ounces' },
   { value: 'SGD', label: 'Singapore Dollars' },
   { value: 'SKK', label: 'Slovakia Koruna' },
   { value: 'ZAR', label: 'South Africa Rand' },
   { value: 'KRW', label: 'South Korea Won' },
   { value: 'ESP', label: 'Spain Pesetas' },
   { value: 'XDR', label: 'Special Drawing Right (IMF)' },
   { value: 'SDD', label: 'Sudan Dinar' },
   { value: 'SEK', label: 'Sweden Krona' },
   { value: 'CHF', label: 'Switzerland Francs' },
   { value: 'TWD', label: 'Taiwan Dollars' },
   { value: 'THB', label: 'Thailand Baht' },
   { value: 'TTD', label: 'Trinidad and Tobago Dollars' },
   { value: 'TRL', label: 'Turkey Lira' },
   { value: 'VEB', label: 'Venezuela Bolivar' },
   { value: 'ZMK', label: 'Zambia Kwacha' },
   { value: 'EUR', label: 'Euro' },
   { value: 'XCD', label: 'Eastern Caribbean Dollars' },
   { value: 'XDR', label: 'Special Drawing Right (IMF)' },
   { value: 'XAG', label: 'Silver Ounces' },
   { value: 'XAU', label: 'Gold Ounces' },
   { value: 'XPD', label: 'Palladium Ounces' },
   { value: 'XPT', label: 'Platinum Ounces' }
];

export const ORGANIZATION_TYPE: Array<any> = [
   {
      value: 'Education - University / Academy / School / College',
      label: 'Education - University / Academy / School / College'
   },
   {
      value: 'Non Profit / Foundation',
      label: 'Non Profit / Foundation'
   },
   {
      value: 'Museum / Gallery / Librarie',
      label: 'Museum / Gallery / Libraries'
   },
   {
      value: 'Theatre / Venue / Stadium Studio / Fitness Centre',
      label: 'Theatre / Venue / Stadium Studio / Fitness Centre'
   },
   {
      value: 'Production House / Play Production',
      label: 'Production House / Play Production'
   },
   {
      value: 'Band / Artist Group',
      label: 'Band / Artist Group'
   },
   {
      value: 'Club / Association / Union',
      label: 'Club / Association / Union'
   },
   {
      value: 'Media / Broadcasting',
      label: 'Media / Broadcasting'
   },
   {
      value: 'Brands / Business / Retailer',
      label: 'Brands / Business / Retailer'
   },
   {
      value: 'Internet - Online Market Place / Social Media',
      label: 'Internet - Online Market Place / Social Media'
   },
   {
      value: 'Location / Landmark',
      label: 'Location / Landmark'
   },
   {
      value: 'Festivals / Awards',
      label: 'Festivals / Awards'
   },
   {
      value: 'Research & Developement / Science / Technology',
      label: 'Research & Developement / Science / Technology'
   },
   {
      value: 'Corporate / Industrial Company',
      label: 'Corporate / Industrial Company'
   },
   {
      value: 'Others',
      label: 'Others'
   }
]

export const REPORT_ACTIONS = {
   'explicit': 'Marked as Explicit',
   'spam': 'Marked as Spam',
   'delete': 'Deleted'
};
