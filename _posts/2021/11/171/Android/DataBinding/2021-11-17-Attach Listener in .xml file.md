---
layout: post
title: "[안드로이드] Databinding - Attach Listener in .xml file"
description: " "
date: 2021-11-17
tags: [안드로이드]
comments: true
share: true
---

<h1> Attach Listener in .xml file</h1>

> Goal : 

`````java
<androidx.recyclerview.widget.RecyclerView
    		...
            app:onScrollListner="@{viewModel.onScrollListenerForCardRecyclerView}"/>
`````



> write code in any class <code> e.g. MyViewModel.class</code> for attach attribute <code>app:onScrollListener</code> in xml.

`````java
@BindingAdapter("onScrollListener")
public static void setOnScrollListener(RecyclerView view, RecyclerView.OnScrollListener listener){
    view.addOnScrollListener(listener);
}
`````



> 