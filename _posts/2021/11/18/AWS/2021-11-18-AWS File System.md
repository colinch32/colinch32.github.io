---
layout: post
title: "[AWS]  AWS File System"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---


# AWS File System

https://aws-diary.tistory.com/88

###### NFS(Network File System)

> 공유된 원격 호스트의 파일을 로컬에서 사용할 수 있도록 개발된 파일 시스템

네트워크 상에 연결된 다른 컴퓨터의 하드디스크를 내 컴퓨터의 하드디스크처럼 사용하는 것

- 중앙 집중형 시스템: 모든 데이터가 스토리지 서버로 집중화
- 안정성 증가(RAID)
- 느린 속도



## Linux

### AWS EFS(Elastic File System)

https://m.blog.naver.com/PostView.nhn?blogId=ncloud24&logNo=220820405320&proxyReferer=https:%2F%2Fwww.google.com%2F

> 간단하고 확장 가능하며 탄력적인 완전관리형 NFS 파일 시스템

![img](.\image\overview-flow.png)

- 탄력적인 스토리지 용량

  파일이 추가되고 제거됨에 따라 자동으로 용량이 증가하고 줄어듦

- DX를 통해 물리 서버와도 연결이 가능

- 위의 링크를 따라 EFS 생성 후, 연결할 EC2에 명령어를 입력하여 연결 --> 간단하다!



## Windows

### AWS FSx

> 안정적이고 확장 가능한 완전관리형 파일 스토리지 서비스

![image-20210128125521658](.\image\image-20210128125521658.png)

##### for Windows	

http://blog.a-cloud.co.kr/2020/06/16/amazon-fsx-for-windows-file-server-%ec%8a%a4%ed%86%a0%eb%a6%ac%ec%a7%80-%ed%81%ac%ea%b8%b0-%eb%b0%8f-%ec%b2%98%eb%a6%ac-%ec%9a%a9%eb%9f%89-%ed%99%95%ec%9e%a5-%ec%84%9c%ec%9a%b8-%eb%a6%ac/

- Windows Server에 구축
- 상요자 할당량, 최종 사용자 파일 복원 및 AD(Active Directory) 통합과 같은 광범위한 관리 기능 제공
- 단일 AZ 및 다중 AZ 배포 옵션, 완전 관리형 백업 및 유휴 및 전송 중 데이터 암호 제공
- SMB(서버 메시지 블록) 프로토콜 기본적으로 지원

##### for Lustre

- Lustre (Linux + cluster)

  > 병렬 분산 파일 시스템
  >
- 높은 성능과 코드가 개방되어 슈퍼컴퓨터에 주로 사용

