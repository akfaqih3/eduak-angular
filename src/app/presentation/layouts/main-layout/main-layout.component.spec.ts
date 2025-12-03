import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have sidebar open by default', () => {
    expect(component.isSidebarOpen()).toBe(true);
  });

  it('should toggle sidebar state', () => {
    const initialState = component.isSidebarOpen();
    component.toggleSidebar();
    expect(component.isSidebarOpen()).toBe(!initialState);
    component.toggleSidebar();
    expect(component.isSidebarOpen()).toBe(initialState);
  });

  it('should close sidebar', () => {
    component.isSidebarOpen.set(true);
    component.closeSidebar();
    expect(component.isSidebarOpen()).toBe(false);
  });

  it('should have navigation items', () => {
    expect(component.navItems).toBeDefined();
    expect(component.navItems.length).toBeGreaterThan(0);
  });

  it('should have sidebar items', () => {
    expect(component.sidebarItems).toBeDefined();
    expect(component.sidebarItems.length).toBeGreaterThan(0);
  });

  it('should render navbar component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });

  it('should render sidebar component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-sidebar')).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
