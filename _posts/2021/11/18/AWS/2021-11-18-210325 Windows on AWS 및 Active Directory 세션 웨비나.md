---
layout: post
title: "[AWS] 210325 Windows on AWS 및 Active Directory 세션 웨비나"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---

# 210325 Windows on AWS 및 Active Directory 세션 웨비나

- Windows on AWS

  성능, 안정성, 비용절감

- MS 라이선스를 AWS로 가지고 올 수 있음



## 아젠다

- AD 기초

  - LDAP 계열

    별도의 직원정보 제공

  - 커베로스 기반 인증

  - DNS 기반 이름

  - 하는 일

    ![image-20210325142159864](image/image-20210325142159864.png)

  - AD 관련 서비스

    ![image-20210325142448814](image/image-20210325142448814.png)

  - 3가지 설치 방법 존재(windows, powershell, aws)

  - 논리적인 구성 요소 - Multi Master

    ![image-20210325143044083](image/image-20210325143044083.png)

    - AWS AD: AZ 별로 도메인이 생성됨
    - Global Catalog Server
      - AD의 Size가 클 때, 도메인이 여러개로 구성이 되어 있으면 전체 데이터를 동기화 하는 데 시간이 오래 걸림 -> 네트워크 트래픽 상승
      - 일종의 index 형태의 AD 서버 role

  - 물리적 구성요소

    - Domain Controller

    - MTDS.dit

    - B+ 방식의 Sites

      :자동으로 복제할 수 있는 Connect 생성

  - DNS 의존성

- AD 도메인 용어

  ![image-20210325143723992](image/image-20210325143723992.png)

  ![image-20210325143916919](image/image-20210325143916919.png)

  

- 트러스트 모델

  ![image-20210325144040497](image/image-20210325144040497.png)

  다른 방법에 비해 네트워크 포트를 적게 요구함

  양방향: 서로 리소스를 모두 활용 가능

- AD on AWS

  - AD Connector

  - Managed AD

    ![image-20210325145311362](image/image-20210325145311362.png)

    완전관리형 AD

  - AD on EC2

- 배포 모델

  - Cloud ONLY - Single

    ![image-20210325145725581](image/image-20210325145725581.png)

    기존 AD를 AWS EC2로 확장

![image-20210325150008551](image/image-20210325150008551.png)



- AD와 DNS

  AD 도메인에 조인하는 클라이언트들은 AD Domain의 IP 주소를 가지도록 구성 -> AD에서 도메인 Controller를 잘 찾을 수 있음

  ![image-20210325150219723](image/image-20210325150219723.png)

  - Self Managed AD 사용

  -> Windows 동적 도메인: 자동으로 해당 레코드에 도메인 등록

  DNS 방향에 정방향/역방향이 잘 세팅이 되어있어야 함

![image-20210325150423068](image/image-20210325150423068.png)

![image-20210325150553675](image/image-20210325150553675.png)



![image-20210325150711618](image/image-20210325150711618.png)

하단의 인스턴스는 위의 라우터로 감

문제점

- Windows 인스턴스는 DHCP 중 첫번째에 쿼리하는 경향이 있음
- 확장성: VPC + 2 DNS에는 1024pps 제한 존재
- AZ간 격리 유지X



![image-20210325150843756](image/image-20210325150843756.png)

![image-20210325150940379](image/image-20210325150940379.png)

![image-20210325151017311](image/image-20210325151017311.png)

- 위 문제 해결

![image-20210325151132981](image/image-20210325151132981.png)

![image-20210325151208023](image/image-20210325151208023-1616659849923.png)



