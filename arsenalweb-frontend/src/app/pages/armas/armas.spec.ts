import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Armas } from './armas';

describe('Armas', () => {
  let component: Armas;
  let fixture: ComponentFixture<Armas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Armas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Armas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
