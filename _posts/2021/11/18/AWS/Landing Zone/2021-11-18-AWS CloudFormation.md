---
layout: post
title: "[AWS] AWS CloudFormation"
description: " "
date: 2021-11-18
tags: [AWS]
comments: true
share: true
---

# AWS CloudFormation

> AWS에 구축한 구성을 템플릿화 하여 재사용하기 쉽게 해주는 서비스

특징

- 인프라 관리 간소화

  > Auto Scaling 그룹, Elastic dload Balance 로드 밸런싱, DB 서비스 등의 리소스를 프로비저닝

- 인프라 복제

- 인프라 변경 사항 손쉽게 제어 및 추적

### 템플릿

- JSON, YAML 형식의 텍스트 파일

  > .json .yaml .template .txt

- AWS 리소스 구축을 위한 블루프린트

```json
{
  "AWSTemplateFormatVersion" : "2010-09-09",
  "Description" : "A sample template",
  "Resources" : {
    "MyEC2Instance" : {
      "Type" : "AWS::EC2::Instance",
      "Properties" : {
        "ImageId" : "ami-0ff8a91507f77f867",
        "InstanceType" : "t2.micro",
        "KeyName" : "testkey",
        "BlockDeviceMappings" : [
          {
            "DeviceName" : "/dev/sdm",
            "Ebs" : {
              "VolumeType" : "io1",
              "Iops" : "200",
              "DeleteOnTermination" : "false",
              "VolumeSize" : "20"
            }
          }
        ]
      }
    }
  }
}
```

### Stack

> 리소스 관리 단위

- 스택 생성, 업데이트, 삭제하여 리소스 모음을 생성, 업데이트 및 삭제

구조

- 1. AWSTemplateFormationVersion

     템플릿 버전

  2. Description

     템플릿 설명, 사용자를 위함

  3. Parameters

     스택 생성시 넘겨줄 파라미터

     Ref 함수로 참조

     Outputs와 조합하여 템플릿끼리 연결

  4. Mappings

     키, 값 쌍으로 설정

     리전마다 사용할 AMI를 다르게 하는 경우에 사용

  5. Resources

     생성할 자원들 정의

  6. Outputs

     생성한 것의 결과 출력

     VPC, SecurityGroup, EC2 인스턴스, ELB IP 등

#### StackSets

> 단일 작업으로 여러 계정 및 리전에 대해 스택 생성, 업데이트, 삭제할 수 있도록 스택의 기능 확장
>
> 작업이 수행될 리전의 순서, 스택 작업이 중단되는 내결함성, 스택에 대해 동시에 수행될 수 있는 계정 수등 기본 설정 지정 가능

