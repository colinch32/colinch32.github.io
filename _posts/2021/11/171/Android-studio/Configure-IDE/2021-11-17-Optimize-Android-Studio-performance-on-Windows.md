---
layout: post
title: "[안드로이드 스튜디오] Configure-IDE"
description: " "
date: 2021-11-17
tags: [안드로이드 스튜디오]
comments: true
share: true
---


# Optimize Android Studio performance on Windows

> ### Minimize the impact of antivirus software on build speed
>
> Exclude certain directories from real-time scanning in your antivirus software.

+ Gradle cache

  `````
  %USERPROFILE%\.gradle
  `````

+ Android Studio projects

  `````
  %USERPROFILE%\AndroidStudioProjects
  `````

+ Android SDK

  `````
  %USERPROFILE%\AppData\Local\Android\SDK
  `````

+ Android Studio system files

  `````
  Syntax: %LOCALAPPDATA%\Google\<product><version>
  Example: C:\Users\YourUserName\AppData\Local\Google\AndroidStudio2020.3
  `````

  