---
layout: post
title: "[AWS] EKS Code Pipeline"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---

# EKS Code Pipeline

개발자 -> 코드 커밋 -> 특정 브랜치로 pull request & Marge -> Pipeline start -> Deploy Pipeline(Source release -> Build)



### 필요 구성 파일

- buildspec.yml
- Dockerfile
- eks-app-deploy.yaml: EKS 배포에 필요한 배포 설정 파일
- index.html: 앱 소스파일



#### Code Build 구성 설정 파일

1. install: 실행 환경 지정 및 BUild 필요 프로그램 설치 작업
2. pre_build: Build 실행 전 사전 구성 작업
3. build: 빌드 작업 수행
   - Docker build (이미지 생성)
   - ECR Push (이미지 업로드)
4. post_build 빌드 후 작업 진행



#### AWS CodeCommit 생성 및 배포 설정 파일

1. EKS 배포 설정 파일

2. eks-app-deploy.yaml

3. CodeBuild

   - PPT 참고 - 설정할 게 많음

4. Code Pipeline

   - 기존에 만든 것을 엮음

   - 트리거 설정

     AWS CodeCommit

     특정 저장소의 특정 branch

   - 별도의 Deploy 단계:x:



EKS에서 CodeBuild에 접근할 때, 권한을 줘야 함

> AWS asso를 통해 rolearn 추가
>
> EKS 쪽으로 Apply



ECR과 같은 저장소는 미리 만들둬야 함(선작업)

계정이 나뉘는 경우에는 동일한 파이프라인x -> 크로스라인 배포가 될 거다. 개발부터 시작해서 중간에 stage로 넘어가고 운영으로 넘어가서 결재로

전체적인 큰 그림을 만들어서 컨테이너로 처리 -> 어떤 프로그램이나 어떤 빌드 툴을 다운로드 받아서 다 처리할 수 있도록

