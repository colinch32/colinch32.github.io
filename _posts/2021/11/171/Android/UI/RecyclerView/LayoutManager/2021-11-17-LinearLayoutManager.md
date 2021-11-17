---
layout: post
title: "[안드로이드] LinearLayoutManager"
description: " "
date: 2021-11-17
tags: [안드로이드]
comments: true
share: true
---

<h1>LinearLayoutManager</h1>

> LayoutPosition

> #getChildAt(int layoutPosition)

`````java
LinearLayoutManager layoutManager;
int position;
...
//position is layoutPosition. not adapterPosition.
//layoutPosition : position between currently displaying items.
layoutManager.getChildAt(position);
`````

