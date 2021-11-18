---
layout: post
title: "[MigOps] Serverless"
description: " "
date: 2021-11-18
tags: [MigOps]
comments: true
share: true
---

# Serverless

- 서버 관리가 내재되어 있는 환경
  - 서버 준비, 관리 불필요
  - 미 실행시 과금 X
  - 사용량 기반 자동 확장
  - 가용성 및 장애 방지
  
- ### AWS Amplify Console

  지속적 배포를 통해 풀 스택 서버리스 웹 앱 호스팅

- ### API Gateway

  모든 규모의 API 생성, 유지 관리 및 보호

  - REST API 및 WebSocket API 지원
  - SDK 생성
  - Edge optimized: 글로벌 인터넷 상의 모든 위치에 존재하는 클라이언트에게 최소 지연시간으로 응답을 제공하도록 설계
  - Regional: 같은 리전 내의 클라이언트로부터 API를 호출 시 최소 지연시간으로 응답을 제공하도록 설계


###### Proxy 통합 vs Proxy 비통합

| proxy 통합              | proxy 비통합                 |
| ----------------------- | ---------------------------- |
| 있는 그대로 전달        | event 함수의 매개변수로 전달 |
| Lambda 함수를 호출할 때 | 함수 내부를 호출 할 때       |



- ### Lambda

  서버 없이 코드 실행

  - Handler(): 호출시 실행될 함수
  - 이벤트 오브젝트: Lambda 함수 호출 시 전달되는 데이타
  - 컨텍스트 오브젝트:  Lambda 함수 호출 시 전달되는 데이타로 Lambda 런타임과 상호작용하는 Method 제공

  ###### :x:

  - TCP/IP 소켓 통신 해결
  - Response 후 Lambda처리
  - 실행시간 5분 이상

  ###### 실행 모델

  - 동기

    /order

  - 비동기

    reqs

  - 스트림기반

    changes

  ###### 릴리즈 프로세스

  소스(CodeCommit) > 빌드(CodeBuild) > 테스트(CodePieline) > 프로덕션(Code Deploy)

  ###### 배포 툴

  - AWS Cloudformation

    AWS 리소스 프로비저닝

    클라우드 인프라 템플릿 정의 언어 (JSON, YAML)

  - AWS Serverless Application Model (SAM)

    서버리스 최적화 CloudFormation

    - 함수, API, 테이블

    - 별칭

      > Lambda 함수 별칭과 함께 사용하면 여러 환경 단계에 대해 단일 API 구성 및 Lambda 함수 관리 :o:

  - AWS CodeDeploy + Lambda

    - 자동 배포(EC2), 롤링 배포(Blue/green) 정지와 롤백 지원, 람다 지원
    - SAM 사용
    - 람다 별칭을 사용한 트래픽 이동 지원

  - API Gateway Canary

    Canary 릴리즈 배포를 사용하여 API Gateway에서 새로운 API를 점차적으로 출시

    - API 백엔드에 새로운 기술 적용
      - 새로운 언어, 프레임워크
      - 특정 기능 구현 후 연결
    - 개별 로그 지표로 성능 비교/대조
    - VPC에서 엔드포인트 통합을 통해 온프레미스에서 AWS로 API 마이그레이션

  ###### 배포 파이프라인

  - CodePipeline

    신속하고 신뢰할 수 있는 앱 업데이트를 위한 지속적인 전달 서비스

    소프트웨어 릴리즈 프로세스 모델링 및 시각화

    코드 변경 시 빌드, 테스트, 배포

  ###### 운영

  - SAM Local

    - 테스트 및 디버깅
    - Lambda 함수 및 프록시 형태의 API로 작동

  - CodeBuild

    높은 수준의 lambda 테스트

    Docker 이미지를 사용해 빌드/테스트 환경 구성

  - CloudWatch

    사용자 정의 지표 기록

    상세한 지표 집계

- ### Cognito

  사용자 풀 및 자격 증명 풀 제공

  - 가입 및 로그인, 소셜 로그인, 이메일 혹은 전화번호, 패스워드 분실 등



## 서버리스 배포

###### 고려사항

- 사용자에게 미치는 영향 최소화
- 롤백 기술
- 실행 모델 요소
- 배포 속도

###### 배포 패턴

- All-at-once

  > 모든 트래픽은 이전 버전에서 새 버전으로 즉시 이동

- Blue

  > 프로덕션 트래픽을 처리하기전에 새 버전은 배포되고 테스트

- Green

  > 유효성을 검사 한 후 모든 트래픽이 이전 버전에서 새 버전으로 즉시 변경

- Canary

  > 프로덕션 트래픽의 일부분은 새 버전으로, 나머지는 이전 버전으로 보냄

- Linear

  > 유효성 검사를 위해 일정 기간이 지나면 트래픽이 점진적으로 이동되거나 새 버전으로 완전히 이동

#### SAM

> Serverless에 최적화된 CloudFormation 확장판

- 함수,  API, 테이블 추가 지원

#### CodeDeploy

- 자동 배포, 롤링 배포, 정지와 롤백 지원

#### API Gateway Canary

> Canary 릴리즈 배포를 사용하여 API Gateway에서 새로운 API를 점차적으로 출시

- API 백엔드에 새로운 기술 적용



### 배포 파이프라인

#### CodePipeline

> 릴리즈 프로세스 모델링 및 시각화

- 전환, 작업, 단계
- 코드 아티팩트 생성
- 단일 환경
- SAM으로 아티팩트와 다른 aws 리소스 배포



#### 운영

#### CodeBuild

> Docker 이미지를 사용하여 빌드/테스트 환경을 구성한 뒤 원하는 작업을 가능하게 함



# Lambda

- Front End Invoke

  동기, 비동기 호출 모두 관장

- Counting Service

  사용자가 API 요청하는 횟수 모니터링, 제한

- Worker Manager

  실제 Container의 상태 관리, API 요청을 가용 가능한 Container로 중계

- Worker

  고객의 코드가 안전하게 실행되는 Container 환경

- Placement Service

  Worker에 Sandbox 구성 자원 활용률이 높고, 고객의 서비스 영향이 없도록 관리

-  Load Balancing

  가용 영역으로 트래픽 분산 (Routing) 가능

- Auto Scaling

- Handling Failures

  가용영역 수준의 가용성 확보 -> 항상 가용한 호스팅 사용

-  Isolation

  고객의 Workload(fucntion, code)는 항상 안전한 환경에서 실행

- Utilization

  자원 활용 효율 최대화

  - 높은 자원 활용 = 낮은 비용

  - (다양한) 최적화된 Workload를 Server에 배치

    > 충돌 최소화

#### Lambda에서 DB 접근

* 유의점

  1. 여러 가용 영역 내 Subnet에 ENI 사용
  2. Lambda는 VPC 내 ENI로 접근
  3. Public host name DNS 쿼리를 피해야 함
  4. VPC의 Lambda는 인터넷 접근 불가능
     - NAT Gateway 추가 및 Routing Table 구성으로 사용

*  Connection Pooling

  1. Lambda container가 사라지는지 인지:x:

     connection을 명시적으로 닫을 수 없음

     connection 삭제는 database TTL에 의지

  2. Lambda container의 생성 삭제 조정 :x:

  3. 여러 lambda 함수 실행은 여러 다른 container에서 실행 :o:

* 해결

  1. Concurrency 제한
     - account와 function 레벨 모두 제한 가능
     - Account내 모든 Lambda에 적용
     - 어떤 Lambda 함수가 DB 접근이 필요한지 확인
  2. 동적 connection 관리
     - 확장 가능한 구조 구현
     - Connection 수 관리, Lambda 함수 개수 무관
     - DynamoDB를 이용해 Connection 수 관리
     - 관리할 리소스 증가, Connection 재사용 불가, 약간의 Latency 증가

#### 트레이싱

> 서버리스 개발 시 Debug 편의성, 동작 시 성능 문제 해결의 편의성