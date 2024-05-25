import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonComponent } from './skeleton.component';
import { SkeletonModule } from './skeleton.module';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonModule],
      declarations: [SkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
