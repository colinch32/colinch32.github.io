---
layout: post
title: "[MigOps] CloudFront"
description: " "
date: 2021-11-18
tags: [MigOps]
comments: true
share: true
---


# CloudFront

###### Cache

> 자주 액세스하는 데이터를 즉각 사용할 수 있도록 저장해두는 영역

###### CDN

> 전 세계에 배치된 대규모 서버 네트워크를 이용하여 지리적으로 가장 가까운 Edge로부터 Contents 전송

- 트래픽

  거리거 멀수록, 데이터양이 많을수록 전송 지연 (Middle Mile 구간)

### CloudFront

- Static Contents 캐싱

- Dynamic Contents 전송 성능 개선

- 무료 SSL 및 Custom SSL 지원

- Region, Edge 간 저용 회선, 이중화된 100GBE 네트워크

  > Global Backbone

- cache를 이용해 안전하고 빠르게 static contents 전송

- Dynamic Contents

  > 전체 응답 시간 = DNS Lookup + TCP Connection + Time To First Byte + Contents Download

  - Keep Alive Connection(지속적 연결 상태)을 통한 연결 설정 시간 단축

    > 마지막으로 access가 종료된 시점부터 정의된 시간까지 대기하는 구조

  - GZIP 압축

  - Origin Selection

    - 단일 배포에서 여러 Origin의 Contents 처리

  - Cross - Oriign Resource Sharing

    > 원본 리소스 쉐어링을 통해 같은 도메인에 서비스

  - SSL 지원

    > 데이터 변조 및 정보 유출 방지를 위한 사용

  - Signed URL, Signed Cookie 사용

    > 배포되는 Contents에 대한 보호 및 세부 제어

  ###### S3

  - 업로드 가속

  ###### EC2

  - Dynamic Contents 전송
  - 웹서버 구성

  ###### Lambda

  - Edge에서 Lambda 실행 -> HTTP 호출에 대한 contens 제공

  ###### origin 보호

  - CloudFront 경유하지 않은 접근 차단
  - DDOS 차단