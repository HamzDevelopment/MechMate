import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
})
export class FeatureListComponent {
  @Input()
  features: { icon: string; title: string; description: string; }[] = []; // Input decorator to pass in the features array
}
