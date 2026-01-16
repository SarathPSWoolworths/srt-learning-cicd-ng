import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

/**
 * Root Application Component
 * 
 * This is the main entry point for the SrtLearning application.
 * It displays environment-specific information and version details.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  /** Application title */
  protected readonly title = signal('SrtLearning');
  
  /** Current environment (DEV, UAT, PROD) */
  protected readonly environment = signal(environment.name);
  
  /** Application version from environment configuration */
  protected readonly version = signal(environment.version);
}
