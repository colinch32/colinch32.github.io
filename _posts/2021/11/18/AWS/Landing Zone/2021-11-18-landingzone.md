---
layout: post
title: "[AWS] AWS Landing Zone"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---

# AWS Landing Zone

## Landing Zone

> 안전한 다중 계정 AWS 환경을 제공하는 솔루션

- 다중 계정 환경을 만드는 노력 최소화, 안전한 환경 구성
- AVM을 배포하여 계정을 프로비저닝하고 자동 구성
- AWS SSO를 통해 사용자 계정 접근 관리



### Infrastructure as Code

> Code Template 파일을 통해 인프라를 관리하는 프로세스

- HCL을 사용하여 거의 모든 공급자 (AWS, GCP, GitHub, Docker 등) 원하는 리소스에 대한 정의가 포함된 파일을 작성

  > 해당 리소스 생성 자동화



## :calendar: 1123

### Landing Zone(== 결정)이란?

> 클라우드상에 가상의 데이터센터 환경 구축

Account, Network, Security, Identity & Access, Users

- Account --> Users

  > 하나의 리소스의 경계

- Landing Zone Architecture

  Well Architected Framwrok(운영, 보안, 안정성, 성능, 비용) 고려

- 랜딩존 결정 시 도전 사항

  - 디자인 의사 결정

    > 고객의 의사에 맞춰

  - 멀티 어카운트 & 서비스

  - 보안 베이스라인 및 거버넌스 수립

#### AWS Account

A 계정에서 B로 옮길 때 migration밖에 없음

- 보안/리소스 경계

- API Limits / Throttling

  > Account는 limits의 단위

- **빌링 분리**

  > 결제 주체

###### Multi Account가 필요한 이유

- 관리 주체가 다를 때(빌링 구분)
- Stack 분리
- 비즈니스 프로세스
- 보안 / 컴플라이언스 통제 항목

##### 필요한 Account

- 로깅, 보안, 네트워크(하나의 네트워크에서 최대 15z 영역 구분), 공유 서비스, 빌링, 샌드박스(완전 자유), 개발, Pre-Prod, Prod, 기타

  각각 account 필요

###### 고려사항

- **잠금**
  - 관리해야하는 계정의 수 증가
  - 계정 OTP 변환이 어려움 --> 하드웨어 OTP 구매 필요
- Federate
- 활성화
  - 거버넌스 설정
- 수립
- **정의**
  - 계정의 이용자 정의
- 식별

##### 네트워크 고려사항

- VPC, CIDR
  - Accout :arrow_up: VPC 개수 :arrow_up:
- Subnet
- IDC
- 인터넷 연결
- vpc간 연계
- Network 보안

#### Landing Zone Solution

> 보안 구조 :o: (네트워크 :x:)
>
> 신규 AWS 멀티 어카운트 환경의 설정을 자동화하는 손쉽게 배포 가능한 솔루션

- AWS 모범 사례 및 권장 사항 기반, 초기 보안 및 거버넌스 통제, 어카운트 베이스라인 및 어카운트 벤딩 머신, 자동 배포

  - 운영/검증 환경 :arrow_right: 철저하게 거버넌스 통제 필요

  - 개발 :arrow_right: 필요할 때마다 생성 필요

    - 베이스라인 가이드라인: 베이스라인 내에서 Account의 자율성 제공
    - 어카운트 벤딩 머신: 자유롭게 새로운 Account 복제 :o:

  - 자동 배포

    > 위의 모든 사례를 포함

- CloudFormation으로 Landing Zone 제공

###### Naming & Tagging

> 리소스에 할당할 Naming과 분류할 Tagging 정의

###### Best Practice

1. 용도별 Account 분리
2. Account에 대한 Organiztion 구성
3. OU 활용한 Account별 권한 제어
4. 로그 활성화
5. Config 및 Config Rule 활성화
6. ...

#### Cloud Formation

- Master Organizations Account

  - manifest file 업로드 (S3)
  - CodePipeline
    - Account Baseline
    - AWS Service Catalog
      - AWS 벤딩 머신을 제공
    - Parameter store
  - AWS Organizations
    - 구조를 잡아줌 (배포)
    - Core OU
  - **SSO**
    - Core Account의 root 권한을 할당
    - 나머지 account IAM rule 할당

- Core Account

   :exclamation: **root** account가 존재하지 않음

  - Shared Service(VPC 생성:o:), Log Archive, Security Account 생성

  - GuardDuty Master: Service형 Master

    > 각 Account를 enable 하면 각 프로그램들을 모니터링(로그 수집) :point_right: 한 곳으로 모임

- Network Account :point_right: CloudFormation으로 따로 생성
  - Core에 포함 :x:
  - 생성 방법
    1. Accoutn 벤딩 머신
    2. **Core Account에 삽입**

#### AWS Organizations

> 여러 AWS 계정을 중앙에서 통합 관리하는 계정 관리 서비스

- Service Control Policy 적용 (Organizations 구조)

  > 어떤 기능을 사용할 수 있도록 할 것인지

- baseline으로 설정한 보안 규칙 정의 :point_right: Landing zone이 모두 해줌!

  :custard: Custom 가능

  - Logging(Cloud Trail)

    > Lambda로만 가능 :point_right: Landing zone에서 Lambda 자동 생성

  - :custard: Config Governance(Config, Config Rule)

  - Security (GuardDuty)

  - :custard: 통합 계정 관리(SSO, RBAC 기반 user 정의)

#### Code

1. Landing zone code

2. IAM Policy Syntex(구문)

   - SCP
   - config 정보를 중간에 모음 (add-on)
   - TGW(Transit GateWay)
     - 다른 계정과 Share하는 add-on

3. Cloud formation Syntex

   :exclamation: 제약조건

   - 크기
   - 변수 길이



##### 기타

###### AWS Control Tower

> 랜딩 영역의 설정을 자동화

###### AWS Terraform Ladning Zone

> AWS 벤딩 머신이 구현되어있지 않음



**클라우드 엔지니어**

>  App 엔지니어 + 인프라 엔지니어





# Landing Zone - blog

-   클라우드 환경 구현을 위한 시작점
-   AWS, Azure, GCP 등 클라우드 환경으로 이전(Migration)할 때, 토대를 구축하는 것

#### AWS의 Landing Zone

-   안전한 멀티 어카운트 AWS 환경 제공
-   멀티 어카운트 환경을 만드는 노력 최소화, 안전한 환경 구성

### Landing Zone 결정 요구사항

-   Acoount
    
    하나의 리소스 경계
    
    -   Multi Account
        -   관리 주체가 다를 때 (빌링 구분)
        -   Stack 분리
        -   비즈니스 프로세스
        -   보안 / 컴플라이언스 통제 항목
-   Network
    
-   **Security**
    
-   Idnetity & Access
    
-   Users