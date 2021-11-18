---
layout: post
title: "[MigOps] Container"
description: " "
date: 2021-11-18
tags: [MigOps]
comments: true
share: true
---

# Container

운영체제 가상화, 프로세스 격리, 자동화, 이미지 기반

### Docker

###### 장점

이식성, 유연성, 신속성, 효율성

#### 애플리케이션의 구성

런타임엔진, 코드, 구성, 디펜던시



# ECS(EC2 Container Service)

> Docker를 AWS에서 구동
>
> 손쉬운 배포, 환경 신뢰, 대규모 환경 관리 용이, 자동화, 분산 애플리케이션

- 모든 규모 클러스터를 손쉽게 관리

  별도 실행x, 전체 상태 관리, 컨트롤 및 모니터링, 대규모 확장

- 유연한 컨테이너 배치

  앱, 배치 작업, 복수 스케줄러

- AWS 서비스와 함께 사용

- 확장 가능

  전체 API 제공, 오픈소스 에이전트, 커스텀 스케줄러

###### 주요 구성 요소

- Container Instance

  - EC2
  - Docker 데몬
  - ECS 에이전트
  - AMI 제공

- Cluster

  - 지역 단위
  - 자원 풀
  - Container 인스턴스들의 그룹
  - 최소에서 시작, 동적 확장

- Task Definitions

  - Container Instance
  - 코드같은,,

- Tasks

  - 작업 단위
  - 연관된 컨테이너 그룹
  - 컨테이너 인스턴스 실행

- Services

  Long running 애플리케이션
  - 로드 밸런싱
  - 상태 관리
  - 스케일업/다운
  - 업데이트관리