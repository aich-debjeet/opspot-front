import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { CommonModule } from '../../common/common.module';
import { SponsoredRoutingModule } from './sponsored-routing.module';
import { SponsoredListsComponent } from './sponsored-lists/sponsored-lists.component';
import { NotificationModule } from '../notifications/notification.module';
import { LegacyModule } from '../legacy/legacy.module';
import { WalletModule } from '../wallet/wallet.module';
import {WireModule} from '../wire/wire.module';
import { PostMenuModule } from '../../common/components/post-menu/post-menu.module';


@NgModule({
  declarations: [SponsoredListsComponent],
  imports: [
    NgCommonModule,
    CommonModule,
    SponsoredRoutingModule,
    NotificationModule,
    LegacyModule,
    WalletModule,
    WireModule,
    PostMenuModule
    
  ]
})
export class SponsoredModule { }
