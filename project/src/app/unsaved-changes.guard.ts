import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
