import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Cookbook } from './cookbook';

describe('Cookbook', () => {
  it('keeps the existing cookbook links available', async () => {
    TestBed.configureTestingModule({ imports: [Cookbook], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Cookbook);
    await fixture.whenStable();
    const router = TestBed.inject(Router);
    const links = fixture.debugElement.queryAll(By.directive(RouterLink)).map((element) =>
      router.serializeUrl(element.injector.get(RouterLink).urlTree!),
    );
    expect(links).toContain('/recipe/1');
    expect(links).toContain('/cuisine/italian');
  });
});
