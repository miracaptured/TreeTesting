import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export enum Icons {
  dashboard = 'dashboard',
  add_test = 'add_test',
  help = 'help',
  text_task = 'text_task',
  variant_task = 'variant_task',
  cardsort_task = 'cardsort_task',
  treetest_task  = 'treetest_task',
  edit = 'edit',
  delete = 'delete',
  delete_outline = 'delete_outline',
  add = 'add',
  check_icon = 'check_icon',
  chevron_right = 'chevron_right',
  chevron_expanded = 'chevron_expanded',
  download = 'download',
  download_arrow = 'download_arrow',
  import = 'import',
  analytics = 'analytics',
  share = 'share',
  duplicate = 'duplicate'
}

@Injectable({
  providedIn: 'root'
})
export class IconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  public registerIcons(): void {
    this.loadIcons(Object.values(Icons), '../assets/icons');
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
    });
  }
}
