---
layout: post
title: "[AWS] AWS Python 연결 - Boto3 문서 보기"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---


# AWS Python 연결 - Boto3 문서 보기

AWS EFS의 리스트를 가져오기 위해서 Boto3를 사용하던 도중 문서를 보고 작성하는 방법을 알아야했다.



###### AWS Boto3 공식 문서

https://boto3.amazonaws.com/v1/documentation/api/1.9.42/reference/services/efs.html



```python
import boto3

client = boto3.cleint('efs')
efss = client.describe_file_systems()['FileSystems']

for efs in efss:
    efs_name = efs.get('Name')
    efs_size = efs.get('SizeInBytes').get('Value')

print(efs_name, efs_size)
```



###### 함수

![image-20210305165639154](C:\Users\jihong.kim\OneDrive\TIL\AWS\image\image-20210305165639154.png)

- 공식 문서에서 사용하고자하는 기능을 가진 함수를 누르면 해당 함수에 대한 설명이 나온다.

- 리스트를 뽑고 싶으면 "describe_~" 함수 사용

  efs의 경우 "describe_file_systems()" 함수를 사용하면 된다.



###### 변수

![image-20210305165924399](C:\Users\jihong.kim\OneDrive\TIL\AWS\image\image-20210305165924399.png)

- 사용할 함수를 누르면 여러가지 설명이 나오는 데, 다 건너뛰고 Reponse Syntax를 확인하면 된다.
- 각 함수들은 json 형태로 파일을 리턴한다.
- 내가 보고 싶은 변수의 이름을 가져오면 끝

``` python
# 모든 EFS의 'FileSystems'에 담긴 변수 가져오기
efss = client.describe_file_systems()['FileSystems']

# efss안에 있는 여러 개의 변수 중 원하는 변수 선택 
for efs in efss:
    name = efs.get(['Name'])
    
```

