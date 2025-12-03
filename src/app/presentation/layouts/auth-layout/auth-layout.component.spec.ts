import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthLayoutComponent } from './auth-layout.component';

describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLayoutComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current year in footer', () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toBe(currentYear);
  });

  it('should have router-outlet for dynamic content', () => {
    const compiled = fixture.nativeElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should have auth-container with proper structure', () => {
    const compiled = fixture.nativeElement;
    const authContainer = compiled.querySelector('.auth-container');
    expect(authContainer).toBeTruthy();
    
    const authHeader = compiled.querySelector('.auth-header');
    expect(authHeader).toBeTruthy();
    
    const authContent = compiled.querySelector('.auth-content');
    expect(authContent).toBeTruthy();
    
    const authFooter = compiled.querySelector('.auth-footer');
    expect(authFooter).toBeTruthy();
  });

  it('should display brand name', () => {
    const compiled = fixture.nativeElement;
    const brandName = compiled.querySelector('.brand-name');
    expect(brandName).toBeTruthy();
    expect(brandName.textContent).toContain('نظام إدارة التعليم');
  });

  it('should have background decorative shapes', () => {
    const compiled = fixture.nativeElement;
    const shapes = compiled.querySelectorAll('.auth-background-shape');
    expect(shapes.length).toBe(2);
  });
});
