# DevTinder App

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Installation

1. Create expo project

   ```bash
   npx create-expo-app@latest
   ```

2. Get a fresh project

   ```bash
   npm run reset-project
   ```

   This command will move the starter code to the **app-example** directory and create a blank **app** directory where we can start developing.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm start
   ```

   Or

   ```bash
   npx expo start
   ```

## For Local Development

1. Open **apiConfig.ts** file. [src/utils/apiConfig.ts]

2. Change the IP Address of base url with Machine's IP Address

   ```bash
   const BASE_URL_DEV = "http://192.168.43.170:7000";
   ```

## For Production/Release

1. Build the app locally without the Expo Go Environment

   ```bash
   npx expo prebuild
   ```

   This will generate native android and ios directories. These directories are automatically added in **.gitignore** file.

2. For Android, create a **network_security_config.xml** file and add the following content. Replace the IP Address if needed.

   ```bash
   <?xml version="1.0" encoding="utf-8"?>
   <network-security-config>
      <!-- Allow cleartext traffic only for specific domains -->
      <domain-config cleartextTrafficPermitted="true">
         <!-- ASW Server IP Address - For Production -->
         <domain includeSubdomains="true">51.21.171.84</domain>
         <!-- For Local Development - localhost + IP Address of Machine -->
         <domain includeSubdomains="true">localhost</domain>
         <domain includeSubdomains="true">192.168.43.170</domain>
      </domain-config>
      
      <!-- Default security configuration for all other domains -->
      <base-config cleartextTrafficPermitted="false">
         <trust-anchors>
               <certificates src="system" />
         </trust-anchors>
      </base-config>
   </network-security-config>
   ```

3. In **AndroidManifest.xml** file include the **network_security_config.xml** file

   ```bash
   <manifest>
      <application
         android:networkSecurityConfig="@xml/network_security_config"
      >
      </application>
   </manifest>
   ```

4. Now we can build and run the app using **Android Studio** and **XCode**.

5. Create a release apk by navigating to the **android** directory

   ```bash
   ./gradle build
   ```

   ```bash
   ./gradlew assembleRelease
   ```

## Notes

1. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
2. For development build [follow the steps](https://docs.expo.dev/develop/development-builds/introduction/).
3. Used `X-Client-Type` header to distinct between the mobile and web API call for the backend services.
