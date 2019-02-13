import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-cellar',
  templateUrl: './cellar.component.html',
  styleUrls: ['./cellar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellarComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
}
