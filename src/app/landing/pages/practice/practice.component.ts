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
  "name": "angular-input-practice",
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
    <title>Angular Input Practice</title>
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

const APP_COMPONENT_TS = `import { Component } from '@angular/core';
import { ParentComponent } from './parent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ParentComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
`;

const APP_COMPONENT_HTML = ``;

const PARENT_COMPONENT_TS = `import { Component } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './parent.component.html'
})
export class ParentComponent {}
`;

const PARENT_COMPONENT_HTML = ``;

const CHILD_COMPONENT_TS = `import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  templateUrl: './child.component.html'
})
export class ChildComponent {}
`;

const CHILD_COMPONENT_HTML = ``;

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
        title: 'Angular Input Practice',
        description: 'Angular editor setup',
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
          'src/app/app.component.ts': APP_COMPONENT_TS,
          'src/app/app.component.html': APP_COMPONENT_HTML,
          'src/app/parent.component.ts': PARENT_COMPONENT_TS,
          'src/app/parent.component.html': PARENT_COMPONENT_HTML,
          'src/app/child.component.ts': CHILD_COMPONENT_TS,
          'src/app/child.component.html': CHILD_COMPONENT_HTML,
        },
      },
      {
        openFile:
          'src/app/app.component.ts,src/app/app.component.html,src/app/parent.component.ts,src/app/parent.component.html,src/app/child.component.ts,src/app/child.component.html',
        view: 'default',
        height: 700,
        clickToLoad: false,
        terminalHeight: 35,
        showSidebar: true,
        hideNavigation: false,
      }
    );
  }
}