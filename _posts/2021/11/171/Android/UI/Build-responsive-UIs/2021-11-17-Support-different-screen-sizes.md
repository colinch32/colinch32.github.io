---
layout: post
title: "[안드로이드] Support different screen sizes"
description: " "
date: 2021-11-17
tags: [안드로이드]
comments: true
share: true
---

# Support different screen sizes



## Create a flexible layout

+ Use ConstraintLayout
  No matter what layout you use, you should always avoid hard-coding layout sizes.
  Set dimension to 0dp to enable 'match constraint'.
+ Avoid hard-coded layout sizes
  Use "wrap_content" or "match_parent"
+ Use SlidingPaneLayout for list/detail UIs