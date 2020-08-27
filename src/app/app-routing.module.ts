import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: './authentication/login/login.module#LoginPageModule'
    },
    {
        path: 'address',
        loadChildren: './authentication/address/address.module#AddressPageModule'
    },
    {
        path: 'forgot-password',
        loadChildren: './authentication/forgot-password/forgot-password.module#ForgotPasswordPageModule'
    },
    {
        path: 'profile-picture',
        loadChildren: './authentication/profile-picture/profile-picture.module#ProfilePicturePageModule'
    },
    {
        path: 'register',
        loadChildren: './authentication/register/register.module#RegisterPageModule'
    },
    {
        path: 'register-charity-house',
        children: [
            {
                path: '',
                loadChildren: './authentication/register-charity-house/register-charity-house.module#RegisterCharityHousePageModule'
            },
            {
                path: ':id',
                loadChildren: './authentication/address/address.module#AddressPageModule'
            }
        ]
    },
    {
        path: 'register-donner',
        loadChildren: './authentication/register-donner/register-donner.module#RegisterDonnerPageModule'
    },
    {
        path: 'charity-list',
        loadChildren: './donner/charity-list/charity-list.module#CharityListPageModule'
    },
    {
        path: 'donate-fund',
        loadChildren: './donner/donate-fund/donate-fund.module#DonateFundPageModule'
    },
    {
        path: 'donate-food',
        loadChildren: './donner/donate-food/donate-food.module#DonateFoodPageModule'
    },
    {
        path: 'reports',
        children: [
            {
                path: '',
                loadChildren: () => import('./donner/reports/reports.module').then(m => m.ReportsPageModule)
            },
            {
                path: ':id',
                loadChildren: () => import('./donner/reports/reports.module').then(m => m.ReportsPageModule)
            }
        ]
    },
    {
        path: 'feed-backs',
        loadChildren: './donner/feed-backs/feed-backs.module#FeedBacksPageModule'
    },
    {
        path: 'chat-channels',
        loadChildren: './donner/chat-channels/chat-channels.module#ChatChannelsPageModule'
    },
    {
        path: 'charity-house-chat',
        children: [
            {
                path: '',
                loadChildren: () => import('./charityHouse/charity-house-chat/charity-house-chat.module')
                    .then(m => m.CharityHouseChatPageModule)
            },
            {
                path: ':donnerName',
                loadChildren: () => import('./charityHouse/charity-house-chat/charity-house-chat.module')
                    .then(m => m.CharityHouseChatPageModule)
            }
        ]
    },
    {
        path: 'feedback',
        loadChildren: './charityHouse/feedback/feedback.module#FeedbackPageModule'
    },
    {
        path: 'donner-list',
        loadChildren: './charityHouse/donner-list/donner-list.module#DonnerListPageModule'
    },
    {
        path: 'send-report',
        loadChildren: './charityHouse/send-report/send-report.module#SendReportPageModule'
    },
    {
        path: 'admin-profile',
        children: [
            {
                path: '',
                loadChildren: () => import('./admin/admin-profile/admin-profile.module').then(m => m.AdminProfilePageModule)
            },
            {
                path: ':id',
                loadChildren: () => import('./admin/admin-profile/admin-profile.module').then(m => m.AdminProfilePageModule)
            }
        ]
    },
    {
        path: 'edit-profile',
        loadChildren: './admin/edit-profile/edit-profile.module#EditProfilePageModule'
    },
    {
        path: 'addUser',
        loadChildren: () => import('./admin/addUser/addUser.module').then(m => m.AddUserPageModule)
    },
    {
        path: 'admin-chat',
        loadChildren: './admin/admin-chat/admin-chat.module#AdminChatPageModule'
    },
    {
        path: 'donners',
        loadChildren: './admin/donners/donners.module#DonnersPageModule'
    },
    {
        path: 'charity-houses',
        loadChildren: './admin/charity-houses/charity-houses.module#CharityHousesPageModule'
    },
    {
        path: 'detail',
        children: [
            {
                path: '',
                loadChildren: () => import('./admin/detail/detail.module').then(m => m.DetailPageModule)
            },
            {
                path: ':id',
                loadChildren: () => import('./admin/detail/detail.module').then(m => m.DetailPageModule)
            }
        ]
    },
    {
        path: 'chat-list',
        loadChildren: './admin/chat-list/chat-list.module#ChatListPageModule'
    },
    {
        path: 'edit-profile',
        loadChildren: './admin/edit-profile/edit-profile.module#EditProfilePageModule'
    },
    {
        path: 'show-single-charity-house',
        children: [
            {
                path: '',
                loadChildren: () => import('./admin/show-single-charity-house/show-single-charity-house.module')
                    .then(m => m.ShowSingleCharityHousePageModule)
            },
            {
                path: ':id',
                loadChildren: () => import('./admin/show-single-charity-house/show-single-charity-house.module')
                    .then(m => m.ShowSingleCharityHousePageModule)
            }
        ]
    },
    {
        path: 'tabs',
        loadChildren: './admin/tabs/tabs.module#TabsPageModule'
    },
    {
        path: 'update',
        children: [
            {
                path: '',
                loadChildren: './admin/update/update.module#UpdatePageModule'
            },
            {
                path: ':id',
                loadChildren: './admin/update/update.module#UpdatePageModule'
            }
        ]
    },
    {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'profile',
        children: [
            {
                path: '',
                loadChildren: () => import('./shared/profile/profile.module').then(m => m.ProfilePageModule)
            },
            {
                path: ':id',
                loadChildren: () => import('./shared/profile/profile.module').then(m => m.ProfilePageModule)
            }
        ]
    },
    {
        path: 'help',
        loadChildren: './shared/help/help.module#HelpPageModule'
    },
    {
        path: 'change-password',
        loadChildren: './shared/change-password/change-password.module#ChangePasswordPageModule'
    },
    {
        path: 'open-admin-chat',
        loadChildren: './shared/open-admin-chat/open-admin-chat.module#OpenAdminChatPageModule'
    },
    {
      path: 'update-charity-house',
      children: [
        {
          path: '',
          loadChildren: () => import('./admin/update-charity-house/update-charity-house.module')
              .then(m => m.UpdateCharityHousePageModule)
        },
        {
          path: ':id',
          loadChildren: () => import('./admin/update-charity-house/update-charity-house.module')
              .then(m => m.UpdateCharityHousePageModule)
        }
      ]
    },  {
    path: 'upload-image',
    loadChildren: () => import('./upload-image/upload-image.module').then( m => m.UploadImagePageModule)
  }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
