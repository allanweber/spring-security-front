import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenStorageService } from './../../core/token-storage.service';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string;

  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit() {
    const roles = this.tokenStorage.roles;
    if (!roles) {
      this.isVisible = false;
      this.viewContainerRef.clear();
      return;
    }
    if (roles.some((auth) => auth === `ROLE_${this.appHasRole}`)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    } else {
      this.isVisible = false;
      this.viewContainerRef.clear();
    }
  }
}
