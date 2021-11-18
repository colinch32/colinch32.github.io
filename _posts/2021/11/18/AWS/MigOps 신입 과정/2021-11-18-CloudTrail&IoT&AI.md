---
layout: post
title: "[MigOps] CloudTrail"
description: " "
date: 2021-11-18
tags: [MigOps]
comments: true
share: true
---


# CloudTrail

- Security Analysis 보안 분석
- Track Changes to AWS Resources AWs 리소스에 대한 변경 사항 추적
- Troubleshoot Operational Issues 운영 문제 해결
- Compliance Aid 컴플라이언스 지원



> API 분석



# AWS IoT

### IoT

1. 단순함
2. 확장성
3. 보안

- IoT 서비스 구현에 필요한 요소

  메시지 브로커

  룰 엔진

  Thing Shadow

  디바이스 등록

- 관리형 서비스

  설치 불필요, 자동 확장, 사전 프로비저닝 불필요



### AWS IoT

- Device SDK

  > 연결, 인증, 메시지 교환을 위한 클아이언트 라이브러리

- 인증

- Registry

  > Thing에 대한 idnetity 생성

- Device Gateway

  > 표준 프로토콜을 지원하는 Gateway

- Rules Engine

  > 패턴에 일치하는 메시지에 대해서 다른 aws 서비스로 전송하거나 aws ioT로 Re-pulgish 수행
  >
  > 간단하고 친숙한 문법
  >
  > 노이즈 비율 개선 함수

  - Action

    1. 직접 연동

       s3, dynamodb, kinesis, lambda

    2. 간접 연동

       rds, ec2, redshift

    3. 외부 endpoints

  - Rule 엔진을 이용해 디바이스 데이터 기반 저장, 분석, 예측

  - 데이터 성격 및 목적에 따라 aws 서비스 선택 가능 (Action)

  - AWS Greengrass를 이용한 로클 ioT와 클라우드 ioT 함께 사용 가능

- Shadow

  > Thing 상태를 영구 저장



:point_up_2: 활용

- 디바이스 데이터에서 가치있는 정보 추출
- 수집된 데이터를 기반으로 머신러닝 예측



# AI

###### Rekognition

> 딥러닝 기반 이미지, 비디오 분석

###### Alexa Device

> Conversational AI 기술 기반 다양한 신규 비즈니스 창출

###### Polly

> 음성 합성 서비스

###### Transcribe

> 음성 입력 정보에 대한 스크립트 자동 생성, 완전 관리형 음성 인식 서비스

###### Comprehend

> 자연어 처리

###### SageMaker

> 완전 관리형 머신러닝/데이터과학 서비스

