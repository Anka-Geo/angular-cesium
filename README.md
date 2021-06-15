# Bu Repo Nedir
- Bu repo `Angular'a CesiumJS nasıl yüklenir?` sorusuna cevap vermesi için yapılmıştır. Cesium için ara kütüphane kullanılmamaktadır.

## Ayarlamalar Nasıl Yapılır 
- `yarn add cesium` komutu ile cesium'u yüklüyoruz.
- `yarn add -D @types/cesium` komutu ile cesium'un types'ını yüklemiş oluyoruz.
- `angular.json` dosyasına ekleme yapacağız.
    - `projects > angular-cesium > architect > build > options > assets` içine aşağıdaki yapıyı ekliyoruz.
        - ```json
            {
                "glob": "**/*",
                "input": "node_modules/cesium/Build/Cesium",
                "output": "./assets/cesium"
            }
            ```
    - `projects > angular-cesium > architect > build > options > styles` içine aşağıdaki string'i ekliyoruz.
        - `"node_modules/cesium/Build/Cesium/Widgets/widgets.css"`
    - `projects > angular-cesium > architect > build > options > scripts` içine aşağıdaki string'i ekliyoruz.
        - `"./node_modules/cesium/Build/Cesium/Cesium.js"`
- `src/main.ts` içine aşağıdaki kod bloğunu ekliyoruz.
    - ```ts
        (window as any)['CESIUM_BASE_URL'] = '/assets/cesium/';
        ```
- Şu halde Cesium yüklenmiş durumdadır. Lakin ki intellisense çalışmıyor.
- `src/global.d.ts` dosyası oluştur, içeriği bu şekilde olsun.
    - ```ts
        declare type Cesium = import('@types/cesium');
        // yada bu
        declare type Cesium = import('cesium');

        ```
- `tsconfig.json -> compilerOptions` içerisine yeni bir parametre ekleyeceğiz.
    - ```json
        {
            "compileOnSave": false,
            "compilerOptions": {
                ...
                "skipLibCheck": true, // eklenecek değer bu
                ...
            },
            ...
        }

        ```
- `src/app.component.html` için aşağıdaki kodu uygulayınız. 
    - ```HTML
        <div id="map"></div>
        ```
- `src/app.component.ts` için aşağıdaki kodu uygulayınız.
    - ```ts
        import { Component, OnInit } from '@angular/core';

        @Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
        export class AppComponent implements OnInit {
            foo?: Cesium.Viewer;

            ngOnInit() {
                this.foo = new Cesium.Viewer('map');
            }
        }
        ```




### NOT
- Intellisense ayarlaması için `@types/cesium` kütüphanesi kullanılmaktadır. Bu kütüphane versiyon olarak cesium'un gerisinden geliyor. Şuanda `cesium`'un son version'u 1.82.1 ama `@types/cesium`'un son versionu 1.67.13. Bu kod yazarken bazı sıkıntılara sebep veriyor ve Typescript seviyesinde casting yapmayı zorunlu kılıyor.
- Versiyon hatasını düzeltmek için `node_modules/cesium/Build/Cesium/Cesium.d.ts` dosyası da denenebilir. Ama bunu henüz yapamadık.