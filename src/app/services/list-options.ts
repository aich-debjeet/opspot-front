export const LICENSES : Array<any> = [
  {value:'all-rights-reserved', text:'All rights reserved'},
  {value:'attribution-cc', text:'Attribution CC BY'},
  {value:'attribution-sharealike-cc', text:'Attribution-ShareAlike BY-SA'},
  {value:'attribution-noderivs-cc', text:'Attribution-NoDerivs CC BY-ND'},
  {value:'attribution-noncommercial-cc', text:'Attribution-NonCommerical CC BY-NC'},
  {value:'attribution-noncommercial-sharealike-cc', text:'Attribution-NonCommerical-ShareAlike CC BY-NC-SA'},
  {value:'attribution-noncommercial-noderivs-cc', text:'Attribution-NonCommerical-NoDerivs CC BY-NC-ND'},
  {value:'publicdomaincco', text:'Public Domain CCO "No Rights Reserved'},
  {value:'gnuv3', text:'GNU v3 General Public License'},
  {value:'gnuv1.3', text:'GNU v1.3 Free Documentation License'},
  {value:'gnu-lgpl', text:'GNU Lesser General Public License'},
  {value:'gnu-affero', text: 'GNU Affero General Public License'},
  {value:'apache-v1', text:'Apache License, Version 1.0'},
  {value:'apache-v1.1', text:'Apache License, Version 1.1'},
  {value:'apache-v2', text:'Apache License, Version 2.0'},
  {value:'mozillapublic', text:'Mozilla Public License'},
  {value:'bsd', text:'BSD License'}
];

export const ACCESS : Array<any> = [
  {value: 0, text: 'Unlisted'},
  {value: 1, text: 'Loggedin'},
  {value: 2, text: 'Public'}
];

export const REASONS : Array<any> = [
  { value: 1 , label: 'Illegal' },
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

export const REPORT_REASONS : Array<any> = [
  { value: 1 , label: 'Not marked as adult content', description: 'Post shows nudity, sexuality, content not fit for 18 years below, etc.' },
  { value: 2, label: 'Drug Advocacy', description: "We don't encourage the use of drugs. Post showcasing, about or related to drugs." },
  { value: 3, label: 'Child Pornography', description: 'Underage nudity or sexual situation including a minor including selfies, etc.' },
  { value: 4, label: 'Violence or Extremism', description: 'Posts related to violence, radical or extremist, raising concern, promoting hate speech, etc.' },
  { value: 5, label: 'Copyright Violation', description: 'Violation, piracy or theft of a copyright holder’s content, etc.'},
  { value: 6, label: 'Trademark Violation', description: 'Unauthorised use of trademarks or service marks on competing or related goods and services.' },
  { value: 7, label: 'Others', description: 'Inappropriate or disturbing content, hate speech, etc.' }
];

export const PROFILE_REPORT_REASONS : Array<any> = [
  { value: 1 , label: 'This person is annoying me', description: 'Constantly trying to make contact against your wish, stalking, commenting on your posts, etc.' },
  { value: 2, label: 'Pretending to be someone I know', description: "Impersonating, using someone else’s content, fake accounts, etc." },
  { value: 3, label: 'Sharing inappropriate or offensive post', description: 'Content that violates other people’s rights, insensitive and insulting in nature, etc.' },
  { value: 4, label: 'Others', description: 'Cyber bullying, abuse, online shaming, intruding your privacy, hate speech, etc.' }
];

export const READABLE_REASONS : Array<any> = [
  { value: 1 , label: 'is illegal' },
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

export const EVENT_TYPES : Array<any> = [
  { value: 'Free‎' , label: 'Free‎' },
  { value: 'Paid', label: 'Paid' },
  
];

export const EVENT_CATEGORY : Array<any> = [
  { value: 'Arts Events‎' , label: 'Arts Events‎' },
  { value: 'Award Ceremonies', label: 'Award Ceremonies' },
  { value: 'Ball‎', label: 'Ball‎' },
  { value: 'Concerts', label: 'Concerts' },
  { value: 'Cultural Conferences‎', label: 'Cultural Conferences‎' },
  { value:'Cultural Festivals', label: 'Cultural Festivals' },
  { value: 'Exhibitions', label: 'Exhibitions' },
  { value:'Fashion Events‎', label: 'Fashion Events‎' },
  { value: 'Festivals by culture', label: 'Festivals by culture' },
  { value: 'Film Festivals' , label: 'Film Festivals' },
  { value: 'Inaugrations‎', label: 'Inaugrations‎' },
  { value: 'Museum Events' , label: 'Museum Events' },
  { value: 'Performances', label: 'Performances' },
  { value: 'Technical Events‎', label: 'Technical Events‎' },
  { value: 'Theatre', label: 'Theatre' },
  { value: 'Trade Fairs' , label: 'Trade Fairs' }
];

export const REPORT_ACTIONS = {
  'explicit': 'Marked as Explicit',
  'spam': 'Marked as Spam',
  'delete': 'Deleted'
};
