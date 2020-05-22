import { AuthService } from '../../auth/services/auth.service';
import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit, OnDestroy {
  @Input() appHasRole: string;

  stop$ = new Subject();

  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService
      .getAuthorities()
      .pipe(takeUntil(this.stop$))
      .subscribe((roles) => {
        if (!roles) {
          this.viewContainerRef.clear();
        }
        if (roles.some((auth) => auth.authority === this.appHasRole)) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        } else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      });
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}
