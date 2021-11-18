---
layout: post
title: "[AWS] AWS Control Tower"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---


# AWS Control Tower

- AWS 계정: AWS 자원에 대한 격리 공간

### AWS Control Tower

AWS 규모에 맞게 설정하고 제어하는 가장 쉬운 방법

- Enable
- Provision
- Perate

비지니스 민첩성 + 거버넌스 제어



수명 주기 이벤트



# CloudEndure Migration Factory

Assess -> Mobilize -> Migrate and Modernize

▶ 서버를 어떻게 옮길 것인가

### CloudEndure: 실시간 서버 이전

- 특징
  - 유연성: 다양한 환경, OS, 대규모 마이그레이션
  - 신뢰성: 중단 없는 연속 복제, 컷오버 최소, 높은 보안성
  - 자동화: 최소 스킬, 테스트, 마이그레이션 팩토리 연결
- API level로 움직일 수 있음
- Application, Database, System, Infrastructure 모두 가능



절차

os 체크/수정 -> 에이전트 -> 블루프린트 -> 복제 검증 -> 변환(컷오버) -> 서버 검증 -> App 검증 -> CloudEndure 컷오버 -> 앱 오너 통보 -> ...



> VM Migration Service
>
> - 스냅샷 증분 방식
> - 한시간 넘게 걸림





### CloudEndure Migration Factory

- 100개 이상의 re-host 서버가 있는 경우







# Hybrid Networking

- AWS 네트워킹 유형 요약

  > 논리적으로 격리된 가상의 공간: VPC



- 수많은 vpc를 효과적으로 하기 위해 트랜짓게이트웨이



VIF: Direct Connect Virtual Interface: 10개의 VPC를 Direct Connect로 연결 할 수 있음 + Transitgateway도 가능

DX 이중화 구성



# AWS Outposts

- AWS Resion에서 운영되는 동일한 인프라를 aws가 직접 설치









# 엔터프라이즈 기업

- 효과적인 관제 및 관리

  > AWS 매니지먼트, 거버넌스 서비스

- Enable, Provision





AWS 시스템 매니저 서비스 스택

- Operations Manangement
- Application Management
- Change Management
- Node Management



### AWS System Manager

AWS 시스템 매니저를 이용해 운영 관리 작업

기업 앱 관리 대상 리소스 정의 -> 관리 대상 리소스 운영 정보 확인 -> 관리 대상 리소스에 대한 변경 작업 수행 (운영정보 확인을 통해 변경 작업 수행)



> 업무 자동화로 효율 증대, 시간 단축, 가시성 관리성 향상, 중앙 관리, 보안 및 규정 준수 관리