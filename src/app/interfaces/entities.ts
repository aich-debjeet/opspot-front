/**
 * Activity Object
 */
import { WireRewardsStruc } from '../modules/wire/interfaces/wire.interfaces';

export interface OpspotActivityObject {
  activity: Array<any>;
  entities: Array<any>;
  pinned: Array<any>;
}

export interface OpspotBlogEntity {
  guid: string;
  title: string;
  description: string;
  ownerObj: any;
  spam?: boolean;
  deleted?: boolean;
  paywall?: boolean;
  wire_threshold?: any;
  mature?: boolean;
  slug?: string;
  route?: string;
  header_bg?: string;
  mature_visibility?: boolean;
  monetized?: boolean;
  time_created?: number;
  time_published?: number;
  access_id?: number;
  license?: string;
  tags: any[];
  reminded?: boolean;
  reminds?: number;
  url?: string;
}

export interface Message {}

export interface KeyVal {
  key: string;
  value: any;
}

export interface OpspotUser {
  about?: any;
  location?: any;
  email?: string;
  phone?: string;
  website?: string;
  height?: string;
  weight?: string;
  guid: string;
  name: string;
  username: string;
  bookmark?: boolean;
  chat?: boolean;
  icontime: number;
  blocked?: boolean;
  carousels?: any[] | boolean;
  city?: string;
  social_profiles?: KeyVal[];
  wire_rewards?: WireRewardsStruc;
  spam?: boolean;
  deleted?: boolean;
  banned?: any;
  pinned_posts?: Array<string>;
  show_boosts?: boolean;
  merchant?: any;
  briefdescription?: string;
  activity_count?: number;
  supporters_count?: number;
  subscribers_count?: number;
  subscriptions_count?: number;
  post_count?: number;
  impressions?: number;
  subscribed?: boolean;
  rating?: number;
  eth_wallet?: string;
  is_mature?: boolean;
  mature_lock?: boolean;
  tags?: Array<string>;
  work_experience: any[];
  education: any[];
  awards: any[];
  projects: any[];
}

export interface OpspotGroup {
  guid: string;
  name: string;
  banner: boolean;
}
