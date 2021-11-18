---
layout: post
title: "[MigOps] Transit Gateway"
description: " "
date: 2021-11-18
tags: [MigOps]
comments: true
share: true
---

# Transit Gateway

> 복수의 VPC와 On-premise 네트워크를 쉽게 연결하는 AWS Hyperplane 기반 Regional Virtual Router

![image-20201223173117430](..\image\image-20201223173117430.png)

> https://brunch.co.kr/@topasvga/827
>
> https://www.slideshare.net/awskorea/aws-transit-gateway-multivpc-aws-aws-summit-seoul-2019

1. Transit Gateway 생성

2. Attachment 생성

   > TGW와 연결할 VPC & Subnet

3. TGW Routing Table 설정

   - Association

     > attachment된 VPC 기본 연결
     >
     > Routing Domain 분리를 위해 추가적인 TGW Route Table 생성 운영 가능

   - Propagation

     > 모든 attachment는 Propagation됨
