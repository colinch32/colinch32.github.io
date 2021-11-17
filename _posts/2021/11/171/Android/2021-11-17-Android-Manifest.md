---
layout: post
title: "[안드로이드] Android Manifest"
description: " "
date: 2021-11-17
tags: [안드로이드]
comments: true
share: true
---


# Android Manifest

## android: exported

> If target SDK version is android12 or above, It requires explicit value for 'android:exported' be defined to component intent filter is prensent.

`````ko
<?xml version="1.0" encoding="utf-8"?>
<manifest...>
    <application
    	...
        <activity
            android:exported="true"
            ...
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
     ...
`````

