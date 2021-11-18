---
layout: post
title: "[AWS] CloudEndure"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---

# CloudEndure

- 마이그레이션을 간소화하고 신속하게 처리
- 비용 절감

> 기존 레거시 시스템을 AWS로 무료로 이전
>
> Left & Shift



###### 방법

1. Agent 설치

   > Replication Settings 설정 내용대로 CloudEndure Manager Console을 통해 Replication Server 자동 생성

2. 복제

3. 복제본 테스트

   1. Cut Over

      > 운영중이던 Service Application을 내리고 다른 시스템으로 이관하는 일련의 행위 
      >
      > +) Backout: 시스템 적용 중에 문제 등이 발생하여 더이상 적용 진행이 불가능한 경우 원래의 시스템으로 되돌리는 것

   - Replication 서버: 복제 서버

     > 원본 서버가 켜있을 경우 복제가 지속적으로 이루어짐

   - Converter 서버 : 테스트 또는 Cutover시 Replication 서버에서 Donverter 서버로 데이터 이관이 이루어지고 최종적으로 BluePrint 세팅값에 따라 Target 서버가 생성됨 Converter 서버는 생성되었다가 종료됨

   - Target 서버: BluePrint 셋팅값에 따라 생성된 Target 서버




---



###### TEST Mode

- Migration 솔루션 테스트 -> 소스 시스템이 대상 환경에서 제대로 작동하는 지 확인 :o:
- CloudEndure 사용자 콘솔 -> 소스 머신이 테스트 되었는지 여부와 테스트 성공 여부를 알려 줌
- 머신 생성 후에도 AS-IS 서버로부터 복제 계속 수행

###### Cut Over

- 머신 생성과 동시에 AS-IS 서버 복제 중단

---

# Windows CloudEndure Migration

사이트: https://migration-register.cloudendure.com/

1. Project 생성

![image-20210223100146246](.\image\image-20210223100146246.png)



2. AWS Credentials 연결
   - AWS IAM Access Key 입력

![image-20210223100715433](.\image\image-20210223100715433.png)



3. Replactions 설정

- On-Demand: 고객이 소프트웨어나 하드웨어를 소유하지 않는 솔루션. 소프트웨어 사용 비용 지불
- On-Premise: 사용자가 직접 설치하고 유지 관리하는 소프트웨어 솔루션. 소프트웨어와 하드웨어 소유

![image-20210223112308555](.\image\image-20210223112308555.png)





4. Agent & Token

![image-20210223101603693](.\image\image-20210223101603693.png)

- Source가 되는 Windows Server에 Agent 설치

  (cmd) exe 파일이 존재하는 폴더 위치에서 명령어 붙여넣기 > 실행




5. Replication 서버 생성 & Blueprint 설정

- Blueprint

  타겟 머신 생성을 위한 기본 설정

![image-20210223174421157](.\image\image-20210223174421157.png)

- 오른쪽의 블루프린트 설정으로 AWS EC2에 만들어질 환경 설정
- Sandbox(폐쇄망) 환경에서 정상 부팅 테스트





이후 TestMode / Cut Over 진행하면된다.