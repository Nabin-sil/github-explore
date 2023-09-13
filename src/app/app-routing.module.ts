import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './component/search/search.component';
import { DetailComponent } from './component/detail/detail.component';
import { SearchDataResolverService } from './resolver/search-data-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'detail/:owner/:repo', component: DetailComponent },
  {
    path: 'search',
    component: SearchComponent,
    resolve: {
      searchData: SearchDataResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
