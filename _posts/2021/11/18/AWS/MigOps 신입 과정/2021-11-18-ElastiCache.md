---
layout: post
title: "[MigOps] ElastiCache"
description: " "
date: 2021-11-18
tags: [MigOps]
comments: true
share: true
---

# ElastiCache

###### Redis

- RDS 부하 줄이기
- Latency 줄이기
- Rate limiting

### ElastiCache

- RDS 부하 감소
- Latency 감소
- Rate limiting
- 높은 가용성
- 모니터링

- 사용볍

	> EC2 --> ElastiCache --> RDS
	>
	> EC2에서 cache안에 데이터가 있는지 check, 없으면 RDS에서 check

### Scalability

- 스케일 향상

  1. Read Replica를 더 많이 사용하기

     > write 불가능

  2. Redis Cluster Mode 사용

     > Python 환경 불가능

  3. Hash table을 이용해 캐쉬하고 싶은 데이터의 고유 번호를 지정, 해쉬 값을 매핑하여 Redis Node에 정보 저장

     > Super Node: 특정 노드에 부하가 몰림
     >
     > > App의 Memory를 locally cache하여 해결
     >
     > 가용성: Reader Node가 죽었을 대 복구 시간이 느림





# Kinesis Streams

> 스트리밍 데이터 처리 애플리케이션 구축

- 쉬운 관리
  - 실시간 처리를 위한 관리형 서비스
  - 데이터 보존 및 저장을 위한 관리형 기능
    - 스트림: 한 개 이상의 샤드로 구성
- 실시간 앱 구축
- 낮은 비용

### 스트림 데이터 저장

- 업무에 따라 파티션 키 선택 정책

  - 관리형 버퍼

    > 데이터를 안전하고 확장 가능한 방법으로 취합해서 저장할 수 있는 방법 고려 시 선택

  - 스트리밍 맵-리듀스

    > 자연스럽게 데이터를 집계하는 방법으로 파티션 키 활용

- 레코드 순서와 다중 샤드

  순서 처리 요건에 따라 파티션 키 선택 정책

  - 비순서 처리

    > 많은 샤드들에 걸쳐 분산하기 위해 랜덤 파티션 키를 사용하고 다중의 작업자들을 이용

  - 정확한 순서 처리

    > 파티션 키를 제어해 동일한 샤드에 이벤트가 모이고 동일한 작업자가 읽을 수 있게 보장

###### 데이터 넣기

- Put 인터페이스로 데이터 넣기

  PutRecord

###### Kinesis Producer Library

- 소비자 앱 Stream API 사이의 중개자 역할
  - 사용자 레코드를 한데 모음
  - PutReords 이용: 레코드 수집, 다중의 레코드를 한 번의 요청으로 여러 샤드들에 씀

### 스트림 데이터 처리

- Get 인터페이스로 데이터 읽어오기
- Kinesis Client Library (KCL)
  - 각 샤드로부터 코드 추상화 -> 읽기 간소화



# Elasticsearch Service

### Elasticsearch

> 실시간 분산 기반 검색 및 분석 엔진

- 로그 수집기 Kibana와 연결하여 ELK 스택을 통해 강력한 실시간 데이터 분석

- 내부 용어
  - 도큐먼트: 검색 단위 문서
  - ID: 문서 고유 식별자, 문서당 하나
  - 샤드: 인덱스의 한 파트를 갖는 Lucene 인스턴스
  - 인덱스: 검색 데이터 집합