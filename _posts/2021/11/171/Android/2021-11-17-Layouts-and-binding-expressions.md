---
layout: post
title: "[안드로이드] Layouts and binding expressions"
description: " "
date: 2021-11-17
tags: [안드로이드]
comments: true
share: true
---


# Layouts and binding expressions

## How to input string direct in @{} databinding expression.

`````ko
<TextView
	android:text='@{settings_viewmodel==null ? "null":"nonnull"}'
		
//O
//wrap whole proprerty @{settings_viewmodel==null ? "null":"nonnull"} with ''
//string value requires with ""
	
	
<TextView
	android:text="@{settings_viewmodel==null ? 'null':'nonnull'}"
	
//X
//if string value go with '', cannot resolved it.
`````

  



