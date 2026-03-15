import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

const PACKAGE_JSON = `{
  "name": "angular-input-playground",
  "private": true,
  "scripts": {
    "start": "ng serve --host 0.0.0.0 --port 4200"
  },
  "dependencies": {
    "@angular/animations": "^18.2.0",
    "@angular/common": "^18.2.0",
    "@angular/compiler": "^18.2.0",
    "@angular/core": "^18.2.0",
    "@angular/forms": "^18.2.0",
    "@angular/platform-browser": "^18.2.0",
    "@angular/platform-browser-dynamic": "^18.2.0",
    "@angular/router": "^18.2.0",
    "rxjs": "^7.8.1",
    "zone.js": "^0.14.10",
    "tailwindcss": "^3.4.13",
    "postcss": "^8.4.47",
    "autoprefixer": "^10.4.20"
  },
  "devDependencies": {
    "@angular/cli": "^18.2.0",
    "@angular/compiler-cli": "^18.2.0",
    "@angular-devkit/build-angular": "^18.2.0",
    "typescript": "^5.5.4"
  }
}`;

const ANGULAR_JSON = `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "projects": {
    "webapp": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/webapp",
            "browser": "src/main.ts",
            "index": "src/index.html",
            "tsConfig": "tsconfig.app.json",
            "polyfills": ["zone.js"],
            "assets": [],
            "styles": ["src/styles.css"]
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "buildTarget": "webapp:build"
          }
        }
      }
    }
  }
}`;

const TSCONFIG_JSON = `{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": false,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": ["ES2022", "dom"]
  },
  "angularCompilerOptions": {
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}`;

const TSCONFIG_APP_JSON = `{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": ["src/main.ts"],
  "include": ["src/**/*.d.ts"]
}`;

const POSTCSS_CONFIG = `{
  "plugins": {
    "tailwindcss": {},
    "autoprefixer": {}
  }
}`;

const INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Angular Input Playground</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>`;

const MAIN_TS = `import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch(err => console.error(err));
`;

const STYLES_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  height: 100%;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f8fafc;
}
`;

const CHILD_COMPONENT_TS = `
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: \`
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Child Component
      </div>

      <p class="text-slate-700">
        This value came from the parent via
        <code class="rounded bg-slate-100 px-2 py-1 text-sm">&#64;Input()</code>
      </p>

      <div class="mt-4 rounded-xl bg-indigo-50 p-4 text-indigo-700">
        {{ message }}
      </div>
    </div>
  \`
})
export class ChildComponent {
  @Input() message = '';
}
`;

const APP_COMPONENT_TS = `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ChildComponent],
  template: \`
    <main class="min-h-screen bg-slate-50 p-6 md:p-10">
      <div class="mx-auto max-w-4xl">
        <div class="mb-8">
          <h1 class="text-3xl font-bold tracking-tight text-slate-900">
            Parent → Child with &#64;Input
          </h1>
          <p class="mt-2 text-slate-600">
            Edit this code in the left editor and watch the preview update.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Parent Component
            </div>

            <label class="mb-2 block text-sm font-medium text-slate-700">
              Message from parent
            </label>

            <input
              [(ngModel)]="parentMessage"
              class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-0 focus:border-indigo-500"
              placeholder="Type here..."
            />

            <div class="mt-4 rounded-xl bg-slate-100 p-4 text-slate-700">
              <div class="text-sm text-slate-500">Current parent value</div>
              <div class="mt-1 font-medium">{{ parentMessage }}</div>
            </div>
          </section>

          <section>
            <app-child [message]="parentMessage"></app-child>
          </section>
        </div>

        <div class="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            How it works
          </div>

          <pre class="overflow-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100"><code>&lt;app-child [message]="parentMessage"&gt;&lt;/app-child&gt;</code></pre>
        </div>
      </div>
    </main>
  \`
})
export class AppComponent {
  parentMessage = 'Hello from the parent component!';
}
`;

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
})
export class PracticeComponent implements AfterViewInit {
  @ViewChild('editorHost', { static: true })
  editorHost!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const sdk = (await import('@stackblitz/sdk')).default;

    await sdk.embedProject(
      this.editorHost.nativeElement,
      {
        title: 'Angular Parent / Child @Input Playground',
        description:
          'Standalone Angular playground showing parent-child communication with @Input and Tailwind CSS.',
        template: 'node',
        files: {
          'package.json': PACKAGE_JSON,
          'angular.json': ANGULAR_JSON,
          'tsconfig.json': TSCONFIG_JSON,
          'tsconfig.app.json': TSCONFIG_APP_JSON,
          '.postcssrc.json': POSTCSS_CONFIG,
          'src/index.html': INDEX_HTML,
          'src/main.ts': MAIN_TS,
          'src/styles.css': STYLES_CSS,
          'src/app/child.component.ts': CHILD_COMPONENT_TS,
          'src/app/app.component.ts': APP_COMPONENT_TS,
        },
      },
      {
        openFile: 'src/app/app.component.ts',
        view: 'preview',
        height: 700,
        clickToLoad: false,
        terminalHeight: 35,
      }
    );
  }
}